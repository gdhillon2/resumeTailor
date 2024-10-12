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
}

export interface JobEntryType {
    id: number;
    title: string;
    employer: string;
    details: string;
}


export default function JobEntry({ entry, DestroyEntry }: JobEntryParams) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <div className="flex justify-between">
                        Job {entry.id + 1}
                        <Button
                            variant={"destructive"}
                            size={"sm"}
                            onClick={DestroyEntry}
                        >
                            Remove Job {entry.id + 1}
                        </Button>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-5 w-full">
                    <div className="flex flex-col whitespace-nowrap gap-3 items-start">
                        <Label>Title</Label>
                        <Input placeholder={entry.title} />
                    </div>
                    <div className="flex flex-col whitespace-nowrap gap-3 items-start">
                        <Label>Employer</Label>
                        <Input placeholder={entry.employer} />
                    </div>
                    <div className="flex flex-col whitespace-nowrap gap-3 items-start">
                        <Label>Description</Label>
                        <Textarea rows={4} placeholder={entry.details} />
                    </div>
                </div>
            </CardContent>
            <CardFooter>

            </CardFooter>
        </Card >
    )
}
