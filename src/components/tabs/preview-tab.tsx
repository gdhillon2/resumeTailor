import React, { useState } from "react"
import { JobEntryType } from "@/components/jobentry"
import { ContactType } from "@/hooks/contact/useContact"
import { ProjectEntryType } from "@/components/projectentry"
import { EducationEntryType } from "@/components/education-entry"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { FaDownload, FaSave, FaUndo } from "react-icons/fa"
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"
import { useAuth } from "@/context/authContext"

const styles = StyleSheet.create({
    page: {
        padding: 32,
        fontFamily: 'Helvetica'
    },
    header: {
        textAlign: 'center',
        marginBottom: 20
    },
    name: {
        fontSize: 24,
        marginBottom: 5
    },
    contact: {
        fontSize: 10,
        color: '#666'
    },
    section: {
        marginBottom: 10
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        borderBottom: '1 solid #666',
        paddingBottom: 5
    },
    jobTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        paddingBottom: 5
    },
    employer: {
        fontSize: 12,
        color: '#666'
    },
    dates: {
        fontSize: 10,
        color: '#666'
    },
    details: {
        fontSize: 10,
        marginTop: 5,
        lineHeight: 1.3
    },
    bulletPoint: {
        fontSize: 10,
        marginTop: 2,
        lineHeight: 1.3
    }
})

const BulletPoints = ({ text }: { text: string }) => {
    const points = text.split('\n').filter(point => point.trim())
    return (
        <>
            {points.map((point, index) => (
                <Text key={index} style={styles.bulletPoint}>• {point.trim()}</Text>
            ))}
        </>
    )
}

