"use client"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { useAuth } from "@/context/authContext"
import { useJobEntries } from "@/hooks/jobEntries/useJobEntries"
import { useSubmitJobEntries } from "@/hooks/jobEntries/useSubmitJobEntries"
import { useProjects } from "@/hooks/projects/useProjects"
import { useSubmitProjects } from "@/hooks/projects/useSubmitProjects"
import { useSkills } from "@/hooks/skills/useSkills"
import { useSubmitSkills } from "@/hooks/skills/useSubmitSkills"
import { useResumeAnalysis } from "@/hooks/analysis/useResumeAnalysis"
import TabsNavigation from "@/components/tabs-navigation"
import WorkTab from "@/components/tabs/work-tab"
import ProjectTab from "@/components/tabs/projects-tab"
import SkillsTab from "@/components/tabs/skills-tab"
import AnalysisTab from "@/components/tabs/analysis-tab"
import ContactTab from "@/components/tabs/contact-tab"
import SummaryTab from "@/components/tabs/summary-tab"
import { useContact } from "@/hooks/contact/useContact"
import { useSubmitContact } from "@/hooks/contact/useSubmitContact"
import { useSummary } from "@/hooks/summary/useSummary"
import { useSubmitSummary } from "@/hooks/summary/useSubmitSummary"
import PreviewTab from "@/components/tabs/preview-tab"
import EducationTab from "@/components/tabs/education-tab"
import { useEducationEntries } from "@/hooks/education/useEducation"
import { useSubmitEducationEntries } from "@/hooks/education/useSubmitEducation"
import { useRouter } from "next/navigation"

export default function Dashboard() {
    const { user, logOut } = useAuth()
    const router = useRouter()

    const handleLogOut = () => {
        if (user) {
            logOut()
        } else {
            router.push("/login")
        }
    }

    const {
        jobEntries,
        fetchJobEntries,
        hasChanges: jobChanges,
        setHasChanges: setJobChanges,
        addJobEntry,
        removeJobEntry,
        handleJobEntryChange
    } = useJobEntries(user)
    const { loading: savingJobs, submitJobEntries } = useSubmitJobEntries(setJobChanges, jobEntries, user)

    const {
        projects,
        fetchProjects,
        hasChanges: projectChanges,
        setHasChanges: setProjectChanges,
        addProject,
        removeProject,
        handleProjectChange
    } = useProjects(user)
    const { loading: savingProjects, submitProjects } = useSubmitProjects(setProjectChanges, projects, user)

    const {
        skills,
        fetchSkills,
        hasChanges: skillsChanges,
        setHasChanges: setSkillsChanges,
        handleSkillChange
    } = useSkills(user)
    const { loading: savingSkills, submitSkills } = useSubmitSkills(setSkillsChanges, skills, user)

    const {
        educationEntries,
        fetchEducationEntries,
        hasChanges: educationChanges,
        setHasChanges: setEducationChanges,
        addEducationEntry,
        removeEducationEntry,
        handleEducationEntryChange
    } = useEducationEntries(user)
    const {
        loading: savingEducationEntries,
        submitEducationEntries
    } = useSubmitEducationEntries(setEducationChanges, educationEntries, user)

    const { analysis, isAnalyzing, error, handleAnalyze, handleActionChange } = useResumeAnalysis(user)

    const {
        contact,
        fetchContact,
        handleContactChange,
        hasChanges: contactChanges,
        setHasChanges: setContactChanges
    } = useContact(user)
    const { loading: savingContact, submitContact } = useSubmitContact(setContactChanges, contact, user)

    const {
        summary,
        fetchSummary,
        handleSummaryChange,
        hasChanges: summaryChanges,
        setHasChanges: setSummaryChanges
    } = useSummary(user)
    const { loading: savingSummary, submitSummary } = useSubmitSummary(setSummaryChanges, summary, user)

    const submitAll = async () => {
        await submitContact()
        await submitSummary()
        await submitJobEntries()
        await submitProjects()
        await submitEducationEntries()
        await submitSkills()
    }

    const revertAll = async () => {
        await fetchContact()
        await fetchSummary()
        await fetchJobEntries()
        await fetchProjects()
        await fetchEducationEntries()
        await fetchSkills()
    }

    const setAllChanges = () => {
        setContactChanges(false)
        setSummaryChanges(false)
        setJobChanges(false)
        setProjectChanges(false)
        setEducationChanges(false)
        setSkillsChanges(false)
    }

    const allChanges: {
        contactChanges: boolean
        summaryChanges: boolean
        jobChanges: boolean
        projectChanges: boolean
        educationChanges: boolean
        skillsChanges: boolean
    } = {
        contactChanges,
        summaryChanges,
        jobChanges,
        projectChanges,
        educationChanges,
        skillsChanges
    }

    return (
        <Tabs defaultValue="contact" className="flex w-full">
            <TabsNavigation handleLogOut={handleLogOut} user={user}/>
            <TabsContent value="contact">
                <ContactTab
                    contact={contact}
                    fetchContact={fetchContact}
                    handleContactChange={handleContactChange}
                    contactChanges={contactChanges}
                    submitContact={submitContact}
                    savingContact={savingContact}
                />
            </TabsContent>
            <TabsContent value="summary">
                <SummaryTab
                    summary={summary}
                    fetchSummary={fetchSummary}
                    handleSummaryChange={handleSummaryChange}
                    summaryChanges={summaryChanges}
                    submitSummary={submitSummary}
                    savingSummary={savingSummary}
                />
            </TabsContent>
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
            <TabsContent value="education" className="">
                <EducationTab
                    education={educationEntries}
                    addEducation={addEducationEntry}
                    fetchEducation={fetchEducationEntries}
                    submitEducation={submitEducationEntries}
                    educationChanges={educationChanges}
                    handleEducationChange={handleEducationEntryChange}
                    removeEducation={removeEducationEntry}
                    savingEducation={savingEducationEntries}
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
                    summary={summary}
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
            <TabsContent value="generate">
                <PreviewTab
                    contact={contact}
                    summary={summary}
                    jobEntries={jobEntries}
                    projects={projects}
                    education={educationEntries}
                    skills={skills}
                    submitAll={submitAll}
                    revertAll={revertAll}
                    setAllChanges={setAllChanges}
                    allChanges={allChanges}
                    user={user}
                />
            </TabsContent>
        </Tabs>
    )
}
