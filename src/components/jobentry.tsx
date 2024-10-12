import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input"

interface JobEntryParams {
    JobEntryTitle: string;
    JobEntryEmployer: string;
    JobEntryDetails: string;
}


export default function JobEntry({ JobEntryTitle, JobEntryEmployer, JobEntryDetails }: JobEntryParams) {
    return (
        <div className="flex flex-col gap-5 w-full">
            <div className="flex flex-col whitespace-nowrap gap-3 items-start">
                <Label>{JobEntryTitle}</Label>
                <Input />
            </div>
            <div className="flex flex-col whitespace-nowrap gap-3 items-start">
                <Label>{JobEntryEmployer}</Label>
                <Input />
            </div>
            <div className="flex flex-col whitespace-nowrap gap-3 items-start">
                <Label>{JobEntryDetails}</Label>
                <Textarea rows={4} />
            </div>
        </div>
    )
}
