import { EducationEntryType } from "@/components/education-entry"
import { UserType } from "@/context/authContext"
import { supabase } from "@/lib/supabaseClient"
import { Dispatch, SetStateAction, useState } from "react"

export const useSubmitEducationEntries = (setHasChanges: Dispatch<SetStateAction<boolean>>,
    educationEntries: EducationEntryType[],
    user: UserType | null) => {
    const [loading, setLoading] = useState<boolean>(false)


    const submitEducationEntries = async () => {
        if (!user) {
            return
        }

        setLoading(true)
        const formattedEntries = educationEntries.map(entry => ({
            user_id: user.id,
            degree: entry.degree,
            institution: entry.institution,
            start_date: (entry.startMonth && entry.startYear) ? `${entry.startMonth} ${entry.startYear}` : null,
            end_date: (entry.endMonth && entry.endYear) ? `${entry.endMonth} ${entry.endYear}` : null,
            currently_enrolled: entry.currentlyEnrolled
        }))

        if (formattedEntries.length) {
            const { data: insertedData, error: insertError } = await supabase
                .from("education")
                .insert(formattedEntries)
                .select()
            if (insertError) {
                console.error("error submitting education entries:", insertError)
            } else {
                console.log("successfully submitted education entries", insertedData)
            }
            const newEntryIds = insertedData?.map(entry => entry.education_id)
            console.log(newEntryIds)

            if (newEntryIds?.length) {
                const { error: deleteError } = await supabase
                    .from("education")
                    .delete()
                    .eq("user_id", user.id)
                    .not("education_id", "in", `(${newEntryIds.join(",")})`)

                if (deleteError) {
                    console.error("could not delete old education entries:", deleteError)
                }
            }
        } else {
            const { error: deleteError } = await supabase
                .from("education")
                .delete()
                .eq("user_id", user.id)

            if (deleteError) {
                console.error("couldn't delete all education", deleteError)
            }
        }
        setLoading(false)
        setHasChanges(false)
    }

    return { loading, submitEducationEntries }
}
