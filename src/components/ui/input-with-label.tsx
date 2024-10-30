import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface InputWithLabelProps {
    labelText: string
    inputType?: string | null
    placeholderText: string | null
    inputValue?: string | null
    inputLength?: string
    name: string
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function InputWithLabel({
    labelText,
    inputType = null,
    placeholderText = null,
    inputValue = null,
    inputLength,
    name,
    handleChange
}: InputWithLabelProps) {
    return (
        <div className={`grid w-full ${inputLength ? inputLength : "max-w-sm"} items-center gap-1.5`}>
            <Label>{labelText}</Label>
            <Input
                type={inputType ? inputType : ""}
                placeholder={placeholderText ? placeholderText : ""}
                value={inputValue ? inputValue : ""}
                name={name}
                onChange={handleChange}
            />
        </div >
    )
}
