"use client"
import { Button } from "../../components/ui/button"
import JobEntry from "@/components/jobentry";
import { useState } from "react";
import { JobEntryType } from "@/components/jobentry";

export default function PostResume() {
    const [jobEntries, setJobEntries] = useState<JobEntryType[]>([{ id: 0, title: "", employer: "", details: "" }])

    const addJobEntry = () => {
        const newEntry: JobEntryType = { id: jobEntries.length, title: "", employer: "", details: "" }
        setJobEntries([...jobEntries, newEntry])
    }

    const removeJobEntry = (index: number) => {
        setJobEntries(jobEntries.filter((_, i) => i !== index))
    }

    return (
        <>
            <div className="flex sm:flex-row flex-col gap-5 items-start h-full w-full">
                <div className="flex flex-col gap-5 ps-5 w-full sm:w-[33%]">
                    <div className="flex justify-between items-center">
                        <h5 className="text-5xl text-start">Work</h5>
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

                <div className="flex justify-between items-center w-full sm:w-[33%]">
                    <h5 className="text-5xl text-start">Skills</h5>
                </div>
            </div>
        </>
    );
}
