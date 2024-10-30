import { Label } from "@/components/ui/label"
import TabActions from "./tab-actions"
import { Textarea } from "./ui/textarea"

interface SkillsTabProps {
    skills: string
    fetchSkills: () => Promise<void>
    submitSkills: () => Promise<void>
    skillsChanges: boolean
    handleSkillChange: (updatedSkills: string) => void
    savingSkills: boolean
}

export default function SkillsTab({
    skills,
    fetchSkills,
    submitSkills,
    skillsChanges,
    handleSkillChange,
    savingSkills,
}: SkillsTabProps) {
    return (
        <div className="flex flex-col items-start w-full">
            <div className="flex flex-col w-full">
                <div className="flex justify-end gap-5 p-5 border-b">
                    <Label className="text-xl flex w-full items-center font-bold">Skills</Label>
                    <TabActions
                        onAdd={null}
                        onRevert={fetchSkills}
                        onSave={submitSkills}
                        saving={savingSkills}
                        hasChanges={skillsChanges}
                    />
                </div>
                <div className="flex flex-col w-full h-full p-5 gap-5">
                    <div className="bg-slate-800 p-5 rounded-xl">
                        <div className="font-bold px-1 pb-2">Skills</div>
                        <div className="">
                            <Textarea
                                rows={5}
                                placeholder="Put your relevant skills here."
                                value={skills}
                                onChange={(e) => handleSkillChange(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
