import { UserType } from "@/context/authContext"
import { supabase } from "@/lib/supabaseClient"
import { ContactType } from "./useContact"
import { Dispatch, SetStateAction, useState } from "react"

export const useSubmitContact = (
    setHasChanges: Dispatch<SetStateAction<boolean>>,
    contactInfo: ContactType,
    user: UserType | null
) => {
    const [loading, setLoading] = useState<boolean>(false)

    const submitContact = async () => {
        if (!user) {
            return
        }

        setLoading(true)
        const formattedEntries = {
            user_id: user.id,
            contact: {
                ...contactInfo,
            }
        }


        try {
            const { error: upsertError } = await supabase
                .from("user_profile")
                .upsert(formattedEntries, { onConflict: "user_id" })

            if (upsertError) {
                throw upsertError
            }

            console.log("successfully saved contact info to db")
        } catch (error) {
            console.error("failed to save contact info:", error)
        } finally {
            setLoading(false)
            setHasChanges(false)
        }
    }

    return { loading, submitContact }
}
