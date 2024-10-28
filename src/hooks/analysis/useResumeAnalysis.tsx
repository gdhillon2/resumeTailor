import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { UserType } from "@/context/authContext"
import { JobEntryType } from "@/components/jobentry"
import { ProjectEntryType } from "@/components/projectentry"

export type ScoreType = "workScore" | "projectScore" | "skillsScore"

export const scoreTypes: ScoreType[] = ["workScore", "projectScore", "skillsScore"]

export type ActionType = {
    text: string
    completed: boolean
}

export type AnalysisType = {
    workScore: number
    projectScore: number
    skillsScore: number
    overallStrengths: string[]
    overallWeaknesses: string[]
    actions: ActionType[]
}

export function useResumeAnalysis(user: UserType | null) {
    const [analysis, setAnalysis] = useState<AnalysisType | null>(null)
    const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false)
    const [error, setError] = useState<string | null>("")

    useEffect(() => {
        const fetchAnalysis = async () => {
            if (!user) {
                return
            }

            try {
                const { data: analysisData, error: fetchError } = await supabase
                    .from("resume_analysis")
                    .select("work_score, project_score, skills_score, overall_strengths, overall_weaknesses, actions")
                    .eq("user_id", user.id)
                    .maybeSingle()

                if (fetchError && fetchError.code !== "PGRST116") {
                    console.error("error fetching resume analysis:", fetchError)
                    setError("failed to load existing analysis")
                    return
                }

                if (analysisData) {
                    setAnalysis({
                        workScore: analysisData.work_score,
                        projectScore: analysisData.project_score,
                        skillsScore: analysisData.skills_score,
                        overallStrengths: analysisData.overall_strengths || [],
                        overallWeaknesses: analysisData.overall_weaknesses || [],
                        actions: analysisData.actions ? analysisData.actions : []
                    })
                }
            } catch (error) {
                console.error("error parsing resume analysis", error)
                setError("failed to parse resume analysis")
            }
        }

        fetchAnalysis()
    }, [user])


    const handleAnalyze = async (jobEntries: JobEntryType[], projects: ProjectEntryType[], skills: string) => {
        setIsAnalyzing(true)
        setError("")

        try {
            const response = await fetch("/api/analyze",
                {
                    method: "post",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                        jobEntries,
                        projects,
                        skills
                    }),
                })

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }

            const data = await response.json()

            if (data.error) {
                throw new Error(data.error)
            }

            const newAnalysis = JSON.parse(data.analysis)

            setAnalysis(newAnalysis)

            const actions = newAnalysis.actions.map((action: string) => ({
                text: action,
                completed: false
            }))

            if (user) {
                const formattedEntries = {
                    user_id: user.id,
                    work_score: newAnalysis.workScore ?? null,
                    project_score: newAnalysis.projectScore ?? null,
                    skills_score: newAnalysis.skillsScore ?? null,
                    overall_strengths: newAnalysis.overallStrengths ?? [],
                    overall_weaknesses: newAnalysis.overallWeaknesses ?? [],
                    actions: actions
                }
                const { data: analysisData, error: insertError } = await supabase
                    .from("resume_analysis")
                    .upsert(formattedEntries, { onConflict: "user_id" })
                    .select()

                if (insertError) {
                    console.error("failed to insert/update resume analysis in db:", insertError)
                } else {
                    console.log("updated resume_analysis to db:", analysisData)
                }

                setAnalysis(prevAnalysis => prevAnalysis ? { ...prevAnalysis, actions: actions } : null);
            }


        } catch (error: any) {
            setError("Failed to analyze resume: Please try again.")
            console.error(error)
        }

        setIsAnalyzing(false)
    }

    const handleActionChange = (checked: boolean, index: number) => {
        if (analysis) {
            const updatedActions = analysis.actions.map((action, i) =>
                i == index ? { ...action, completed: checked} : action)

            setAnalysis(prevAnalysis => prevAnalysis ? { ...prevAnalysis, actions: updatedActions } : null)

            if (user) {
                supabase
                    .from("resume_analysis")
                    .update({ actions: updatedActions })
                    .eq("user_id", user.id)
                    .then(({ error }) => {
                        if (error) {
                            console.error("Error updating actions in database:", error);
                        } else {
                            console.log("Actions updated in database");
                        }
                    });
            }
        }
    }

    return { analysis, isAnalyzing, error, handleAnalyze, handleActionChange }
}
