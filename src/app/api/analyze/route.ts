import { JobEntryType } from "@/components/jobentry"
import { ProjectEntryType } from "@/components/projectentry"
import { NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
})

export async function POST(request: Request) {
    try {
        const { jobEntries, projects, skills } = await request.json()

        const analysis = await analyzeResume(jobEntries, projects, skills)

        return NextResponse.json({ analysis })
    } catch (error) {
        console.error("error analyzing resume:", error)
        return NextResponse.error()
    }
}

export async function analyzeResume(jobEntries: JobEntryType[], projects: ProjectEntryType[], skills: string) {
    try {
        const prompt = `
        Please analyze the following resume information and provide feedback:

        Work Experience:
        ${jobEntries.map(job => `
        Title: ${job.title}
        Employer: ${job.employer}
        Start Date: ${job.startDate}
        ${job.endDate && `End Date: ${job.endDate}`}
        Current Position: ${job.currentPosition}
        Details: ${job.details}
        `).join('\n')}

        Projects:
        ${projects.map(project => `
        Title: ${project.title}
        Duration: ${project.startDate}${project.endDate ? ` - ${project.endDate}` : ' - Present'}
        Technologies: ${project.technologies}
        Details: ${project.details}
        `).join('\n')}

        Skills:
        ${skills}

        Do not recommend adding new sections to the resume. You should only review what the user has provided. Please provide a detailed analysis in correct JSON format using the below structure:
        {
            "workScore": A number out of 100 (100 being perfect) for the work experience strength of the work experience,
            "projectScore": A number out of 100 (100 being perfect) for the strength of the projects,
            "skillsScore": A number out of 100 (100 being perfect) for the strength of the skills. Keep in mind that the skills section is just expected to be a list of relevant skills in the industry,
            "overallStrengths": ["An array containg your assessment of the overall strengths of the resume here. Keep the list under 10 items and sort the list from most important strength to least important strength."],
            "overallWeaknesses": ["An array containg your assessment of the overall weaknesses of the resume here. Keep the list under 10 items and sort the list from most important weakness to least important weakness."],
            "actions": ["An array of actions you recommend taking to help improve the resume. Keep the list under 10 items and sort the list from most important action to least important action."]
        }
        `

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are a professional resume reviewer and career coach specializing in technical roles. Provide structured, actionable feedback that helps improve both content and presentation. Focus on how to better demonstrate technical skills and project impact. Only provide feedback on the text content." 
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.7,
            max_tokens: 1500
        })

        return response.choices[0].message.content
    } catch (error) {
        console.error("error analyzing resume:", error)
        throw error
    }
}
