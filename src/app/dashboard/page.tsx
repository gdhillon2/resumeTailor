"use client"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { useAuth } from "@/context/authContext"
import { useJobEntries } from "@/hooks/jobEntries/useJobEntries"
import { useSubmitJobEntries } from "@/hooks/jobEntries/useSubmitJobEntries"
import { useProjects } from "@/hooks/projects/useProjects"
import { useSubmitProjects } from "@/hooks/projects/useSubmitProjects"
import { Label } from "@/components/ui/label"
import { useSkills } from "@/hooks/skills/useSkills"
import { useSubmitSkills } from "@/hooks/skills/useSubmitSkills"
import { useResumeAnalysis } from "@/hooks/analysis/useResumeAnalysis"
import TabsNavigation from "@/components/tabs-navigation"
import WorkTab from "@/components/work-tab"
import ProjectTab from "@/components/projects-tab"
import SkillsTab from "@/components/skills-tab"
import AnalysisTab from "@/components/analysis-tab"

export default function Dashboard() {
    const { user, logOut } = useAuth()

    const { jobEntries,
        fetchJobEntries,
        hasChanges: jobChanges,
        setHasChanges: setJobChanges,
        addJobEntry,
        removeJobEntry,
        handleJobEntryChange } = useJobEntries(user)
    const { loading: savingJobs, submitJobEntries } = useSubmitJobEntries(setJobChanges, jobEntries, user)

    const { projects,
        fetchProjects,
        hasChanges: projectChanges,
        setHasChanges: setProjectChanges,
        addProject,
        removeProject,
        handleProjectChange } = useProjects(user)
    const { loading: savingProjects, submitProjects } = useSubmitProjects(setProjectChanges, projects, user)

    const { skills,
        fetchSkills,
        hasChanges: skillsChanges,
        setHasChanges: setSkillsChanges,
        handleSkillChange } = useSkills(user)
    const { loading: savingSkills, submitSkills } = useSubmitSkills(setSkillsChanges, skills, user)

    const { analysis, isAnalyzing, error, handleAnalyze, handleActionChange } = useResumeAnalysis(user)

    return (
        <Tabs defaultValue="work" className="flex w-full">
            <TabsNavigation handleLogOut={logOut} />
            <TabsContent value="contact">contact</TabsContent>
            <TabsContent value="summary">summary</TabsContent>
            <TabsContent value="work" className="">
                <WorkTab
                    jobEntries={jobEntries}
                    addJobEntry={addJobEntry}
                    fetchJobEntries={fetchJobEntries}
                    submitJobEntries={submitJobEntries}
                    jobChanges={jobChanges}
                    handleJobEntryChange={handleJobEntryChange}
                    removeJobEntry={removeJobEntry}
                    savingJobs={savingJobs}
                />
            </TabsContent>
            <TabsContent value="projects" className="">
                <ProjectTab
                    projects={projects}
                    addProject={addProject}
                    fetchProjects={fetchProjects}
                    submitProjects={submitProjects}
                    projectChanges={projectChanges}
                    handleProjectChange={handleProjectChange}
                    removeProject={removeProject}
                    savingProjects={savingProjects}
                />
            </TabsContent>
            <TabsContent value="skills" className="">
                <SkillsTab
                    skills={skills}
                    fetchSkills={fetchSkills}
                    submitSkills={submitSkills}
                    skillsChanges={skillsChanges}
                    handleSkillChange={handleSkillChange}
                    savingSkills={savingSkills}
                />
            </TabsContent>
            <TabsContent value="analyze">
                <AnalysisTab
                    jobEntries={jobEntries}
                    projects={projects}
                    skills={skills}
                    analysis={analysis}
                    handleAnalyze={handleAnalyze}
                    isAnalyzing={isAnalyzing}
                    error={error}
                    handleActionChange={handleActionChange}
                />
            </TabsContent>
        </Tabs>
    )
}
