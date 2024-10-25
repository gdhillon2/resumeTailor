import "./globals.css"
import { AuthProvider } from "@/context/authContext"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "ResumeTailor",
    description: "Website that helps tailor your resume to open job positions leveraging AI."
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className="dark">
            <body className="flex flex-col h-screen w-screen">
                <AuthProvider>
                    <div className="flex w-full h-full">
                        {children}
                    </div>
                </AuthProvider>
            </body>
        </html>
    )
}
