import { JobEntryType } from "@/components/jobentry"
import { useState } from "react"

export const useJobEntries = (initialEntries = []) => {
    const [jobEntries, setJobEntries] = useState<JobEntryType[]>(initialEntries)

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

    return { jobEntries, addJobEntry, removeJobEntry, handleJobEntryChange }
}
