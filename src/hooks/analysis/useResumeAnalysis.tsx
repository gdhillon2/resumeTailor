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
        const fetchAnalysis = async () => {
            if (!user) {
                return
            }

            try {
                const { data: analysisData, error: fetchError } = await supabase
                    .from("resume_analysis")
                    .select("overall_strengths, overall_weaknesses, actions")
                    .eq("user_id", user.id)
                    .maybeSingle()

                if (fetchError && fetchError.code !== "PGRST116") {
                    console.error("error fetching resume analysis:", fetchError)
                    setError("failed to load existing analysis")
                    return
                }

                if (analysisData) {
                    setAnalysis({
                        overallStrengths: analysisData.overall_strengths || "[]",
                        overallWeaknesses: analysisData.overall_weaknesses || "[]",
                        actions: analysisData.actions || "[]"
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

            if (user) {
                const formattedEntries = {
                    user_id: user.id,
                    overall_strengths: newAnalysis.overallStrengths ?? "[]",
                    overall_weaknesses: newAnalysis.overallWeaknesses ?? "[]",
                    actions: newAnalysis.actions ?? "[]"
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
            }


        } catch (error: any) {
            setError("Failed to analyze resume: Please try again.")
            console.error(error)
        }

        setIsAnalyzing(false)
    }

    return { analysis, isAnalyzing, error, handleAnalyze }
}
