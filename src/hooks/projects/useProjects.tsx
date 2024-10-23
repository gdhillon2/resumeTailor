import { ProjectEntryType } from "@/components/projectentry"
import { useState } from "react"

export const useProjects = (initialEntries = []) => {
    const [projects, setProjects] = useState<ProjectEntryType[]>(initialEntries)

    const addProject = () => {
        const newEntry: ProjectEntryType = { id: projects.length, title: "", type: "", details: "", technologies: "", role: "", startDate: "", endDate: "" }
        setProjects([...projects, newEntry])
    }

    const removeProject = (index: number) => {
        setProjects(projects.filter((_, i) => i !== index))
    }

    const handleProjectChange = (updatedProject: ProjectEntryType) => {
        setProjects((prevProjects) =>
            prevProjects.map((entry) => (entry.id === updatedProject.id ? updatedProject : entry))
        )
    }

    return { projects, addProject, removeProject, handleProjectChange }
}
