import React from "react"
import { JobEntryType } from "@/components/jobentry"
import { ContactType } from "@/hooks/contact/useContact"
import { ProjectEntryType } from "@/components/projectentry"
import { EducationEntryType } from "@/components/education-entry"

interface PreviewTabProps {
    contact: ContactType
    summary: string
    jobEntries: JobEntryType[]
    projects: ProjectEntryType[]
    education: EducationEntryType[]
    skills: string
}

export default function PreviewTab({
    contact,
    summary,
    jobEntries,
    projects,
    education,
    skills
}: PreviewTabProps) {
    const { fullName, email, phoneNumber, relevantLink, country, state, city } = contact

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short'
        })
    }

    return (
        <div className="flex justify-center p-4 h-full">
            <div id="resume" className="w-[8.5in] h-[11in] bg-white shadow-lg">
                <div className="max-w-[850px] mx-auto p-8 text-gray-700 leading-relaxed">
                    <div className="text-center mb-4">
                        <div className="text-2xl font-bold mb-1">{fullName}</div>
                        <div className="text-sm text-gray-500 leading-tight">
                            {city}, {state}, {country}
                            {phoneNumber && (
                                <><span className="mx-2">|</span>{phoneNumber}</>
                            )}
                            {email && (
                                <><span className="mx-2">|</span>{email}</>
                            )}
                            {relevantLink && (
                                <><span className="mx-2">|</span>{relevantLink}</>
                            )}
                        </div>
                    </div>

                    {summary && (
                        <div className="mb-4">
                            <div className="text-xl font-bold border-b-2 border-gray-700 pb-1 mb-4">
                                Summary
                            </div>
                            <p className="text-sm">{summary}</p>
                        </div>
                    )}

                    {jobEntries.length > 0 && (
                        <div className="mb-4">
                            <div className="text-xl font-bold border-b-2 border-gray-700 pb-1 mb-4">
                                Experience
                            </div>

                            {jobEntries.map((job) => (
                                <div key={job.id} className="mb-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="text-base font-bold">{job.title}</div>
                                            <div className="text-base text-gray-500 font-bold">{job.employer}</div>
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {formatDate(job.startDate)} - {job.currentPosition ? 'Present' : formatDate(job.endDate)}
                                        </div>
                                    </div>
                                    <div className="text-sm mt-2 whitespace-pre-line">
                                        {job.details}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {projects.length > 0 && (
                        <div className="mb-4">
                            <div className="text-xl font-bold border-b-2 border-gray-700 pb-1 mb-4">
                                Projects
                            </div>

                            {projects.map((project) => (
                                <div key={project.id} className="mb-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="text-base font-bold">{project.title}</div>
                                            <div className="text-base text-gray-500 font-bold">{project.technologies}</div>
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {formatDate(project.startDate)}
                                            {project.endDate && ` - ${formatDate(project.endDate)}`}
                                        </div>
                                    </div>
                                    <div className="text-sm mt-2 whitespace-pre-line">
                                        {project.details}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {education.length > 0 && (
                        <div className="mb-4">
                            <div className="text-xl font-bold border-b-2 border-gray-700 pb-1 mb-4">
                                Education
                            </div>
                            {education.map((edu) => (
                                <div key={edu.id} className="mb-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="text-base font-bold">{edu.degree}</div>
                                            <div className="text-gray-500 font-bold">{edu.institution}</div>
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {formatDate(edu.startDate)} - {edu.currentlyEnrolled ? 'Present' : formatDate(edu.endDate)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {skills && (
                        <div className="mb-4">
                            <div className="text-xl font-bold border-b-2 border-gray-700 pb-1 mb-4">
                                Skills
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {skills}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
