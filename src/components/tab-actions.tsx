import { Button } from "@/components/ui/button"

interface TabActionsProps {
    onAdd: (() => void) | null
    onRevert: () => void
    onSave: () => void
    saving: boolean
    hasChanges: boolean
}

export default function TabActions({ onAdd, onRevert, onSave, saving, hasChanges }: TabActionsProps) {
    return (
        <div className="flex gap-5 animate-float-fade-in-1_2s-delay" style={{opacity: "0%"}}>
            {onAdd && <Button variant={"secondary"} onClick={onAdd}>Add</Button>}
            {onRevert && <Button variant={"secondary"} onClick={onRevert}>Revert</Button>}
            <Button
                variant={hasChanges ? "default" : "ghost"}
                onClick={onSave}
                className={hasChanges ? "text-primary" : "no-hover"}
            >
                {saving ? "Saving..." : "Save"}
            </Button>
        </div>
    )
}
