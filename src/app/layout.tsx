import type { Metadata } from "next"

import CONSTANCE from "@/helper/constants"

import "./globals.css"

const { description, title } = CONSTANCE.homepage

export const metadata: Metadata = {
  description,
  title,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const theme = "light"

  return (
    <html className={theme} lang={CONSTANCE.site.lang}>
      <body>{children}</body>
    </html>
  )
}
