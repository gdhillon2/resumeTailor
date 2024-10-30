import { Label } from "@/components/ui/label"
import TabActions from "@/components/tab-actions"
import EducationEntry, { EducationEntryType } from "@/components/education-entry"

interface EducationTabProps {
    education: EducationEntryType[]
    addEducation: () => void
    fetchEducation: () => Promise<void>
    submitEducation: () => Promise<void>
    educationChanges: boolean
    handleEducationChange: (updatedEducation: EducationEntryType) => void
    removeEducation: (index: number) => void
    savingEducation: boolean
}

export default function EducationTab({
    education,
    addEducation,
    fetchEducation,
    submitEducation,
    educationChanges,
    handleEducationChange,
    removeEducation,
    savingEducation
}: EducationTabProps) {
    return (
        <div className="flex flex-col items-start w-full">
            <div className="flex w-full justify-end gap-5 p-5 border-b mb-5">
                <Label className="text-xl flex w-full items-center font-bold">Enter Your Education</Label>
                <TabActions
                    onAdd={addEducation}
                    onRevert={fetchEducation}
                    onSave={submitEducation}
                    saving={savingEducation}
                    hasChanges={educationChanges}
                />
            </div>
            {education.map((entry, index) => (
                <div key={entry.id} className="flex w-full pb-5 pl-5 pr-5">
                    <EducationEntry
                        entry={entry}
                        DestroyEntry={() => removeEducation(index)}
                        onChange={handleEducationChange}
                    />
                </div>
            ))}
        </div>
    )
}
