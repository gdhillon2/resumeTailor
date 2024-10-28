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

export default function Dashboard() {
    const { user } = useAuth()

    const { jobEntries, addJobEntry, removeJobEntry, handleJobEntryChange } = useJobEntries(user)
    const { submitJobEntries } = useSubmitJobEntries(jobEntries, user)

    const { projects, addProject, removeProject, handleProjectChange } = useProjects(user)
    const { submitProjects } = useSubmitProjects(projects, user)

    const { skills, handleSkillChange } = useSkills(user)
    const { submitSkills } = useSubmitSkills(skills, user)

    const { analysis, isAnalyzing, error, handleAnalyze } = useResumeAnalysis(user)

    const overallScore = analysis ?
        Math.round(scoreTypes.reduce((acc, scoreType) => acc + analysis[scoreType], 0) / scoreTypes.length) : 0
    const overallScoreColor = overallScore >= 80 ? "text-green-500" : overallScore >= 70 ? "text-yellow-500" : "text-red-500"

    return (
        <Tabs defaultValue="work" className="flex w-full">
            <TabsList className="flex flex-grow w-hug h-full justify-start items-start rounded-none border-r bg-slate-900 blue-grad">
                <a href="/">
                    <TabsTrigger value="">Home</TabsTrigger>
                </a>
                <TabsTrigger value="work">Work</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="analyze">Analyze</TabsTrigger>
                <TabsTrigger value="tailor">Tailor</TabsTrigger>
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
                                <Button variant={"default"} onClick={submitJobEntries}>Save Jobs</Button>
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
                                <Button variant={"default"} onClick={submitProjects}>Save Projects</Button>
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
                                <Button variant={"default"} onClick={submitSkills}>Save Skills</Button>
                            </div>
                        </div>
                        <div className="p-5">
                            <Textarea
                                rows={3}
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
                                onClick={(_) => handleAnalyze(jobEntries, projects, skills)}
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
            <TabsContent value="tailor">Job Posting Description, AI feedback will go here</TabsContent>
        </Tabs >
    )
}
