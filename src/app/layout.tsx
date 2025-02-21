import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'Music Box',
    description: 'A generative music box',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className="background text-white">{children}</body>
        </html>
    )
}
