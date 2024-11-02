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
        const { summary, jobEntries, projects, skills } = await request.json()

        const analysis = await analyzeResume(summary, jobEntries, projects, skills)

        return NextResponse.json({ analysis })
    } catch (error) {
        console.error("error analyzing resume:", error)
        return NextResponse.error()
    }
}

async function analyzeResume(summary: string, jobEntries: JobEntryType[], projects: ProjectEntryType[], skills: string) {
    try {
        const prompt = `
        Please analyze the following resume information and provide feedback:

        Summary:
        ${summary ? summary : "User did not provide a summary. Rate this a 0."}

        Work Experience:
        ${jobEntries.map(job => `
        Title: ${job.title}
        Employer: ${job.employer}
        Start Date: ${job.startMonth} ${job.startYear}
        ${!job.currentPosition ? `End Date: ${job.endMonth} ${job.endYear}` : ""}
        Current Position: ${job.currentPosition}
        Details: ${job.details}
        `).join('\n')}

        Projects:
        ${projects.map(project => `
        Title: ${project.title}
        Duration: ${project.startMonth} ${project.startYear}${project.endMonth && project.endYear ? ` - ${project.endMonth} ${project.endYear}` : ' - Present'}
        Technologies: ${project.technologies}
        Details: ${project.details}
        `).join('\n')}

        Skills:
        ${skills}

        You should only review what the user has provided. Do not include any formatting characters like backticks. Do not recommend any sections outside of Summary, Work Experience, Projects, and Skills. Provide a valid JSON object as shown below:
        {
            "summaryScore": A number out of 100 (0 meaning the user did not provide any and 100 being perfect) for only the summary of the resume summary,
            "workScore": A number out of 100 (0 meaning the user did not provide any and 100 being perfect) for the strength of the work experience,
            "projectScore": A number out of 100 (0 meaning the user did not provide any and 100 being perfect) for the strength of the projects,
            "overallStrengths": ["An array containg your assessment of the overall strengths of the resume here. Keep the list under 10 items and sort the list from most important strength to least important strength."],
            "overallWeaknesses": ["An array containg your assessment of the overall weaknesses of the resume here. Keep the list under 10 items and sort the list from most important weakness to least important weakness."],
            "actions": ["An array of actions you recommend taking to help improve the resume. Keep the list under 10 items and sort the list from most important action to least important action."]
        }
        `

        console.log(prompt)

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: "You are a professional resume reviewer and career coach specializing in technical roles. Provide structured, actionable feedback that helps improve content. Focus on how to better demonstrate technical skills and project impact. Only provide feedback on the text content."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.7,
            max_tokens: 1500
        })

        console.log(response.choices[0].message.content)
        return response.choices[0].message.content
    } catch (error) {
        console.error("error analyzing resume:", error)
        throw error
    }
}
