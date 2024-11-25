import PodcastPlayer from "@/components/PodcastPlayer"

import styles from "./page.module.css"
import TypeChatInfo from "./TypeChatInfo"

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <TypeChatInfo />
        <PodcastPlayer nth="243" />
      </main>
    </div>
  )
}
