import { Button } from "@/components/ui/button"
import { FaPlus, FaUndo, FaSave } from "react-icons/fa"
import { useAuth } from "@/context/authContext"

interface TabActionsProps {
    onAdd: (() => void) | null
    onRevert: () => void
    onSave: () => void
    saving: boolean
    hasChanges: boolean
}

export default function TabActions({ onAdd, onRevert, onSave, saving, hasChanges }: TabActionsProps) {
    const { user } = useAuth()
    return (
        <div className="flex gap-5 animate-float-fade-in-1_2s-delay items-center" style={{ opacity: "0%" }}>
            {
                !user && (
                    <div className="whitespace-nowrap text-sm font-bold">Warning: Save and Revert don't work in demo mode</div>
                )
            }
            {onAdd && (
                <div className="relative group">
                    <Button variant={"secondary"} onClick={onAdd}>
                        <FaPlus size={16} />
                    </Button>
                    <span className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        Add
                    </span>
                </div>
            )}
            {onRevert && (
                <div className="relative group">
                    <Button variant={"secondary"} onClick={onRevert}>
                        <FaUndo size={16} />
                    </Button>
                    <span className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        Revert
                    </span>
                </div>
            )}
            <div className="relative group">
                <Button
                    variant={hasChanges ? "default" : "ghost"}
                    onClick={onSave}
                    className={hasChanges ? "text-primary" : "no-hover"}
                >
                    <FaSave size={16} />
                </Button>
                <span className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {saving ? "Saving..." : "Save"}
                </span>
            </div>
        </div>
    )
}
