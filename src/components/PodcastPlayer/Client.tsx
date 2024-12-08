"use client"

import type { Mp3Meta } from "@/types/mp3meta"
import type { Item } from "@/types/podcast"
import type { Entry } from "@plussub/srt-vtt-parser/dist/types"

import { IconRewindBackward10, IconRewindForward30 } from "@tabler/icons-react"
import { Pause, Play, Undo2 } from "lucide-react"
import React, { useEffect, useRef, useState } from "react"

import type { Chapter } from "./ChapterList"

import ChapterList from "./ChapterList"
import styles from "./Client.module.css"
import useIsScrolling from "./useIsScrolling"

type Props = React.PropsWithChildren<{
  episodeInfo: Item
  srtContent: Entry[]
}>

function arrayBufferToBase64(buffer: number[]) {
  let binary = ""
  const bytes = new Uint8Array(buffer)
  const len = bytes.byteLength

  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i])
  }

  return window.btoa(binary)
}

function getChapter(meta: Mp3Meta): Chapter[] {
  const { CHAP } = meta.tags

  return CHAP.map((chap) => {
    const { endTime, id, startTime, subFrames } = chap.data
    const { APIC, TIT2 } = subFrames

    const image = APIC.data.data
    const title = TIT2.data

    return {
      endTime,
      id,
      image: `data:image/jpeg;base64,${arrayBufferToBase64(image)}`,
      startTime,
      title,
    }
  })
}

function getCurrentLine(nowTime: number, srtContent: Entry[]) {
  // todo use dichotomy
  const line = srtContent.find(
    (line) => line.from <= nowTime && line.to >= nowTime,
  )

  return line
}

function PodcastClientPlayer({ episodeInfo, srtContent }: Props) {
  const [currentLine, setCurrentLine] = useState<Entry>()
  const [currentTime, setCurrentTime] = useState(0)
  const [chapters, setChapters] = useState<Chapter[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const podcastPlayerBox = useRef<HTMLOListElement>(null)
  const { doScrolling, isScrolling, setIsScrolling } = useIsScrolling()
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    console.log("episodeInfo", episodeInfo)
  }, [episodeInfo])

  useEffect(() => {
    console.log("chapter", chapters)
  }, [chapters])

  function handleMetaData() {
    const url = "http://localhost:3000/audio/typechat243.mp3"

    globalThis.jsmediatags.read(url, {
      onError: function (error: unknown) {
        console.log(error)
      },
      onSuccess: function (tag) {
        const chap = getChapter(tag as unknown as Mp3Meta)

        setChapters(chap)
      },
    })
  }

  function handleTimeUpdate(e: React.SyntheticEvent<HTMLAudioElement>) {
    const audioDom = e.target as HTMLAudioElement

    const currentTime = audioDom.currentTime * 1000 // use millisecond
    const newLine = getCurrentLine(currentTime, srtContent)

    setCurrentLine(newLine)
    setCurrentTime(currentTime)
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
        <ChapterList
          chapters={chapters}
          currentTime={currentTime}
          defaultPosterImg={episodeInfo["itunes:image"]["@_href"]}
        />
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
        onLoadedMetadata={handleMetaData}
        onTimeUpdate={handleTimeUpdate}
        ref={audioRef}
        src={episodeInfo.guid}
      ></audio>
    </div>
  )
}

export default PodcastClientPlayer
