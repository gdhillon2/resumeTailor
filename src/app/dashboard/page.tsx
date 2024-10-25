"use client"
import { Button } from "@/components/ui/button"
import JobEntry from "@/components/jobentry"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/context/authContext"
import { useJobEntries } from "@/hooks/jobEntries/useJobEntries"
import { useSubmitJobEntries } from "@/hooks/jobEntries/useSubmitJobEntries"
import { useProjects } from "@/hooks/projects/useProjects"
import ProjectEntry from "@/components/projectentry"
import { useSubmitProjects } from "@/hooks/projects/useSubmitProjects"
import { Label } from "@/components/ui/label"

export default function Dashboard() {
    const { user } = useAuth()

    const { jobEntries, addJobEntry, removeJobEntry, handleJobEntryChange } = useJobEntries(user)
    const { submitJobEntries } = useSubmitJobEntries(jobEntries, user)

    const { projects, addProject, removeProject, handleProjectChange } = useProjects(user)
    const { submitProjects } = useSubmitProjects(projects, user)

    return (
        <Tabs defaultValue="work" className="flex w-full">
            <TabsList className="w-hug h-full justify-start items-start rounded-none border-r bg-slate-800">
                <a href="/">
                    <TabsTrigger value="">Home</TabsTrigger>
                </a>
                <TabsTrigger value="work">Work</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="tailor">Tailor</TabsTrigger>
            </TabsList>
            <TabsContent value="work">
                <div className="flex flex-col gap-5 items-start w-full">
                    <div className="flex flex-col gap-5 w-full">
                        <div className="flex justify-end gap-5 pb-5">
                            <Label className="text-xl flex w-full items-center font-bold">Work Experience</Label>
                            <div className="flex animate-float-fade-in-1_2s-delay" style={{ opacity: 0 }}>
                                <Button variant={"secondary"} onClick={addJobEntry}>Add Job</Button>
                            </div>
                            <div className="flex animate-float-fade-in-1_2s-delay" style={{ opacity: 0 }}>
                                <Button variant={"default"} onClick={submitJobEntries}>Save Jobs</Button>
                            </div>
                        </div>
                        {jobEntries.map((entry, index) => (
                            <div key={entry.id} className="flex flex-col gap-3">
                                <JobEntry
                                    entry={entry}
                                    DestroyEntry={() => removeJobEntry(index)}
                                    onChange={handleJobEntryChange}
                                />
                                <div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </TabsContent>
            <TabsContent value="projects">
                <div className="flex flex-col gap-5 items-start w-full">
                    <div className="flex flex-col gap-5 w-full">
                        <div className="flex justify-end gap-5">
                            <Label className="text-xl flex w-full items-center font-bold">Projects</Label>
                            <div className="flex animate-float-fade-in-1_2s-delay" style={{ opacity: 0 }}>
                                <Button variant={"secondary"} onClick={addProject}>Add Project</Button>
                            </div>
                            <div className="flex animate-float-fade-in-1_2s-delay" style={{ opacity: 0 }}>
                                <Button variant={"default"} onClick={submitProjects}>Save Projects</Button>
                            </div>
                        </div>
                        {projects.map((entry, index) => (
                            <div key={entry.id} className="flex flex-col gap-3">
                                <ProjectEntry
                                    entry={entry}
                                    DestroyEntry={() => removeProject(index)}
                                    onChange={handleProjectChange}
                                />
                                <div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </TabsContent>
            <TabsContent value="skills">Skills will go here</TabsContent>
            <TabsContent value="tailor">Job Posting Description, AI feedback will go here</TabsContent>
        </Tabs>
    )
}
