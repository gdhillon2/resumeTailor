import { Label } from "@/components/ui/label"
import { ProjectEntryType } from "@/components/projectentry"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AnalysisType } from "@/hooks/analysis/useResumeAnalysis"
import { ActionType, scoreTypes } from "@/hooks/analysis/useResumeAnalysis"
import { JobEntryType } from "@/components/jobentry"
import { Checkbox } from "@/components/ui/checkbox"
import { FaSync } from "react-icons/fa"
import { SparklesIcon } from "@heroicons/react/24/solid"
import { GaugeChart } from "../gauge-chart"
import { useAuth } from "@/context/authContext"

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

    const overallScoreColor: string = overallScore >= 80 ? "text-green-500" : overallScore >= 70 ? "text-yellow-500" : "text-red-500"
    const { user } = useAuth()
    return (
        <>
            <div className="flex flex-col w-full p-5 gap-5 border-b gradient">
                <div className="flex justify-between items-center">
                    <Label className="text-xl font-bold">Your Resume Analysis</Label>
                    <div className="flex gap-5 animate-float-fade-in-1_2s-delay items-center" style={{ opacity: 0 }}>
                        {
                            !user && (
                                <div className="whitespace-nowrap text-sm font-bold">{"Warning: Analysis doesn't work in demo mode"}</div>
                            )
                        }
                        <div className="relative group">
                            <Button
                                onClick={() => handleAnalyze(summary, jobEntries, projects, skills)}
                                disabled={isAnalyzing}
                            >
                                {isAnalyzing ? (
                                    <FaSync size={16} className="animate-spin" />
                                ) : (
                                    <SparklesIcon className="size-5" />
                                )}
                            </Button>
                            <span className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                {isAnalyzing ? "Analyzing" : "Analyze"}
                            </span>
                        </div>
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
                        <div className="flex flex-col gap-3 justify-center items-center">
                            <div className="flex w-full items-center">
                            <div className="flex w-[25%] justify-end">
                                <div className="flex w-[200px] h-[150px] justify-center">
                                    <GaugeChart
                                        value={overallScore}
                                        color={overallScoreColor}
                                    />
                                </div>
                                </div>
                                <div className="flex w-[75%] justify-center">
                                {scoreTypes.map((scoreType) => {
                                    const score = analysis[scoreType]
                                    const color = score >= 80 ? "text-green-500" : score >= 70 ? "text-yellow-500" : "text-red-500"
                                    const label = scoreType.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())

                                    return (
                                        <div key={scoreType} className="flex flex-col items-center w-[25%] pb-3 bg-transparent rounded-xl">
                                            <div className="mb-2">{label}</div>
                                            <div className={`text-4xl ${color} relative`}>
                                                {Math.floor(score)}
                                            </div>
                                        </div>
                                    )
                                })}
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="w-[50%] rounded-xl bg-slate-800">
                                <div className="font-bold p-3 bg-slate-700 rounded-t-xl">Strengths</div>
                                {analysis.overallStrengths.map((entry: string, index: number) => {
                                    return (
                                        <div key={index} className="p-3 text-sm">
                                            <Label>{entry}</Label>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="w-[50%] rounded-xl bg-slate-800">
                                <div className="font-bold p-3 bg-slate-700 rounded-t-xl">Weaknesses</div>
                                {analysis.overallWeaknesses.map((entry: string, index: number) => {
                                    return (
                                        <div key={index} className="p-3 text-sm">
                                            <Label>{entry}</Label>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="bg-slate-800 rounded-xl mb-5">
                            <div className="font-bold p-3 bg-slate-700 rounded-t-xl">Actions</div>
                            {analysis.actions.map((entry: ActionType, index: number) => {
                                return (
                                    <div key={index} className="flex items-center gap-2 p-3 text-sm">
                                        <Checkbox
                                            checked={entry.completed}
                                            onCheckedChange={(checked) => handleActionChange(!!checked, index)}
                                        />
                                        {entry.text}
                                    </div>
                                )
                            })}
                        </div>
                    </div >
                ) : (
                    <div className="p-5 flex flex-col items-center justify-center bg-slate-900 rounded-lg">
                        <span className="text-lg text-gray-300 text-center mb-4">
                            Click the Analyze Resume button in the top right corner for personalized feedback!
                        </span>
                    </div>
                )
            }
        </>
    )
}
