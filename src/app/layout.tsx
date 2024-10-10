import "./globals.css"

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className="dark">
            <body className="flex justify-center items-center h-screen">{children}</body>
        </html>
    )
}
