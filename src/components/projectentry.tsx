import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Input } from "./ui/input"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MouseEventHandler } from "react"

interface ProjectEntryParams {
    entry: ProjectEntryType
    DestroyEntry: MouseEventHandler<HTMLElement>
    onChange: (updatedEntry: ProjectEntryType) => void
}

export interface ProjectEntryType {
    id: number
    title: string
    type: string
    details: string
    technologies: string
    role: string
    startDate: string
    endDate?: string
}

export default function ProjectEntry({ entry, DestroyEntry, onChange }: ProjectEntryParams) {

    const handleChange = (field: keyof ProjectEntryType, value: string) => {
        onChange({ ...entry, [field]: value })
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <div className="flex justify-between items-center">
                        {entry.title ? entry.title : "Project Title"}
                        <Button
                            variant={"destructive"}
                            size={"sm"}
                            onClick={DestroyEntry}
                        >
                            Remove Project
                        </Button>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-5 w-full">
                    <div className="flex flex-col whitespace-nowrap gap-3 items-start">
                        <Label>Title</Label>
                        <Input
                            placeholder={entry.title}
                            value={entry.title}
                            onChange={(e) => handleChange("title", e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col whitespace-nowrap gap-3 items-start">
                        <Label>Type</Label>
                        <Input
                            placeholder={entry.type}
                            value={entry.type}
                            onChange={(e) => handleChange("type", e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col whitespace-nowrap gap-3 items-start">
                        <div className="flex w-full max-w-md justify-between ">
                            <Label>Start</Label>
                            <Input
                                placeholder={entry.startDate}
                                value={entry.startDate}
                                onChange={(e) => handleChange("startDate", e.target.value)}
                            />
                            <Label>End</Label>
                            <Input
                                placeholder={entry.endDate}
                                value={entry.endDate}
                                onChange={(e) => handleChange("endDate", e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col whitespace-nowrap gap-3 items-start">
                        <Label>Description</Label>
                        <Textarea
                            rows={4}
                            placeholder={entry.details}
                            value={entry.details}
                            onChange={(e) => handleChange("details", e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col whitespace-nowrap gap-3 items-start">
                        <Label>Technologies Used</Label>
                        <Textarea
                            rows={2}
                            placeholder={entry.technologies}
                            value={entry.technologies}
                            onChange={(e) => handleChange("technologies", e.target.value)}
                        />
                    </div>

                </div>
            </CardContent>
        </Card >
    )
}
