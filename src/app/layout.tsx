import CONSTANCE from "@/helper/constants"

import "./globals.css"
import type { Metadata } from "next"

const { title, description } = CONSTANCE.homepage

export const metadata: Metadata = {
  title,
  description,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang={CONSTANCE.site.lang}>
      <body>{children}</body>
    </html>
  )
}
