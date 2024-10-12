"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function LoginPage() {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<string>("")

    const handleLogIn = async () => {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error) {
            setError(error.message)
        } else {
            alert("Login successful!")
        }
    }

    return (
        <div className="flex flex-col gap-3 justify-center max-w-md w-full">
            {error && <p>{error}</p>}
            <Label>Username</Label>
            <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Label>Password</Label>
            <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button
                variant={"default"}
                size={"lg"}
                onClick={handleLogIn}
            >
                Log In
            </Button>
            <Label>Don't have an account?<Link href="/signup" className="text-blue-500"> Sign up now.</Link></Label>
        </div>
    )
}
