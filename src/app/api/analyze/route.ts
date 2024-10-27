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
            Duration: ${job.startDate} - ${job.endDate}
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

          Please provide a detailed analysis in the following format:

          EXPERIENCE ANALYSIS
          - Assessment of work history progression
          - Key achievements and responsibilities
          - Suggestions for improvement in experience descriptions

          PROJECT ANALYSIS
          - Technical depth demonstrated
          - Project impact and complexity
          - Recommendations for better showcasing projects
          - Suggestions for highlighting technical skills through projects

          SKILLS ASSESSMENT
          - Current skill set evaluation
          - Skills demonstrated through work and projects
          - Skill gaps based on industry standards
          - Recommended skills to develop

          OVERALL RECOMMENDATIONS
          - Resume strengths
          - Areas for improvement
          - Industry-specific suggestions
          - Format and presentation tips
        `
        const prompt2 = "please confirm you can read this"

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are a LLM"
                    //content: "You are a professional resume reviewer and career coach specializing in technical roles. Provide structured, actionable feedback that helps improve both content and presentation. Focus on how to better demonstrate technical skills and project impact."
                },
                {
                    role: "user",
                    content: prompt2
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
