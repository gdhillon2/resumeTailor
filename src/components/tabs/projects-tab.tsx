import { Label } from "@/components/ui/label"
import TabActions from "@/components/tab-actions"
import ProjectEntry, { ProjectEntryType } from "@/components/projectentry"

interface ProjectTabProps {
    projects: ProjectEntryType[]
    addProject: () => void
    fetchProjects: () => Promise<void>
    submitProjects: () => Promise<void>
    projectChanges: boolean
    handleProjectChange: (updatedProject: ProjectEntryType) => void
    removeProject: (index: number) => void
    savingProjects: boolean
}

export default function ProjectTab({
    projects,
    addProject,
    fetchProjects,
    submitProjects,
    projectChanges,
    handleProjectChange,
    removeProject,
    savingProjects,
}: ProjectTabProps) {
    return (
        <div className="flex flex-col items-start w-full">
            <div className="flex w-full justify-end gap-5 p-5 border-b mb-5">
                <Label className="text-xl flex w-full items-center font-bold">Showcase Your Projects</Label>
                <TabActions
                    onAdd={addProject}
                    onRevert={fetchProjects}
                    onSave={submitProjects}
                    saving={savingProjects}
                    hasChanges={projectChanges}
                />
            </div>
            {projects.map((entry, index) => (
                <div key={entry.id} className="flex w-full pb-5 pl-5 pr-5">
                    <ProjectEntry
                        entry={entry}
                        DestroyEntry={() => removeProject(index)}
                        onChange={handleProjectChange}
                    />
                </div>
            ))}
        </div>
    )
}
