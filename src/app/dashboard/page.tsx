"use client"
import { Button } from "@/components/ui/button"
import JobEntry from "@/components/jobentry";
import { useState } from "react";
import { JobEntryType } from "@/components/jobentry";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/context/authContext";

export default function Dashboard() {
    const { user } = useAuth()

    const [jobEntries, setJobEntries] = useState<JobEntryType[]>([{ id: 0, title: "", employer: "", startDate: "", endDate: "", details: "" }])

    const addJobEntry = () => {
        const newEntry: JobEntryType = { id: jobEntries.length, title: "", employer: "", startDate: "", endDate: "", details: "" }
        setJobEntries([...jobEntries, newEntry])
    }

    const removeJobEntry = (index: number) => {
        setJobEntries(jobEntries.filter((_, i) => i !== index))
    }

    const handleJobEntryChange = (updatedJobEntry: JobEntryType) => {
        setJobEntries((prevEntries) =>
            prevEntries.map((entry) => (entry.id === updatedJobEntry.id ? updatedJobEntry : entry))
        )
    }

    const submitJobEntries = async () => {
        if (!user) {
            console.error("user is not authenticated")
            return
        }

        const formattedEntries = jobEntries.map(entry => ({
            user_id: user.id,
            job_title: entry.title,
            employer: entry.employer,
            start_date: entry.startDate ? entry.startDate : null,
            end_date: entry.endDate ? entry.endDate : null,
            description: entry.details

        }))

        const { data: insertedData, error: insertError } = await supabase
            .from("work_experience")
            .insert(formattedEntries)
            .select()

        if (insertError) {
            console.error("error submitting job entries:", insertError)
        } else {
            console.log("successfully submitted job entries", insertedData)
        }

        const newEntryIds = insertedData?.map(entry => entry.work_experience_id)
        console.log(newEntryIds)

        if (newEntryIds?.length) {
            const { error: deleteError } = await supabase
                .from("work_experience")
                .delete()
                .eq("user_id", user.id)
                .not("work_experience_id", "in", `(${newEntryIds.join(',')})`)

            if (deleteError) {
                console.error("could not delete old entries:", deleteError)
            }
        }
    }

    return (
        <Tabs defaultValue="work" className="flex w-full">
            <TabsList className="w-hug h-full">
                <TabsTrigger value="work">Work Experience</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
            </TabsList>
            <TabsContent value="work">
                <div className="flex flex-col gap-5 items-start w-full pe-5">
                    <div className="flex flex-col gap-5 w-full">
                        <div className="flex justify-end gap-5">
                            <div className="flex animate-float-fade-in-1_2s-delay" style={{ opacity: 0 }}>
                                <Button variant={"default"} onClick={addJobEntry}>Add Job</Button>
                            </div>
                            <div className="flex animate-float-fade-in-1_2s-delay" style={{ opacity: 0 }}>
                                <Button variant={"default"} onClick={addJobEntry}>Collapse All</Button>
                            </div>
                            <div className="flex animate-float-fade-in-1_2s-delay" style={{ opacity: 0 }}>
                                <Button variant={"default"} onClick={addJobEntry}>Expand All</Button>
                            </div>
                            <div className="flex animate-float-fade-in-1_2s-delay" style={{ opacity: 0 }}>
                                <Button variant={"default"} onClick={submitJobEntries}>Save Jobs</Button>
                            </div>
                        </div>
                        {jobEntries.map((entry, index) => (
                            <div key={entry.id} className="flex flex-col gap-3">
                                <JobEntry
                                    entry={entry}
                                    DestroyEntry={() => removeJobEntry(index)}
                                    onChange={handleJobEntryChange}
                                />
                                <div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </TabsContent>
            <TabsContent value="projects">Projects will go here</TabsContent>
            <TabsContent value="skills">Skills will go here</TabsContent>
        </Tabs>
    );
}
