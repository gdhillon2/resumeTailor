import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Input } from "./ui/input"
import { Button } from "@/components/ui/button"
import { MouseEventHandler, useState } from "react"
import { FiChevronUp } from "react-icons/fi"

interface ProjectEntryParams {
    entry: ProjectEntryType
    DestroyEntry: MouseEventHandler<HTMLElement>
    onChange: (updatedEntry: ProjectEntryType) => void
}

export interface ProjectEntryType {
    id: number
    title: string
    details: string
    technologies: string
    startDate: string
    endDate?: string
    expanded: boolean
}

export default function ProjectEntry({ entry, DestroyEntry, onChange }: ProjectEntryParams) {
    const [isExpanded, setIsExpanded] = useState<boolean>(entry.expanded);

    const handleExpand = () => {
        setIsExpanded(!isExpanded)
    }

    const handleChange = (field: keyof ProjectEntryType, value: string) => {
        onChange({ ...entry, [field]: value })
    }

    return (
        <div className="w-[100%] rounded-xl border-b bg-slate-800">
            <div className="flex justify-between items-center p-5 font-bold cursor-pointer" onClick={handleExpand}>
                <div className="flex justify-center items-center gap-3">
                    <FiChevronUp
                        className={`transform transition-transform duration-300 ${isExpanded ? "rotate-0" : "rotate-180"}`}
                    />
                    {entry.title ? entry.title : "Project Title"}
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
                        <div className="flex flex-col whitespace-nowrap gap-3 items-start">
                            <Label>Title</Label>
                            <Input
                                placeholder={entry.title}
                                value={entry.title ?? ""}
                                onChange={(e) => handleChange("title", e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col whitespace-nowrap gap-3 items-start">
                            <div className="flex w-full max-w-md justify-between items-center gap-5">
                                <Label>Start</Label>
                                <Input
                                    type="date"
                                    placeholder={entry.startDate}
                                    value={entry.startDate ?? ""}
                                    onChange={(e) => handleChange("startDate", e.target.value)}
                                />
                                <Label>End</Label>
                                <Input
                                    type="date"
                                    placeholder={entry.endDate}
                                    value={entry.endDate ?? ""}
                                    onChange={(e) => handleChange("endDate", e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col whitespace-nowrap gap-3 items-start">
                            <Label>Description</Label>
                            <Textarea
                                rows={4}
                                placeholder={entry.details}
                                value={entry.details ?? ""}
                                onChange={(e) => handleChange("details", e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col whitespace-nowrap pb-5 gap-3 items-start">
                            <Label>Technologies Used</Label>
                            <Input
                                placeholder={entry.technologies}
                                value={entry.technologies ?? ""}
                                onChange={(e) => handleChange("technologies", e.target.value)}
                            />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
