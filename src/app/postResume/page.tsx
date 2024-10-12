"use client"
import Link from "next/link"
import { Button } from "../../components/ui/button"
import JobEntry from "@/components/jobentry";
import { useState } from "react";

export default function PostResume() {
    const [jobEntries, setJobEntries] = useState<number[]>([1])

    const addJobEntry = () => {
        setJobEntries([...jobEntries, jobEntries.length + 1])
    }

    const removeJobEntry = (index: number) => {
        setJobEntries(jobEntries.filter((_, i) => i !== index))
    }

    return (
        <>
            <div className="flex flex-col gap-5 items-center h-full w-full">
                <h1 className="text-5xl py-5 text-start p-5">Work Experience</h1>
                <div className="animate-float-fade-in-1_2s-delay" style={{ opacity: 0 }}>
                    <Button variant={"default"} onClick={addJobEntry}>Add Job</Button>
                </div>

                <div className="flex flex-col p-5 gap-5 w-[60%]">
                    {jobEntries.map((entry, index) => (
                        <div key={entry} className="flex flex-col gap-3">
                            <JobEntry
                                JobEntryTitle={`Job ${index + 1} Title`}
                                JobEntryEmployer={`Job ${index + 1} Employer`}
                                JobEntryDetails={`Job ${index + 1} Description`}
                            />
                            <div>
                                <Button variant={"destructive"} size={"sm"} onClick={() => removeJobEntry(index)}>Remove Job {index + 1}</Button>
                            </div>
                        </div>
                    ))}
                </div>


                <div className="animate-float-fade-in-1_2s-delay" style={{ opacity: 0 }}>
                    <Link href="/">
                        <Button variant={"outline"} size={"lg"}>Go Back</Button>
                    </Link>
                </div>
            </div>
        </>
    );
}
