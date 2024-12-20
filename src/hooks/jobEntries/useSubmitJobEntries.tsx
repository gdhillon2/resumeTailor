import { JobEntryType } from "@/components/jobentry"
import { UserType } from "@/context/authContext"
import { supabase } from "@/lib/supabaseClient"
import { Dispatch, SetStateAction, useState } from "react"

export const useSubmitJobEntries = (setHasChanges: Dispatch<SetStateAction<boolean>>,
    jobEntries: JobEntryType[],
    user: UserType | null) => {
    const [loading, setLoading] = useState<boolean>(false)


    const submitJobEntries = async () => {
        if (!user) {
            return
        }

        setLoading(true)
        const formattedEntries = jobEntries.map(entry => ({
            user_id: user.id,
            job_title: entry.title,
            employer: entry.employer,
            start_date: (entry.startMonth && entry.startYear) ? `${entry.startMonth} ${entry.startYear}` : null,
            end_date: (entry.endMonth && entry.endYear) ? `${entry.endMonth} ${entry.endYear}` : null,
            description: entry.details,
            current_position: entry.currentPosition
        }))

        if (formattedEntries.length) {
            const { data: insertedData, error: insertError } = await supabase
                .from("work_experience")
                .insert(formattedEntries)
                .select()
            if (insertError) {
                console.error("error submitting job entries:", insertError)
            } else {
                console.log("successfully submitted job entries", insertedData)
            }
            const newEntryIds = insertedData?.map(entry => entry.work_experience_id)
            console.log(newEntryIds)

            if (newEntryIds?.length) {
                const { error: deleteError } = await supabase
                    .from("work_experience")
                    .delete()
                    .eq("user_id", user.id)
                    .not("work_experience_id", "in", `(${newEntryIds.join(",")})`)

                if (deleteError) {
                    console.error("could not delete old entries:", deleteError)
                }
            }
        } else {
            const { error: deleteError } = await supabase
                .from("work_experience")
                .delete()
                .eq("user_id", user.id)

            if (deleteError) {
                console.error("couldn't delete all work experience", deleteError)
            }
        }
        setLoading(false)
        setHasChanges(false)
    }

    return { loading, submitJobEntries }
}
