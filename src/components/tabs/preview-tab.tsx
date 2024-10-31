import React, { useEffect, useRef } from "react"
import { JobEntryType } from "@/components/jobentry"
import { ContactType } from "@/hooks/contact/useContact"
import { ProjectEntryType } from "@/components/projectentry"
import { EducationEntryType } from "@/components/education-entry"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { FaDownload } from "react-icons/fa"

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
    const html2pdfRef = useRef<any>(null)

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short'
        })
    }

    useEffect(() => {
        const initHtml2Pdf = async () => {
            // @ts-expect-error html2pdf has no types so i suppress the error
            const html2pdf = await import("html2pdf.js")
            html2pdfRef.current = html2pdf.default
        }
        initHtml2Pdf()
    }, [])


    const downloadResume = () => {
        if (!html2pdfRef.current) {
            console.error("html2pdf library not loaded")
            return
        }
        // Get the resume element
        const element = document.getElementById('resume')

        if (!element) return

        // Configure pdf options
        const opt = {
            margin: 0,
            filename: `${fullName.replace(/\s+/g, '_')}_Resume.pdf`,
            image: { type: 'jpeg', quality: 1.00 },
            html2canvas: {
                scale: 2,
                useCORS: true,
                letterRendering: true
            },
            jsPDF: {
                unit: 'in',
                format: 'letter',
                orientation: 'portrait'
            }
        }

        // Generate PDF
        html2pdfRef.current()
            .set(opt)
            .from(element)
            .save()
            .catch((err: Error) => console.error('Error generating PDF:', err))
    }

    return (
        <div className="flex flex-col justify-center items-center h-full">
            <div className="flex justify-between w-full p-5 gap-5 border-b gradient">
                <div className="flex justify-between items-center">
                    <Label className="text-xl font-bold">Your Resume</Label>
                </div>
                <div className="animate-float-fade-in-1_2s-delay" style={{ opacity: 0 }}>
                    <div className="relative group">
                        <Button
                            onClick={downloadResume}
                        >
                            <FaDownload />
                        </Button>
                        <span className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            Download
                        </span>
                    </div>
                </div>
            </div>
            <div className="p-5">
                <div id="resume" className="w-[8.5in] h-[11in] bg-white shadow-lg">
                    {/* Rest of your existing JSX remains the same */}
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
        </div>
    )
}
