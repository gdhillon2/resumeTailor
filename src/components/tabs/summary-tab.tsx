import { Label } from "@/components/ui/label"

interface SummaryTabProps {
}

export default function SummaryTab({
}: SummaryTabProps) {
    return (
        <div className="flex flex-col items-start w-full">
            <div className="flex flex-col w-full">
                <div className="flex justify-end gap-5 p-5 border-b">
                    <Label className="text-xl flex w-full items-center font-bold">Summary</Label>
                </div>
            </div>
        </div>
    )
}
