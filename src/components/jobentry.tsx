import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MouseEventHandler } from "react";
interface JobEntryParams {
    entry: JobEntryType
    DestroyEntry: MouseEventHandler<HTMLElement>;
    onChange: (updatedEntry: JobEntryType) => void;
}

export interface JobEntryType {
    id: number;
    title: string;
    employer: string;
    startDate: string;
    endDate: string;
    details: string;
}


export default function JobEntry({ entry, DestroyEntry, onChange }: JobEntryParams) {

    const handleChange = (field: keyof JobEntryType, value: string) => {
        onChange({ ...entry, [field]: value });
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <div className="flex justify-between items-center">
                        Job
                        <Button
                            variant={"destructive"}
                            size={"sm"}
                            onClick={DestroyEntry}
                        >
                            Remove Job
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
                        <Label>Employer</Label>
                        <Input
                            placeholder={entry.employer}
                            value={entry.employer}
                            onChange={(e) => handleChange("employer", e.target.value)}
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
                </div>
            </CardContent>
            <CardFooter>

            </CardFooter>
        </Card >
    )
}
