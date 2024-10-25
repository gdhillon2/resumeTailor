import { ProjectEntryType } from "@/components/projectentry"
import { UserType } from "@/context/authContext"
import { supabase } from "@/lib/supabaseClient"

export const useSubmitProjects = (projects: ProjectEntryType[], user: UserType | null) => {
    const submitProjects = async () => {
        if (!user) {
            console.error("user is not authenticated")
            return
        }

        const formattedEntries = projects.map(entry => ({
            user_id: user.id,
            title: entry.title,
            type: entry.type,
            details: entry.details,
            technologies: entry.technologies,
            role: entry.role,
            start_date: entry.startDate ? entry.startDate : null,
            end_date: entry.endDate ? entry.endDate : null
        }))

        if (formattedEntries.length) {
            const { data: insertedData, error: insertError } = await supabase
                .from("projects")
                .insert(formattedEntries)
                .select()

            if (insertError) {
                console.error("error submitting projects:", insertError)
            } else {
                console.log("successfully submitted projects:", insertedData)
            }

            const newEntryIds = insertedData?.map(entry => entry.projects_id)

            if (newEntryIds?.length) {
                const { error: deleteError } = await supabase
                    .from("projects")
                    .delete()
                    .eq("user_id", user.id)
                    .not("projects_id", "in", `(${newEntryIds.join(",")})`)

                if (deleteError) {
                    console.error("could not delete old entries:", deleteError)
                }
            }
        } else {
            const { error: deleteError } = await supabase
                .from("projects")
                .delete()
                .eq("user_id", user.id)

            if (deleteError) {
                console.error("could not delete all projects:", deleteError)
            }
        }
    }

    return { submitProjects }
}
