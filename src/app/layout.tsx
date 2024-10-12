import NavigationLayout from "@/components/navigation-bar"
import "./globals.css"

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className="dark">
            <body className="flex flex-col h-screen w-screen">
                <div className="flex w-full justify-end p-5">
                    <NavigationLayout />
                </div>
                <div className="flex flex-grow justify-center items-center">
                    {children}
                </div>
            </body>
        </html>
    )
}
