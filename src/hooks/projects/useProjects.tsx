import { ProjectEntryType } from "@/components/projectentry"
import { UserType } from "@/context/authContext"
import { useCallback, useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export const useProjects = (user: UserType | null) => {
    const [projects, setProjects] = useState<ProjectEntryType[]>([])
    const [hasChanges, setHasChanges] = useState<boolean>(false)

    const fetchProjects = useCallback(async () => {
        if (!user) {
            console.error("user is not authenticated")
            return
        }

        const { data: projectData, error: fetchError } = await supabase
            .from("projects")
            .select("projects_id, title, details, technologies, start_date, end_date")
            .eq("user_id", user.id)

        if (fetchError) {
            console.error("could not fetch project data")
        } else {
            const formattedEntries = projectData.map((entry) => ({
                id: entry.projects_id,
                title: entry.title,
                details: entry.details,
                technologies: entry.technologies,
                startDate: entry.start_date,
                endDate: entry.end_date,
                expanded: false
            }))

            setProjects(formattedEntries)
            setHasChanges(false)
        }

    }, [user])

    useEffect(() => {
        fetchProjects()
        setHasChanges(false)
    }, [])


    const addProject = () => {
        const newEntry: ProjectEntryType = { id: projects.length, title: "", details: "", technologies: "", startDate: "", endDate: "", expanded: true }
        setProjects([...projects, newEntry])
    }

    const removeProject = (index: number) => {
        setProjects(projects.filter((_, i) => i !== index))
        setHasChanges(true)
    }

    const handleProjectChange = (updatedProject: ProjectEntryType) => {
        setProjects((prevProjects) =>
            prevProjects.map((entry) => (entry.id === updatedProject.id ? updatedProject : entry))
        )
        setHasChanges(true)
    }

    return {
        projects,
        fetchProjects,
        hasChanges,
        setHasChanges,
        addProject,
        removeProject,
        handleProjectChange
    }
}
