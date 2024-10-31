import { UserType } from "@/context/authContext"
import { useCallback, useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export const useSkills = (user: UserType | null) => {
    const [skills, setSkills] = useState<string>("")
    const [hasChanges, setHasChanges] = useState<boolean>(false)

    const fetchSkills = useCallback(async () => {
        if (!user) {
            console.error("user is not authenticated")
            return
        }
        const { data: skillsData, error: fetchError } = await supabase
            .from("user_profile")
            .select("skills")
            .eq("user_id", user.id)
            .maybeSingle()

        if (fetchError) {
            console.error("error fetching skills:", fetchError)
        } else if (skillsData) {
            setSkills(skillsData.skills)
            setHasChanges(false)
        }

    }, [])

    useEffect(() => {
        fetchSkills()

    }, [fetchSkills])

    const handleSkillChange = (updatedSkills: string) => {
        setSkills(updatedSkills)
        setHasChanges(true)
    }

    return { skills, fetchSkills, hasChanges, setHasChanges, handleSkillChange }

}
