import { Label } from "@/components/ui/label"
import JobEntry, { JobEntryType } from "@/components/jobentry"
import TabActions from "@/components/tab-actions"

interface WorkTabProps {
    jobEntries: JobEntryType[]
    addJobEntry: () => void
    fetchJobEntries: () => Promise<void>
    submitJobEntries: () => Promise<void>
    jobChanges: boolean
    handleJobEntryChange: (updatedJobEntry: JobEntryType) => void
    removeJobEntry: (index: number) => void
    savingJobs: boolean
}

export default function WorkTab({
    jobEntries,
    addJobEntry,
    fetchJobEntries,
    submitJobEntries,
    jobChanges,
    handleJobEntryChange,
    removeJobEntry,
    savingJobs }: WorkTabProps) {
    return (
        <div className="flex flex-col items-start w-full">
            <div className="flex w-full justify-end gap-5 p-5 border-b gradient mb-5">
                <Label className="text-xl flex w-full items-center font-bold">Add Your Work Experience</Label>
                <TabActions
                    onAdd={addJobEntry}
                    onRevert={fetchJobEntries}
                    onSave={submitJobEntries}
                    saving={savingJobs}
                    hasChanges={jobChanges}
                />
            </div>
            {jobEntries.map((entry, index) => (
                <div key={entry.id} className="flex w-full pb-5 pl-5 pr-5">
                    <JobEntry
                        entry={entry}
                        DestroyEntry={() => removeJobEntry(index)}
                        onChange={handleJobEntryChange}
                    />
                </div>
            ))}
        </div>
    )
}
