import { EducationEntryType } from "@/components/education-entry"
import { UserType } from "@/context/authContext"
import { useCallback, useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export const useEducationEntries = (user: UserType | null) => {
    const [educationEntries, setEducationEntries] = useState<EducationEntryType[]>([])
    const [hasChanges, setHasChanges] = useState<boolean>(false)

    const fetchEducationEntries = useCallback(async () => {
        if (!user) {
            console.error("user is not authenticated")
            return
        }

        const { data: educationEntries, error: selectError } = await supabase
            .from("education")
            .select("education_id, degree, institution, start_date, end_date, currently_enrolled")
            .eq("user_id", user.id)

        if (selectError) {
            console.error("error getting education entries:", selectError)
        } else {
            const formattedEntries = educationEntries.map((entry) => ({
                id: entry.education_id,
                degree: entry.degree,
                institution: entry.institution,
                startDate: entry.start_date,
                endDate: entry.end_date,
                currentlyEnrolled: entry.currently_enrolled,
                expanded: false
            }))

            setEducationEntries(formattedEntries)
            setHasChanges(false)
        }
    }, [user])

    useEffect(() => {
        fetchEducationEntries()
        setHasChanges(false)
    }, [fetchEducationEntries])


    const addEducationEntry = () => {
        const newEntry: EducationEntryType = {
            id: Date.now(),
            institution: "",
            startDate: "",
            endDate: "",
            expanded: true,
            currentlyEnrolled: false,
            degree: ""
        }
        setEducationEntries([...educationEntries, newEntry])
    }

    const removeEducationEntry = (index: number) => {
        setEducationEntries(educationEntries.filter((_, i) => i !== index))
        setHasChanges(true)
    }

    const handleEducationEntryChange = (updatedEducationEntry: EducationEntryType) => {
        setEducationEntries((prevEntries) =>
            prevEntries.map((entry) => (entry.id === updatedEducationEntry.id ? updatedEducationEntry : entry))
        )
        setHasChanges(true)
    }

    return {
        educationEntries,
        fetchEducationEntries,
        hasChanges,
        setHasChanges,
        addEducationEntry,
        removeEducationEntry,
        handleEducationEntryChange
    }
}
