"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function LoginPage() {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")
    const router = useRouter()

    useEffect(() => {
        const inputEmail = document.querySelector('input[type="email"]') as HTMLInputElement;
        const inputPassword = document.querySelector('input[type="password"]') as HTMLInputElement;

        if (inputEmail) {
            setEmail(inputEmail.value);
        }
        if (inputPassword) {
            setPassword(inputPassword.value);
        }
    }, [])

    const handleLogIn = async () => {
        if (!email || !password) {
            setError("Please fill out both fields.")
            return
        }
        setLoading(true)
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error) {
            setError(error.message)
        } else {
            router.push("/dashboard")
        }
        setLoading(false)
    }

    return (
        <div className="flex flex-col gap-3 justify-center max-w-md w-full">
            {error && <Label>{error}</Label>}
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
                {loading ? "Logging in..." : "Log in"}
            </Button>
            <div className="flex justify-end">
                <Label>Don't have an account?<Link href="/signup" className="text-blue-500"> Sign up now.</Link></Label>
            </div>
        </div>
    )
}
