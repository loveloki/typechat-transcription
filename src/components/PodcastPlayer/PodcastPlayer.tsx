"use client"

import { FastForward, Pause, Play, StepBack } from "lucide-react"
import { useEffect, useRef, useState } from "react"

import styles from "./PodcastPlayer.module.css"

interface Props {
  nth: string
}

function PodcastPlayer({ nth }: Props) {
  const playerRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioSrc = `/audio/typechat${nth}.mp3`

  useEffect(() => {
    if (isPlaying) {
      setIsPlaying(true)
    }
  }, [isPlaying])

  return (
    <div className="podcast-box">
      {/* <ListMusic /> */}

      <div className={styles.controls}>
        <StepBack />
        {isPlaying ? <Pause size={40} /> : <Play size={40} />}
        <FastForward />
      </div>
      <audio ref={playerRef} src={audioSrc} />
    </div>
  )
}

export default PodcastPlayer
