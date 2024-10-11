import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input"

interface JobEntryParams {
    JobEntryTitle: string;
    JobEntryDetails: string;
}


export default function JobEntry({ JobEntryTitle, JobEntryDetails }: JobEntryParams) {
    return (
        <div className="flex flex-col gap-3">
            <div className="flex whitespace-nowrap gap-5 items-center">
                <div className="w-[200px]">
                    <Label>{JobEntryTitle}</Label>
                </div>
                <Input />
            </div>
            <div className="flex whitespace-nowrap gap-5 items-start">
                <div className="w-[200px]">
                    <Label>{JobEntryDetails}</Label>
                </div>
                <Textarea />
            </div>
        </div>
    )
}
