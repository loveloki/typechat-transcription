import PodcastPlayer from "@/components/PodcastPlayer"
import { parse } from "@plussub/srt-vtt-parser"
import fs from "node:fs/promises"
import path from "node:path"

import styles from "./page.module.css"
import TypeChatInfo from "./TypeChatInfo"

export default async function Home() {
  const filePath = path.join(process.cwd(), "/public/srt/typechat243.srt")
  const srt = await fs.readFile(filePath, "utf8")

  const { entries } = parse(srt)

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <TypeChatInfo />
        <PodcastPlayer nth="243" srt={entries} />
      </main>
    </div>
  )
}
