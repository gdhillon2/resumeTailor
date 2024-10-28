import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { UserType } from "@/context/authContext"
import { JobEntryType } from "@/components/jobentry"
import { ProjectEntryType } from "@/components/projectentry"

type AnalysisType = {
    overallStrengths: string[]
    overallWeaknesses: string[]
    actions: string[]
}

export function useResumeAnalysis(user: UserType | null) {
    const [analysis, setAnalysis] = useState<AnalysisType | null>(null)
    const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false)
    const [error, setError] = useState<string | null>('')

    useEffect(() => {
        const submitAnalysis = async () => {
            if (!user || !analysis) {
                return
            }

            const formattedEntries = {
                user_id: user.id,
                overall_strengths: analysis.overallStrengths ?? "[]",
                overall_weaknesses: analysis.overallWeaknesses ?? "[]",
                actions: analysis.actions ?? "[]"
            }
            const { data: analysisData, error: insertError } = await supabase
                .from("resume_analysis")
                .upsert(formattedEntries, { onConflict: "user_id" })
                .select()

            if (error) {
                console.error("failed to insert/update resume analysis in db:", insertError)
            } else {
                console.log("updated resume_analysis to db:", analysisData)
            }
        }
        submitAnalysis()
    }, [analysis, user])

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
            console.log(data.analysis)
            setAnalysis(JSON.parse(data.analysis))


        } catch (error: any) {
            setError("Failed to analyze resume: Please try again.")
            console.error(error)
        }

        setIsAnalyzing(false)
    }

    return { analysis, isAnalyzing, error, handleAnalyze }
}
