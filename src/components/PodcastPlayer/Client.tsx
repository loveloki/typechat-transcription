"use client"

import type { Entry } from "@plussub/srt-vtt-parser/dist/types"

// import { Pause, Play } from "lucide-react"
import React, { useState } from "react"

import styles from "./Client.module.css"

type Props = React.PropsWithChildren<{
  episodeNumber: number
  srtContent: Entry[]
}>

function getCurrentLine(nowTime: number, srtContent: Entry[]) {
  const line = srtContent.find(
    (line) => line.from <= nowTime && line.to >= nowTime,
  )

  // not find use 0
  return line ? line.id : "0"
}

function PodcastClientPlayer({ episodeNumber, srtContent }: Props) {
  const audioSrc = `/audio/typechat${episodeNumber}.mp3`
  const [currentLine, setCUrrentLine] = useState("0")

  function handleTimeUpdate(e: React.SyntheticEvent<HTMLAudioElement>) {
    const audioDom = e.target as HTMLAudioElement

    const nowTime = audioDom.currentTime * 1000 // use millisecond
    const newLine = getCurrentLine(nowTime, srtContent)

    setCUrrentLine(newLine)
  }

  return (
    <div>
      <div className={styles.captions}>
        <ol>
          {srtContent.map((line) => (
            <li
              className={currentLine === line.id ? styles.highlight : undefined}
              key={line.id}
            >
              {line.text}
            </li>
          ))}
        </ol>
      </div>

      <div className="controls">
        {/* <Play />
        <Pause /> */}
      </div>
      <audio controls onTimeUpdate={handleTimeUpdate} src={audioSrc}></audio>
    </div>
  )
}

export default PodcastClientPlayer
