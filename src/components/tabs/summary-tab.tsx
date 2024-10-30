import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface SummaryTabProps {
}

export default function SummaryTab({
}: SummaryTabProps) {
    return (
        <div className="flex flex-col items-start w-full">
            <div className="flex flex-col w-full">
                <div className="flex justify-end gap-5 p-5 border-b">
                    <Label className="text-xl flex w-full items-center font-bold">Provide a Summary About Yourself</Label>
                </div>
                <div className="flex flex-col w-full h-full p-5 gap-2">
                    <div className="bg-slate-800 p-2 rounded-xl">
                        <div className="">
                            <Textarea
                                rows={5}
                                placeholder="Provide your summary here."
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
