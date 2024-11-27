import { useDispatch, useSelector } from "react-redux"
import { Label } from "@/components/ui/label"
import JobEntry, { JobEntryType } from "@/components/jobentry"
import TabActions from "@/components/tab-actions"
import { RootState, AppDispatch } from "@/redux/store"
import { fetchJobEntries } from "@/redux/jobsSlice"
import { useAuth } from "@/context/authContext"
import { useEffect } from "react"

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
    addJobEntry,
    submitJobEntries,
    handleJobEntryChange,
    removeJobEntry,
    savingJobs }: Omit<WorkTabProps, "jobEntries" | "fetchJobEntries" | "jobChanges">) {
    const { user } = useAuth()
    const dispatch = useDispatch<AppDispatch>()

    const { jobEntries, hasChanges } = useSelector(
        (state: RootState) => state.jobs
    )

    const fetchJobEntriesHandler = async () => {
        await dispatch(fetchJobEntries(user.id))
    }

    useEffect(() => {
        if (user?.id) {
            dispatch(fetchJobEntries(user.id))
        }
    }, [dispatch, user?.id])

    return (
        <div className="flex flex-col items-start w-full">
            <div className="flex w-full justify-end gap-5 p-5 border-b gradient mb-5">
                <Label className="text-xl flex w-full items-center font-bold">Add Your Work Experience</Label>
                <TabActions
                    onAdd={addJobEntry}
                    onRevert={fetchJobEntriesHandler}
                    onSave={submitJobEntries}
                    saving={savingJobs}
                    hasChanges={hasChanges}
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
