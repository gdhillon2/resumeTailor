import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function LoginPage() {
    return (
        <div className="flex flex-col gap-3 justify-center">
            <Label>Username</Label>
            <Input />
            <Label>Password</Label>
            <Input type="password" />
            <Button variant={"default"} size={"lg"}>Log In</Button>
        </div>
    )
}
