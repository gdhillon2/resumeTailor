import { Button } from "@/components/ui/button"
import Link from "next/link"
import "./globals.css"
export default function Home() {
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
                    <Link href="/dashboard">
                        <Button variant={"outline"} size={"lg"}>Start Now</Button>
                    </Link>
                </div>
            </div>
        </>
    )
}
