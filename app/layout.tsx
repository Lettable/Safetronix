import type React from "react"
import type { Metadata } from "next"
import { Inter, Orbitron } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })
const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "700", "900"],
})

export const metadata: Metadata = {
  title: "Safetronix - Digital Threat Surveillance Network",
  description:
    "Independent online taskforce identifying and escalating serious digital threats across platforms globally.",
  keywords: "cyber security, threat intelligence, digital surveillance, online safety",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} ${orbitron.variable} bg-black text-white min-h-screen overflow-x-hidden`}>
        <div className="relative w-full">
          {/* Animated background grid */}
          <div className="fixed inset-0 bg-black">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-black via-cyan-900/5 to-blue-800/10" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
            {/* Floating blue elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-20 left-10 w-8 h-8 bg-blue-500/20 rounded-full blur-sm animate-pulse"></div>
              <div className="absolute top-40 right-20 w-6 h-6 bg-cyan-400/30 rounded-full blur-sm animate-pulse delay-1000"></div>
              <div className="absolute bottom-40 left-1/4 w-10 h-10 bg-blue-400/15 rounded-full blur-sm animate-pulse delay-2000"></div>
              <div className="absolute bottom-20 right-1/3 w-4 h-4 bg-blue-600/25 rounded-full blur-sm animate-pulse delay-500"></div>
            </div>
          </div>
          <div className="relative z-10 w-full">{children}</div>
        </div>
      </body>
    </html>
  )
}
