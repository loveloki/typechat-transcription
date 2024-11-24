import styles from "./page.module.css"
import TypeChatInfo from "./TypeChatInfo"

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <TypeChatInfo />
        <PodcastPlayer />
      </main>
    </div>
  )
}

function PodcastPlayer() {
  return (
    <section>
      <p> TODO: Player</p>
    </section>
  )
}
