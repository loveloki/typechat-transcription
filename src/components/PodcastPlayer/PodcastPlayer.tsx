"use client"

import type { Entry } from "@plussub/srt-vtt-parser/dist/types"
import type { SyntheticEvent } from "react"

import { FastForward, Pause, Play, StepBack } from "lucide-react"
import { useEffect, useRef, useState } from "react"

import styles from "./PodcastPlayer.module.css"

interface Props {
  nth: string
  srt: Entry[]
}

function PodcastPlayer({ nth, srt }: Props) {
  const playerRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [line, setLKine] = useState("")
  const audioSrc = `/audio/typechat${nth}.mp3`

  function handleTimeUp(e: SyntheticEvent<HTMLAudioElement, Event>) {
    const nowTime = (e.target as HTMLAudioElement).currentTime * 1000

    const nowSrtLine =
      srt.find((line) => line.from <= nowTime && line.to >= nowTime)?.text ?? ""

    console.log("nowSrtLine", nowTime, nowSrtLine)
    setLKine(nowSrtLine)
  }

  useEffect(() => {
    if (isPlaying) {
      setIsPlaying(true)
    }
  }, [isPlaying])

  return (
    <div className="podcast-box">
      {/* <ListMusic /> */}

      <div>
        <p>字幕</p>
        <section className={styles.section}>{line}</section>
      </div>
      <div className={styles.controls}>
        <StepBack />
        {isPlaying ? <Pause size={40} /> : <Play size={40} />}
        <FastForward />
      </div>
      <audio
        controls
        onTimeUpdate={handleTimeUp}
        ref={playerRef}
        src={audioSrc}
      />
    </div>
  )
}

export default PodcastPlayer
