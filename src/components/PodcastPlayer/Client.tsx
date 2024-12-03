"use client"

import type { Entry } from "@plussub/srt-vtt-parser/dist/types"

import { IconRewindBackward10, IconRewindForward30 } from "@tabler/icons-react"
import { Pause, Play, Undo2 } from "lucide-react"
import React, { useEffect, useRef, useState } from "react"

import styles from "./Client.module.css"
import useIsScrolling from "./useIsScrolling"

type Props = React.PropsWithChildren<{
  episodeNumber: number
  srtContent: Entry[]
}>

function getCurrentLine(nowTime: number, srtContent: Entry[]) {
  // todo use dichotomy
  const line = srtContent.find(
    (line) => line.from <= nowTime && line.to >= nowTime,
  )

  return line
}

function PodcastClientPlayer({ episodeNumber, srtContent }: Props) {
  const audioSrc = `/audio/typechat${episodeNumber}.mp3`
  const [currentLine, setCurrentLine] = useState<Entry>()
  const [isPlaying, setIsPlaying] = useState(false)
  const podcastPlayerBox = useRef<HTMLOListElement>(null)
  const { doScrolling, isScrolling, setIsScrolling } = useIsScrolling()
  const audioRef = useRef<HTMLAudioElement>(null)

  function handleTimeUpdate(e: React.SyntheticEvent<HTMLAudioElement>) {
    const audioDom = e.target as HTMLAudioElement

    const nowTime = audioDom.currentTime * 1000 // use millisecond
    const newLine = getCurrentLine(nowTime, srtContent)

    setCurrentLine(newLine)
  }

  /**
   * click re-scroll btn to restart scroll into caption
   */
  function handleClickReScroll() {
    setIsScrolling(false)
  }

  /**
   * update isScrolling state
   */
  function handleScroll() {
    doScrolling()
  }

  /**
   * toggle playing
   */
  function handlePlaying() {
    setIsPlaying((currentPlaying) => !currentPlaying)
  }

  function handleUpdateCurrentTime(step: number) {
    const audioDom = audioRef.current

    if (!audioDom) {
      return
    }

    audioDom.currentTime += step
  }

  // when isPlaying change
  useEffect(() => {
    const audioDom = audioRef.current

    if (!audioDom) {
      return
    }

    try {
      if (isPlaying) {
        void audioDom.play()
      } else {
        audioDom.pause()
      }
    } catch (error) {
      audioDom.pause()
      console.log("pause playing podcast, error: ", error)
    }
  }, [isPlaying])

  // scroll caption in to center
  useEffect(() => {
    // when scrolling, stop auto scroll into view
    if (isScrolling) {
      return
    }

    if (podcastPlayerBox.current) {
      const domLine: HTMLLIElement = podcastPlayerBox.current.querySelector(
        `li[data-id='${currentLine?.id}']`,
      )!

      if (domLine) {
        // use dom scrollIntoView
        domLine.scrollIntoView({
          behavior: "smooth",
          block: "center",
        })
      }
    }
  }, [currentLine, isScrolling])

  return (
    <div>
      <div className={styles["captions-box"]}>
        <ol
          className={styles.captions}
          id="podcast-player-box"
          onScroll={handleScroll}
          ref={podcastPlayerBox}
        >
          {srtContent.map((line) => (
            <li
              className={
                currentLine?.id === line.id ? styles.highlight : undefined
              }
              data-id={line.id}
              key={line.id}
            >
              {line.text}
            </li>
          ))}
        </ol>

        <div className={styles["re-scroll"]} onClick={handleClickReScroll}>
          <Undo2 size={16} />
        </div>
      </div>

      <div className={styles.controls}>
        <button
          className={styles["control-button"]}
          onClick={() => handleUpdateCurrentTime(-10)}
        >
          <IconRewindBackward10 size={32} />
        </button>
        {isPlaying ? (
          <button
            className={styles["control-button"]}
            key="play-button"
            onClick={handlePlaying}
          >
            <Pause size={32} />
          </button>
        ) : (
          <button
            className={styles["control-button"]}
            key="play-button"
            onClick={handlePlaying}
          >
            <Play size={32} />
          </button>
        )}

        <button
          className={styles["control-button"]}
          onClick={() => handleUpdateCurrentTime(30)}
        >
          <IconRewindForward30 size={32} />
        </button>
      </div>
      <audio
        onTimeUpdate={handleTimeUpdate}
        ref={audioRef}
        src={audioSrc}
      ></audio>
    </div>
  )
}

export default PodcastClientPlayer
