import { UserType } from "@/context/authContext"
import { supabase } from "@/lib/supabaseClient"

export const useSubmitSkills = (skills: string, user: UserType | null) => {
    const submitSkills = async () => {
        if (!user) {
            console.error("user is not authenticated")
            return
        }

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
    }

    return { submitSkills }
}
