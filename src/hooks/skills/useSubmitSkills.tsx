import { UserType } from "@/context/authContext"
import { supabase } from "@/lib/supabaseClient"
import { Dispatch, SetStateAction, useState } from "react"

export const useSubmitSkills = (setHasChanges: Dispatch<SetStateAction<boolean>>,
    skills: string,
    user: UserType | null) => {
    const [loading, setLoading] = useState<boolean>(false)

    const submitSkills = async () => {
        if (!user) {
            console.error("user is not authenticated")
            return
        }
        setLoading(true)
        const formattedEntries = {
            user_id: user.id,
            details: skills
        }

        if (formattedEntries.details) {
            const { data: insertedData, error: insertError } = await supabase
                .from("skills")
                .upsert(formattedEntries, { onConflict: "user_id" })
                .select()

            if (insertError) {
                console.error("couldnt insert skills:", insertError)
            } else {
                console.log("successfully inserted data:", insertedData)
            }
        }
        setLoading(false)
        setHasChanges(false)
    }

    return { loading, submitSkills }
}
