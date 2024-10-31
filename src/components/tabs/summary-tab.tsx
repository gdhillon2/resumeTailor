import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import TabActions from "../tab-actions"

interface SummaryTabProps {
    summary: string
    fetchSummary: () => Promise<void>
    handleSummaryChange: (summary: string) => void
    summaryChanges: boolean
    submitSummary: () => Promise<void>
    savingSummary: boolean
}

export default function SummaryTab({
    summary,
    fetchSummary,
    handleSummaryChange,
    summaryChanges,
    submitSummary,
    savingSummary
}: SummaryTabProps) {
    return (
        <div className="flex flex-col items-start w-full">
            <div className="flex flex-col w-full">
                <div className="flex justify-end gap-5 p-5 border-b gradient">
                    <Label className="text-xl flex w-full items-center font-bold">Provide a Summary About Yourself</Label>
                    <TabActions
                        onAdd={null}
                        onRevert={fetchSummary}
                        onSave={submitSummary}
                        saving={savingSummary}
                        hasChanges={summaryChanges}
                    />
                </div>
                <div className="flex flex-col w-full h-full p-5 gap-2">
                    <div className="bg-slate-800 p-2 rounded-xl">
                        <div className="">
                            <Textarea
                                rows={5}
                                placeholder="Provide your summary here."
                                value={summary ? summary : ""}
                                onChange={(e) => handleSummaryChange(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
