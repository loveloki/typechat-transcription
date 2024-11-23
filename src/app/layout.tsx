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
  const theme = "light"

  return (
    <html lang={CONSTANCE.site.lang} className={theme}>
      <body>{children}</body>
    </html>
  )
}
