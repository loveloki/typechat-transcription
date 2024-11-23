import CONSTANCE from "@/helper/constants"

import styles from "./page.module.css"

const { description } = CONSTANCE.homepage

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <p>{description}</p>
      </main>
    </div>
  )
}
