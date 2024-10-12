"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import "./globals.css"
import { useAuth } from "@/context/authContext"
export default function Home() {
    const { user } = useAuth()

    return (
        <>
            <div className="w-full h-full flex flex-col gap-5 justify-center items-center text-center">
                <div className="text-5xl font-bold flex justify-center">
                    ResumeTailor
                </div>
                <div className="animate-float-fade-in-1s text-3xl flex justify-center">
                    Transform your resume, transform your future.
                </div>
                <div className="animate-float-fade-in-1_2s-delay" style={{ opacity: 0 }}>
                    <Link href={user ? "/dashboard" : "/login"}>
                        <Button variant={"outline"} size={"lg"}>Start Now</Button>
                    </Link>
                </div>
            </div>
        </>
    )
}
