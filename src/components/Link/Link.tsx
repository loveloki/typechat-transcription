import type { ComponentPropsWithRef } from "react"

import { ExternalLink, Link as LinkIcon } from "lucide-react"
import Link from "next/link"

type Props = ComponentPropsWithRef<typeof Link>

function MyLink({ children, ...delegated }: Props) {
  const isExternal = delegated.target === "_blank"

  return (
    <Link {...delegated}>
      {children}
      {isExternal ? <ExternalLink /> : <LinkIcon />}
    </Link>
  )
}

export default MyLink
