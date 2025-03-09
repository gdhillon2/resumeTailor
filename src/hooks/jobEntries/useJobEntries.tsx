import { JobEntryType } from "@/components/jobentry"
import { UserType } from "@/context/authContext"
import { useCallback, useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export const useJobEntries = (user: UserType | null) => {
    const [jobEntries, setJobEntries] = useState<JobEntryType[]>([])
    const [hasChanges, setHasChanges] = useState<boolean>(false)

    const fetchJobEntries = useCallback(async () => {
        if (!user) {
            return
        }

        const { data: jobEntries, error: selectError } = await supabase
            .from("work_experience")
            .select("work_experience_id, job_title, employer, start_date, end_date, description, current_position")
            .eq("user_id", user.id)

        if (selectError) {
            console.error("error getting job entries")
        } else {

            const formattedEntries = jobEntries.map((entry) => {
                const [startMonth, startYear] = entry.start_date ? entry.start_date.split(" ") : ["", ""]
                const [endMonth, endYear] = entry.end_date ? entry.end_date.split(" ") : ["", ""]

                return {
                    id: entry.work_experience_id,
                    title: entry.job_title,
                    employer: entry.employer,
                    startMonth: startMonth,
                    startYear: startYear,
                    endMonth: endMonth,
                    endYear: endYear,
                    details: entry.description,
                    currentPosition: entry.current_position,
                    expanded: false
                }
            })


            setJobEntries(formattedEntries)
            setHasChanges(false)
        }
    }, [user])

    useEffect(() => {
        fetchJobEntries()
        setHasChanges(false)
    }, [fetchJobEntries, user])


    const addJobEntry = () => {
        const newEntry: JobEntryType = {
            id: Date.now(),
            title: "",
            employer: "",
            startMonth: "",
            startYear: "",
            endMonth: "",
            endYear: "",
            details: "",
            expanded: true,
            currentPosition: false
        }
        setJobEntries([...jobEntries, newEntry])
    }

    const removeJobEntry = (index: number) => {
        setJobEntries(jobEntries.filter((_, i) => i !== index))
        setHasChanges(true)
    }

    const handleJobEntryChange = (updatedJobEntry: JobEntryType) => {
        setJobEntries((prevEntries) =>
            prevEntries.map((entry) => (entry.id === updatedJobEntry.id ? updatedJobEntry : entry))
        )
        setHasChanges(true)
    }

    return {
        jobEntries,
        fetchJobEntries,
        hasChanges,
        setHasChanges,
        addJobEntry,
        removeJobEntry,
        handleJobEntryChange
    }
}
