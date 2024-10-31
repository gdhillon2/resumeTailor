import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "@/components/ui/button"
import { MouseEventHandler, useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { FiChevronUp } from "react-icons/fi"

interface EducationEntryParams {
    entry: EducationEntryType
    DestroyEntry: MouseEventHandler<HTMLElement>
    onChange: (updatedEntry: EducationEntryType) => void
}

export interface EducationEntryType {
    id: number
    degree: string
    institution: string
    startMonth: string
    startYear: string
    endMonth: string
    endYear: string
    currentlyEnrolled: boolean
    expanded: boolean
}


export default function EducationEntry({ entry, DestroyEntry, onChange }: EducationEntryParams) {
    const [isExpanded, setIsExpanded] = useState<boolean>(entry.expanded)
    const [isChecked, setIsChecked] = useState<boolean>(entry.currentlyEnrolled)

    const handleCheckboxState = (checked: boolean) => {
        setIsChecked(checked)
        onChange({ ...entry, currentlyEnrolled: checked })
    }

    const toggleExpand = () => {
        setIsExpanded(!isExpanded)
    }

    const handleChange = (field: keyof EducationEntryType, value: string) => {
        onChange({ ...entry, [field]: value })
    }

    return (
        <div className="w-[100%] rounded-xl bg-slate-800">
            <div className="flex justify-between items-center p-5 cursor-pointer" onClick={toggleExpand}>
                <div className="flex items-center justify-center gap-3">
                    <FiChevronUp
                        className={`transform transition-transform duration-300 ${isExpanded ? "rotate-0" : "rotate-180"}`}
                    />
                    <div>
                        <div className="font-bold">
                            {entry.degree ? entry.degree : "Degree/Qualification"}
                        </div>
                        <div>
                            {entry.institution ? entry.institution : "Institution"}
                        </div>
                    </div>
                </div>
                <div className="mr-2 transition-transform duration-300">
                </div>
                <Button
                    variant={"destructive"}
                    size={"sm"}
                    onClick={DestroyEntry}
                >
                    Remove
                </Button>
            </div>
            <div className={`grid transition-all duration-300 ease-in-out ${isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden">
                    <div className="flex flex-col gap-5 w-full px-5">
                        <div className="flex lg:flex-row flex-col w-full gap-3">
                            <div className="flex flex-col w-full max-w-sm whitespace-nowrap gap-3 items-start">
                                <Label>Degree/Qualification</Label>
                                <Input
                                    placeholder={"Bachelor of Science in ..."}
                                    value={entry.degree ? entry.degree : ""}
                                    onChange={(e) => handleChange("degree", e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col w-full max-w-sm whitespace-nowrap gap-3 items-start">
                                <Label>Institution</Label>
                                <Input
                                    placeholder={entry.institution}
                                    value={entry.institution ?? ""}
                                    onChange={(e) => handleChange("institution", e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col whitespace-nowrap pb-5 gap-3 items-start">
                            <div className="flex w-full max-w-xl items-center gap-5">
                                <div className="flex flex-col gap-3">
                                    <Label>Start</Label>
                                    <div className="flex gap-3">
                                        <Input
                                            type="text"
                                            placeholder="Jan"
                                            value={entry.startMonth ?? ""}
                                            onChange={(e) => handleChange("startMonth", e.target.value)}
                                            className="w-[100px]"
                                        />
                                        <Input
                                            type="text"
                                            placeholder="2000"
                                            value={entry.startYear ?? ""}
                                            onChange={(e) => handleChange("startYear", e.target.value)}
                                            className="w-[65px]"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <Label>End</Label>
                                    <div className="flex gap-3 items-center">
                                        <Input
                                            type="text"
                                            placeholder="Jan"
                                            value={entry.endMonth ?? ""}
                                            onChange={(e) => handleChange("endMonth", e.target.value)}
                                            className="w-[100px]"
                                            disabled={isChecked}
                                        />
                                        <Input
                                            type="text"
                                            placeholder="2000"
                                            value={entry.endYear ?? ""}
                                            onChange={(e) => handleChange("endYear", e.target.value)}
                                            className="w-[65px]"
                                            disabled={isChecked}
                                        />
                                        <div className="flex justify-center gap-2 h-full">
                                            <Checkbox
                                                checked={isChecked}
                                                onCheckedChange={handleCheckboxState}
                                            />
                                            <Label>Current Position</Label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
