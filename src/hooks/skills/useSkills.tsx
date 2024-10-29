import { UserType } from "@/context/authContext"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export const useSkills = (user: UserType | null) => {
    const [skills, setSkills] = useState<string>("")
    const [hasChanges, setHasChanges] = useState<boolean>(false)

    const fetchSkills = async () => {
        if (!user) {
            console.error("user is not authenticated")
            return
        }
        const { data: skillsData, error: fetchError } = await supabase
            .from("skills")
            .select("details")
            .eq("user_id", user.id)
            .single()

        if (fetchError) {
            console.error("error fetching skills:", fetchError)
        } else if (skillsData) {
            setSkills(skillsData.details)
            setHasChanges(false)
        }

    }

    useEffect(() => {
        fetchSkills()

    }, [user])

    const handleSkillChange = (updatedSkills: string) => {
        setSkills(updatedSkills)
        setHasChanges(true)
    }

    return { skills, fetchSkills, hasChanges, setHasChanges, handleSkillChange }

}
