import { UserType } from "@/context/authContext"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export const useSkills = (user: UserType | null) => {
    const [skills, setSkills] = useState<string>("")

    useEffect(() => {
        if (!user) {
            console.error("user is not authenticated")
            return
        }
        const fetchSkills = async () => {
            const { data: skillsData, error: fetchError } = await supabase
                .from("skills")
                .select("details")
                .eq("user_id", user.id)
                .single()

            if (fetchError) {

            } else if (skillsData) {
                setSkills(skillsData.details)
            }

        }

        fetchSkills()

    }, [user])

    const handleSkillChange = (updatedSkills: string) => {
        setSkills(updatedSkills)
    }

    return { skills, handleSkillChange }

}
