import { JobEntryType } from "@/components/jobentry"
import { UserType } from "@/context/authContext"
import { supabase } from "@/lib/supabaseClient"

export const useSubmitJobEntries = (jobEntries: JobEntryType[], user: UserType | null) => {

    const submitJobEntries = async () => {
        if (!user) {
            console.error("user is not authenticated")
            return
        }

        const formattedEntries = jobEntries.map(entry => ({
            user_id: user.id,
            job_title: entry.title,
            employer: entry.employer,
            start_date: entry.startDate ? entry.startDate : null,
            end_date: entry.endDate ? entry.endDate : null,
            description: entry.details

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
    }
    return { submitJobEntries }
}
