import type { Metadata } from "next"

import CONSTANCE from "@/helper/constants"

import "./globals/globals.css"
import Script from "next/script"

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
      <Script
        crossOrigin="anonymous"
        integrity="sha512-YsR46MmyChktsyMMou+Bs74oCa/CDdwft7rJ5wlnmDzMj1mzqncsfJamEEf99Nk7IB0JpTMo5hS8rxB49FUktQ=="
        referrerPolicy="no-referrer"
        src="https://cdnjs.cloudflare.com/ajax/libs/jsmediatags/3.9.5/jsmediatags.min.js"
      ></Script>
    </html>
  )
}
