import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function LoginPage() {
    return (
        <div className="flex flex-col gap-3 justify-center max-w-md w-full">
            <Label>Username</Label>
            <Input />
            <Label>Password</Label>
            <Input type="password" />
            <Button variant={"default"} size={"lg"}>Log In</Button>
            <Label>Don't have an account?<Link href="/signup" className="text-blue-500"> Sign up now.</Link></Label>
        </div>
    )
}
