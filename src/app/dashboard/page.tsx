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
import { Textarea } from "@/components/ui/textarea"
import { useSkills } from "@/hooks/skills/useSkills"
import { useSubmitSkills } from "@/hooks/skills/useSubmitSkills"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ActionType, scoreTypes, useResumeAnalysis } from "@/hooks/analysis/useResumeAnalysis"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { FaHome, FaBriefcase, FaFolderOpen, FaCog, FaChartLine, FaSignOutAlt } from "react-icons/fa"

export default function Dashboard() {
    const { user, logOut } = useAuth()

    const handleLogOut = () => {
        logOut()
    }

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


    const overallScore = analysis ?
        Math.round(scoreTypes.reduce((acc, scoreType) => acc + analysis[scoreType], 0) / scoreTypes.length) : 0
    const overallScoreColor = overallScore >= 80 ? "text-green-500" : overallScore >= 70 ? "text-yellow-500" : "text-red-500"

    return (
        <Tabs defaultValue="work" className="flex w-full">
            <TabsList className="flex flex-grow h-full justify-start items-start rounded-none border-r blue-grad">
                <Link
                    className="flex w-full"
                    href="/"
                >
                    <TabsTrigger
                        value=""
                        className="flex justify-start items-center w-full"
                    >
                        <FaHome className="mr-2" /> Home
                    </TabsTrigger>
                </Link>
                <TabsTrigger
                    value="work"
                    className="flex justify-start items-center w-full"
                >
                    <FaBriefcase className="mr-2" /> Work
                </TabsTrigger>
                <TabsTrigger
                    value="projects"
                    className="flex justify-start items-center w-full"
                >
                    <FaFolderOpen className="mr-2" /> Projects
                </TabsTrigger>
                <TabsTrigger
                    value="skills"
                    className="flex justify-start items-center w-full"
                >
                    <FaCog className="mr-2" /> Skills
                </TabsTrigger>
                <TabsTrigger
                    value="analyze"
                    className="flex justify-start items-center w-full"
                >
                    <FaChartLine className="mr-2" /> Analyze
                </TabsTrigger>
                <div className="flex h-full items-end py-5 justify-end">
                    <Button
                        onClick={handleLogOut}
                        variant={"ghost"}
                        className="rounded-md hover:bg-transparent text-lg px-3"
                    >
                        <FaSignOutAlt className="mr-2" />Log Out
                    </Button>
                </div>
            </TabsList>
            <TabsContent value="work" className="">
                <div className="flex flex-col items-start w-full">
                    <div className="flex flex-col w-full">
                        <div className="flex justify-end gap-5 p-5 border-b mb-5">
                            <Label className="text-xl flex w-full items-center font-bold">Work Experience</Label>
                            <div className="flex animate-float-fade-in-1_2s-delay" style={{ opacity: 0 }}>
                                <Button variant={"secondary"} onClick={addJobEntry}>Add Job</Button>
                            </div>
                            <div className="flex animate-float-fade-in-1_2s-delay" style={{ opacity: 0 }}>
                                <Button variant={"secondary"} onClick={fetchJobEntries}>Revert Changes</Button>
                            </div>
                            <div className="flex animate-float-fade-in-1_2s-delay" style={{ opacity: 0 }}>
                                <Button
                                    variant={jobChanges ? "default" : "ghost"}
                                    onClick={submitJobEntries}
                                    className={jobChanges ? "text-primary" : "no-hover"}
                                >
                                    {savingJobs ? "Saving..." : "Save Jobs"}
                                </Button>
                            </div>
                        </div>
                        {jobEntries.map((entry, index) => (
                            <div key={entry.id} className="flex w-full pb-5 pl-5 pr-5">
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
            <TabsContent value="projects" className="">
                <div className="flex flex-col items-start w-full">
                    <div className="flex flex-col w-full">
                        <div className="flex justify-end gap-5 p-5 border-b mb-5">
                            <Label className="text-xl flex w-full items-center font-bold">Projects</Label>
                            <div className="flex animate-float-fade-in-1_2s-delay" style={{ opacity: 0 }}>
                                <Button variant={"secondary"} onClick={addProject}>Add Project</Button>
                            </div>
                            <div className="flex animate-float-fade-in-1_2s-delay" style={{ opacity: 0 }}>
                                <Button variant={"secondary"} onClick={fetchProjects}>Revert Changes</Button>
                            </div>
                            <div className="flex animate-float-fade-in-1_2s-delay" style={{ opacity: 0 }}>
                                <Button
                                    variant={projectChanges ? "default" : "ghost"}
                                    onClick={submitProjects}
                                    className={projectChanges ? "text-primary" : "no-hover"}
                                >
                                    {savingProjects ? "Saving..." : "Save Projects"}
                                </Button>
                            </div>
                        </div>
                        {projects.map((entry, index) => (
                            <div key={entry.id} className="flex w-full pb-5 pl-5 pr-5">
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
            <TabsContent value="skills" className="">
                <div className="flex flex-col items-start w-full">
                    <div className="flex flex-col w-full">
                        <div className="flex justify-end gap-5 p-5 border-b">
                            <Label className="text-xl flex w-full items-center font-bold">Skills</Label>
                            <div className="flex animate-float-fade-in-1_2s-delay" style={{ opacity: 0 }}>
                                <Button variant={"secondary"} onClick={fetchSkills}>Revert Changes</Button>
                            </div>
                            <div className="flex animate-float-fade-in-1_2s-delay" style={{ opacity: 0 }}>
                                <Button
                                    variant={skillsChanges ? "default" : "ghost"}
                                    onClick={submitSkills}
                                    className={skillsChanges ? "text-primary" : "no-hover"}
                                >
                                    {savingSkills ? "Saving..." : "Save Skills"}
                                </Button>
                            </div>
                        </div>
                        <div className="p-5">
                            <Textarea
                                rows={5}
                                placeholder="Put your relevant skills here."
                                value={skills}
                                onChange={(e) => handleSkillChange(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </TabsContent>
            <TabsContent value="analyze">
                <div className="flex flex-col w-full p-5 gap-5 border-b">
                    <div className="flex justify-between items-center">
                        <Label className="text-xl font-bold">Resume Analysis</Label>
                        <div className="animate-float-fade-in-1_2s-delay" style={{ opacity: 0 }}>
                            <Button
                                onClick={() => handleAnalyze(jobEntries, projects, skills)}
                                disabled={isAnalyzing}
                            >
                                {isAnalyzing ? "Analyzing..." : "Analyze Resume"}
                            </Button>
                        </div>
                    </div>
                </div>
                {error && (
                    <div className="pt-5 pr-5 pl-5">
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    </div>
                )}

                {analysis ? (
                    <div className="flex flex-col gap-3 pt-5 pr-5 pl-5">
                        <div className="flex gap-3">
                            <div className="flex flex-col items-center w-[25%] bg-transparent p-5 rounded-xl">
                                <div className="font-bold text-sm mb-2">Overall Score</div>
                                <div className={`text-4xl ${overallScoreColor} relative`}>
                                    {overallScore}
                                    {/*
                                            <span className="text-lg text-slate-300 absolute bottom-0 right-[-2.5rem]">/100</span>
                                            */}
                                </div>
                            </div>
                            {scoreTypes.map((scoreType) => {
                                const score = analysis[scoreType]
                                const color = score >= 80 ? "text-green-500" : score >= 70 ? "text-yellow-500" : "text-red-500"
                                const label = scoreType.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())

                                return (
                                    <div key={scoreType} className="flex flex-col items-center w-[25%] bg-transparent p-5 rounded-xl">
                                        <div className="font-bold text-sm mb-2">{label}</div>
                                        <div className={`text-4xl ${color} relative`}>
                                            {Math.floor(score)}
                                            {/*
                                            <span className="text-lg text-slate-300 absolute bottom-0 right-[-2.5rem]">/100</span>
                                            */}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="flex gap-3">
                            <div className="w-[50%] rounded-xl p-5 bg-slate-800">
                                <div className="font-bold">Strengths</div>
                                {analysis.overallStrengths.map((entry: string, index: number) => {
                                    return (
                                        <div key={index} className="py-2 text-sm">
                                            <Label>{entry}</Label>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="w-[50%] rounded-xl p-5 bg-slate-800">
                                <div className="font-bold">Weaknesses</div>
                                {analysis.overallWeaknesses.map((entry: string, index: number) => {
                                    return (
                                        <div key={index} className="py-2 text-sm">
                                            <Label>{entry}</Label>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="bg-slate-800 p-5 rounded-xl">
                            <div className="font-bold">Actions</div>
                            {analysis.actions.map((entry: ActionType, index: number) => {
                                return (
                                    <div key={index} className="flex items-center gap-2 py-2 text-sm">
                                        <Checkbox
                                            checked={entry.completed}
                                            onCheckedChange={(checked) => handleActionChange(!!checked, index)}
                                        />
                                        {entry.text}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                ) : (
                    <div className="p-5">Click the Analyze Resume button in the top right corner to get feedback on your resume!</div>
                )}
            </TabsContent>
        </Tabs>
    )
}
