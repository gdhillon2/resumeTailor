"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import Link from "next/link"

export default function SignUpPage() {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    const handleSignUp = async () => {
        setError("")
        
        if (!email || !password) {
            setError("Please fill out all fields.")
            return
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.")
            return
        }

        setLoading(true)
        const { error } = await supabase.auth.signUp({
            email,
            password
        })
        if (error) {
            setError(error.message)
        } else {
            alert("Sign up successful! Please check your email to confirm.")
        }
        setLoading(false)
    }

    return (
        <div className="flex flex-col gap-3 justify-center max-w-md w-full mx-auto p-5">
            {error && <p>{error}</p>}
            <Label>Enter a Username</Label>
            <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Label>Enter a Password</Label>
            <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Label>Re-enter your Password</Label>
            <Input
                type="password"
                placeholder="Re-enter Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button variant={"default"} size={"lg"} onClick={handleSignUp}>
                {loading ? "Signing up..." : "Sign Up"}
            </Button>
            <div className="flex justify-end">
            <Label>Already have an account? <Link href="/login" className="text-blue-500">Log in here.</Link></Label>
            </div>
        </div>
    )
}
