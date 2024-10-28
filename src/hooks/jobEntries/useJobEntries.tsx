import { JobEntryType } from "@/components/jobentry"
import { UserType } from "@/context/authContext"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export const useJobEntries = (user: UserType | null) => {
    const [jobEntries, setJobEntries] = useState<JobEntryType[]>([])

    useEffect(() => {
        const fetchJobEntries = async () => {
            if (!user) {
                console.error("user is not authenticated")
                return
            }

            const { data: jobEntries, error: selectError } = await supabase
                .from("work_experience")
                .select("work_experience_id, job_title, employer, start_date, end_date, description, current_position")
                .eq("user_id", user.id)

            if (selectError) {
                console.error("error getting job entries")
            } else {
                const formattedEntries = jobEntries.map((entry) => ({
                    id: entry.work_experience_id,
                    title: entry.job_title,
                    employer: entry.employer,
                    startDate: entry.start_date,
                    endDate: entry.end_date,
                    details: entry.description,
                    currentPosition: entry.current_position,
                    expanded: false
                }))

                setJobEntries(formattedEntries)
            }
        }
        fetchJobEntries()
    }, [user])


    const addJobEntry = () => {
        const newEntry: JobEntryType = {
            id: Date.now(),
            title: "",
            employer: "",
            startDate: "",
            endDate: "",
            details: "",
            expanded: true,
            currentPosition: false
        }
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

    return { jobEntries, setJobEntries, addJobEntry, removeJobEntry, handleJobEntryChange }
}