const ResumePDF = ({ contact, summary, jobEntries, projects, education, skills }: PreviewTabProps) => (
    <Document>
        <Page size="LETTER" style={styles.page}>
            <View style={styles.header}>
                <Text style={styles.name}>{contact.fullName}</Text>
                <Text style={styles.contact}>
                    {`${contact.city}, ${contact.state}, ${contact.country}  |  ${contact.phoneNumber}  |  ${contact.email}${contact.relevantLink ? `  |  ${contact.relevantLink}` : ''
                        }`}
                </Text>
            </View>

            {summary && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Summary</Text>
                    <Text style={styles.details}>{summary}</Text>
                </View>
            )}

            {jobEntries.length > 0 && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Experience</Text>
                    {jobEntries.map((job) => (
                        <View key={job.id} style={{ marginBottom: 10 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View>
                                    <Text style={styles.jobTitle}>{job.title}</Text>
                                    <Text style={styles.employer}>{job.employer}</Text>
                                </View>
                                <Text style={styles.dates}>
                                    {`${job.startMonth} ${job.startYear}`} - {job.currentPosition ?
                                        'Present' : `${job.endMonth} ${job.endYear}`}
                                </Text>
                            </View>
                            <BulletPoints text={job.details} />
                        </View>
                    ))}
                </View>
            )}

            {projects.length > 0 && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Projects</Text>
                    {projects.map((project) => (
                        <View key={project.id} style={{ marginBottom: 10 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View>
                                    <Text style={styles.jobTitle}>{project.title}</Text>
                                    <Text style={styles.employer}>{project.technologies}</Text>
                                </View>
                                <Text style={styles.dates}>
                                    {`${project.startMonth} ${project.startYear}`} - {(project.endMonth && project.endYear) ?
                                        `${project.endMonth} ${project.endYear}` : 'Present'}
                                </Text>
                            </View>
                            <BulletPoints text={project.details} />
                        </View>
                    ))}
                </View>
            )}

            {education.length > 0 && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Education</Text>
                    {education.map((edu) => (
                        <View key={edu.id} style={{ marginBottom: 10 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View>
                                    <Text style={styles.jobTitle}>{edu.degree}</Text>
                                    <Text style={styles.employer}>{edu.institution}</Text>
                                </View>
                                <Text style={styles.dates}>
                                    {`${edu.startMonth} ${edu.startYear}`} - {edu.currentlyEnrolled ?
                                        'Present' : `${edu.endMonth} ${edu.endYear}`}
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>
            )}

            {skills && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Skills</Text>
                    <Text style={styles.details}>{skills}</Text>
                </View>
            )}
        </Page>
    </Document>
)

interface PreviewTabProps {
    contact: ContactType
    summary: string
    jobEntries: JobEntryType[]
    projects: ProjectEntryType[]
    education: EducationEntryType[]
    skills: string
    submitAll: () => Promise<void>
    revertAll: () => Promise<void>
    setAllChanges: () => void
    allChanges: {
        contactChanges: boolean
        summaryChanges: boolean
        jobChanges: boolean
        projectChanges: boolean
        educationChanges: boolean
        skillsChanges: boolean
    }
}


export default function PreviewTab(props: PreviewTabProps) {
    const {
        contact,
        summary,
        jobEntries,
        projects,
        skills,
        education,
        submitAll,
        revertAll,
        setAllChanges,
        allChanges } = props
    const { fullName, email, phoneNumber, relevantLink, country, state, city } = contact
    const [saving, setSaving] = useState<boolean>(false)
    const [reverting, setReverting] = useState<boolean>(false)

    const submitAndSaveAll = async () => {
        setSaving(true)
        await submitAll()
        setAllChanges()
        setSaving(false)
    }

    const onRevertAll = async () => {
        setReverting(true)
        await revertAll()
        setAllChanges()
        setReverting(false)
    }

    const BulletPointsPreview = ({ text }: { text: string }) => {
        const points = text.split('\n').filter(point => point.trim())
        return (
            <ul className="list-disc ml-4">
                {points.map((point, index) => (
                    <li key={index} className="text-sm mb-1">{point.trim()}</li>
                ))}
            </ul>
        )
    }
    const { user } = useAuth()
    const hasChanges = Object.values(allChanges).some(change => change === true)

    return (
        <div className="flex flex-col justify-center items-center h-full">
            <div className="flex justify-between w-full p-5 gap-5 border-b gradient">
                <div className="flex justify-between items-center">
                    <Label className="text-xl font-bold">Preview Your Resume</Label>
                </div>
                <div className="flex gap-5 animate-float-fade-in-1_2s-delay items-center" style={{ opacity: "0%" }}>
                    {
                        !user && (
                            <div className="whitespace-nowrap text-sm font-bold">Warning: Save and Revert don't work in demo mode</div>
                        )
                    }
                    <div className="relative group">
                        <Button variant={"secondary"} onClick={onRevertAll}>
                            <FaUndo size={16} />
                        </Button>
                        <span className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            {reverting ? "Reverting..." : "Revert All"}
                        </span>
                    </div>
                    <div className="relative group">
                        <Button
                            className={hasChanges ? "text-primary" : "no-hover"}
                            onClick={submitAndSaveAll}
                            variant={hasChanges ? "default" : "ghost"}
                        >
                            <FaSave size={16} />
                        </Button>
                        <span className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            {saving ? "Saving..." : "Save All"}
                        </span>
                    </div>
                    <div className="relative group">
                        <PDFDownloadLink
                            document={<ResumePDF {...props} />}
                            fileName={`${props.contact.fullName.replace(/\s+/g, '_')}_Resume.pdf`}
                        >
                            <Button>
                                <FaDownload size={16} />
                            </Button>
                        </PDFDownloadLink>
                        <span className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            Download
                        </span>
                    </div>
                </div>
            </div>
            <div className="p-5">
                <div id="resume" className="relative w-[8.5in] min-h-[11in] bg-white shadow-lg">
                    <div className="absolute w-full h-[1px] bg-blue-400 top-[11in] pointer-events-none">
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">
                            Page Break
                        </div>
                    </div>
                    <div className="max-w-[850px] mx-auto p-8 text-gray-700 leading-tight">
                        <div className="text-center mb-4">
                            <div className="text-2xl mb-1">{fullName}</div>
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
                                <div className="text-xl border-b-2 border-gray-700 pb-1 mb-4">
                                    Summary
                                </div>
                                <p className="text-sm">{summary}</p>
                            </div>
                        )}

                        {jobEntries.length > 0 && (
                            <div className="mb-4">
                                <div className="text-xl border-b-2 border-gray-700 pb-1 mb-4">
                                    Experience
                                </div>

                                {jobEntries.map((job) => (
                                    <div key={job.id} className="mb-4">
                                        <div className="flex justify-between items-start leading-tight">
                                            <div>
                                                <div className="text-base">{job.title}</div>
                                                <div className="text-base text-gray-500">{job.employer}</div>
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {`${job.startMonth} ${job.startYear}`} - {job.currentPosition ?
                                                    'Present' : `${job.endMonth} ${job.endYear}`}
                                            </div>
                                        </div>
                                        <BulletPointsPreview text={job.details} />
                                    </div>
                                ))}
                            </div>
                        )}

                        {projects.length > 0 && (
                            <div className="mb-4">
                                <div className="text-xl  border-b-2 border-gray-700 pb-1 mb-4">
                                    Projects
                                </div>

                                {projects.map((project) => (
                                    <div key={project.id} className="mb-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <div className="text-base ">{project.title}</div>
                                                <div className="text-base text-gray-500 ">{project.technologies}</div>
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {`${project.startMonth} ${project.startYear}`} - {(project.endMonth && project.endYear) ?
                                                    `${project.endMonth} ${project.endYear}` : 'Present'}
                                            </div>
                                        </div>
                                        <BulletPointsPreview text={project.details} />
                                    </div>
                                ))}
                            </div>
                        )}

                        {education.length > 0 && (
                            <div className="mb-4">
                                <div className="text-xl  border-b-2 border-gray-700 pb-1 mb-4">
                                    Education
                                </div>
                                {education.map((edu) => (
                                    <div key={edu.id} className="mb-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <div className="text-base ">{edu.degree}</div>
                                                <div className="text-gray-500 ">{edu.institution}</div>
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {`${edu.startMonth} ${edu.startYear}`} - {edu.currentlyEnrolled ?
                                                    'Present' : `${edu.endMonth} ${edu.endYear}`}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {skills && (
                            <div className="mb-4">
                                <div className="text-xl  border-b-2 border-gray-700 pb-1 mb-4">
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
