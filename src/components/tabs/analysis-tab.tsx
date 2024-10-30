import { Label } from "@/components/ui/label"
import { ProjectEntryType } from "@/components/projectentry"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AnalysisType } from "@/hooks/analysis/useResumeAnalysis"
import { ActionType, scoreTypes } from "@/hooks/analysis/useResumeAnalysis"
import { JobEntryType } from "@/components/jobentry"
import { Checkbox } from "@/components/ui/checkbox"

interface AnalysisTabProps {
    summary: string
    jobEntries: JobEntryType[]
    projects: ProjectEntryType[]
    skills: string
    analysis: AnalysisType | null
    handleAnalyze: (summary: string, jobEntries: JobEntryType[], projects: ProjectEntryType[], skills: string) => Promise<void>
    isAnalyzing: boolean
    error: string | null
    handleActionChange: (checked: boolean, index: number) => void
}

export default function AnalysisTab({
    summary,
    jobEntries,
    projects,
    skills,
    analysis,
    handleAnalyze,
    isAnalyzing,
    error,
    handleActionChange
}: AnalysisTabProps) {
    const overallScore = analysis ?
        Math.round(scoreTypes.reduce((acc, scoreType) => acc + analysis[scoreType], 0) / scoreTypes.length) : 0

    const overallScoreColor = overallScore >= 80 ? "text-green-500" : overallScore >= 70 ? "text-yellow-500" : "text-red-500"

    return (
        <>
            <div className="flex flex-col w-full p-5 gap-5 border-b">
                <div className="flex justify-between items-center">
                    <Label className="text-xl font-bold">Your Resume Analysis</Label>
                    <div className="animate-float-fade-in-1_2s-delay" style={{ opacity: 0 }}>
                        <Button
                            onClick={() => handleAnalyze(summary, jobEntries, projects, skills)}
                            disabled={isAnalyzing}
                        >
                            {isAnalyzing ? "Analyzing..." : "Analyze Resume"}
                        </Button>
                    </div>
                </div>
            </div>
            {
                error && (
                    <div className="pt-5 pr-5 pl-5">
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    </div>
                )
            }
            {
                analysis ? (
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
                                <div className="font-bold pb-2">Strengths</div>
                                {analysis.overallStrengths.map((entry: string, index: number) => {
                                    return (
                                        <div key={index} className="py-2 text-sm">
                                            <Label>{entry}</Label>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="w-[50%] rounded-xl p-5 bg-slate-800">
                                <div className="font-bold pb-2">Weaknesses</div>
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
                            <div className="font-bold pb-2">Actions</div>
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
                )
            }
        </>
    )
}
