import Image from "next/image"

import styles from "./ChapterList.module.css"

export interface Chapter {
  endTime: number
  id: string
  image: string
  startTime: number
  title: string
}

type Props = React.PropsWithChildren<{
  chapters: Chapter[]
  currentTime: number
  defaultPosterImg: string
}>

function ChapterList(props: Props) {
  const { chapters, currentTime, defaultPosterImg } = props

  const currentChapter = getCurrentChapter(currentTime, chapters)

  return (
    <div className="chapter-box">
      <div className="img">
        <Image
          alt="243"
          className={styles.poster}
          height={48}
          src={currentChapter ? currentChapter.image : defaultPosterImg}
          unoptimized
          width={48}
        />
      </div>

      {/* {chapters.map(({ id, image, title }) => (
        <Image alt={title} height={100} key={id} src={image} width={100} />
      ))} */}
    </div>
  )
}

function getCurrentChapter(
  nowTime: number,
  chapters: Chapter[],
): Chapter | undefined {
  return chapters.find(
    ({ endTime, startTime }) => startTime <= nowTime && endTime >= nowTime,
  )
}

export default ChapterList
