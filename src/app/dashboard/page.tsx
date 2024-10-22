"use client"
import { Button } from "@/components/ui/button"
import JobEntry from "@/components/jobentry";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/context/authContext";
import { useJobEntries } from "@/hooks/useJobEntries";
import { useSubmitJobEntries } from "@/hooks/useSubmitJobEntries";

export default function Dashboard() {
    const { user } = useAuth()
    const { jobEntries, addJobEntry, removeJobEntry, handleJobEntryChange } = useJobEntries();
    const { submitJobEntries } = useSubmitJobEntries(jobEntries, user);

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
