import Link from "@/components/Link"
import CONSTANCE from "@/helper/constants"
import { getRSS } from "@/helper/podcast"
import dayjs from "dayjs"
import Image from "next/image"

import styles from "./TypeChatInfo.module.css"

async function TypeChatInfo() {
  const year = dayjs().diff("2015-09", "year")
  const { text, url } = CONSTANCE.typeChat

  const typeChatRSS = await getRSS()
  const typechatImg = typeChatRSS.channel["itunes:image"]["@_href"]

  return (
    <aside className={styles.box}>
      <Image
        alt={text}
        className={styles.image}
        height={100}
        src={typechatImg}
        unoptimized
        width={100}
      />
      <header className={styles.title}>
        <Link href={url} target="_blank">
          {typeChatRSS.channel.title}
        </Link>
      </header>
      <p>
        《字谈字畅》（TypeChat）是全球首家用华语制作的字体排印主题播客节目，由
        TheType 出品，于 2015 年 9 月正式开播上线，隔周周二播出，至今已经开播{" "}
        {year} 年了，从未跳过一次票。
      </p>
      <p>
        播客专注于字体、排印和其他文字设计相关的内容，涵盖历史知识和新闻轶事。编辑
        Eric Liu
        担任节目策划和制作，与钱争予搭档主播，不定期邀请嘉宾以及友台节目串台。口号是「用听觉方式，扯视觉艺术。」
      </p>
    </aside>
  )
}

export default TypeChatInfo
