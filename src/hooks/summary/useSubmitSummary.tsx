import { UserType } from "@/context/authContext"
import { supabase } from "@/lib/supabaseClient"
import { Dispatch, SetStateAction, useState } from "react"

export const useSubmitSummary = (setHasChanges: Dispatch<SetStateAction<boolean>>,
    summary: string,
    user: UserType | null) => {
    const [loading, setLoading] = useState<boolean>(false)

    const submitSummary = async () => {
        if (!user) {
            console.error("user is not authenticated")
            return
        }
        setLoading(true)
        const formattedEntries = {
            user_id: user.id,
            summary: summary
        }

        if (formattedEntries.summary) {
            const { data: insertedData, error: insertError } = await supabase
                .from("skills")
                .upsert(formattedEntries, { onConflict: "user_id" })
                .select()

            if (insertError) {
                console.error("couldnt insert summary:", insertError)
            } else {
                console.log("successfully inserted data:", insertedData)
            }
        }
        setLoading(false)
        setHasChanges(false)
    }

    return { loading, submitSummary }
}
