"use client"
import { Button } from "@/components/ui/button"
import JobEntry from "@/components/jobentry";
import { useState } from "react";
import { JobEntryType } from "@/components/jobentry";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Dashboard() {
    const [jobEntries, setJobEntries] = useState<JobEntryType[]>([{ id: 0, title: "", employer: "", details: "" }])

    const addJobEntry = () => {
        const newEntry: JobEntryType = { id: jobEntries.length, title: "", employer: "", details: "" }
        setJobEntries([...jobEntries, newEntry])
    }

    const removeJobEntry = (index: number) => {
        setJobEntries(jobEntries.filter((_, i) => i !== index))
    }

    return (
        <Tabs defaultValue="work" className="flex w-full">
            <TabsList className="w-hug h-full">
                <TabsTrigger value="work">Work Experience</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
            </TabsList>
            <TabsContent value="work">
                <div className="flex flex-col gap-5 items-start w-full">
                    <div className="flex flex-col gap-5 w-full">
                        <div>
                            <div className="animate-float-fade-in-1_2s-delay" style={{ opacity: 0 }}>
                                <Button variant={"default"} onClick={addJobEntry}>Add Job</Button>
                            </div>
                        </div>
                        {jobEntries.map((entry, index) => (
                            <div key={entry.id} className="flex flex-col gap-3">
                                <JobEntry
                                    entry={entry}
                                    DestroyEntry={() => removeJobEntry(index)}
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
