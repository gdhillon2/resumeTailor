import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Input } from "./ui/input"
import { Button } from "@/components/ui/button"
import { MouseEventHandler, useState } from "react"
import { CheckboxWithText } from "./ui/checkbox-with-text"
interface JobEntryParams {
    entry: JobEntryType
    DestroyEntry: MouseEventHandler<HTMLElement>
    onChange: (updatedEntry: JobEntryType) => void
}

export interface JobEntryType {
    id: number
    title: string
    employer: string
    startDate: string
    endDate: string
    details: string
}


export default function JobEntry({ entry, DestroyEntry, onChange }: JobEntryParams) {
    const [isExpanded, setIsExpanded] = useState<boolean>(true);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded)
    }

    const handleChange = (field: keyof JobEntryType, value: string) => {
        onChange({ ...entry, [field]: value })
    }

    return (
        <div className="w-[100%] rounded-xl bg-slate-800">
            <div className="flex justify-between items-center p-5 cursor-pointer" onClick={toggleExpand}>
                <div>
                    <div className="font-bold">
                        {entry.title ? entry.title : "Job Title"}
                    </div>
                    <div>
                        {entry.employer ? entry.employer : "Employer"}
                    </div>
                </div>
                <Button
                    variant={"destructive"}
                    size={"sm"}
                    onClick={DestroyEntry}
                >
                    Remove Job
                </Button>
            </div>
            { isExpanded && (
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
                    <Label>Employer</Label>
                    <Input
                        placeholder={entry.employer}
                        value={entry.employer ?? ""}
                        onChange={(e) => handleChange("employer", e.target.value)}
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
                        <CheckboxWithText text="Current Position" />
                    </div>
                </div>
                <div className="flex flex-col whitespace-nowrap gap-3 items-start pb-5">
                    <Label>Description</Label>
                    <Textarea
                        rows={4}
                        placeholder={entry.details}
                        value={entry.details ?? ""}
                        onChange={(e) => handleChange("details", e.target.value)}
                    />
                </div>
            </div>
            )}
        </div>
    )
}
