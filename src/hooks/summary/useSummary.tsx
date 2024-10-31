import { UserType } from "@/context/authContext"
import { useCallback, useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export const useSummary = (user: UserType | null) => {
    const [summary, setSummary] = useState<string>("")
    const [hasChanges, setHasChanges] = useState<boolean>(false)

    const fetchSummary = useCallback(async () => {
        if (!user) {
            return
        }
        const { data: skillsData, error: fetchError } = await supabase
            .from("user_profile")
            .select("summary")
            .eq("user_id", user.id)
            .maybeSingle()

        if (fetchError) {
            console.error("error fetching summary:", fetchError)
        } else if (skillsData) {
            setSummary(skillsData.summary)
            setHasChanges(false)
        }

    }, [user])

    useEffect(() => {
        fetchSummary()
        setHasChanges(false)
    }, [])

    const handleSummaryChange = (updatedSkills: string) => {
        setSummary(updatedSkills)
        setHasChanges(true)
    }

    return { summary, fetchSummary, handleSummaryChange, hasChanges, setHasChanges }

}
