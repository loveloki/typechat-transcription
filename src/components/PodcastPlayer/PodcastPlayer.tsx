import { getSrtContent } from "@/helper/srt"
import path from "node:path"
import React from "react"

import PodcastClientPlayer from "./Client"

type Props = React.PropsWithChildren<{
  episodeNumber: number
}>

const mp3Path = path.join(process.cwd(), "src/audio")

async function PodcastPlayer({ episodeNumber }: Props) {
  const srtContent = (await getSrtContent(episodeNumber)).entries

  console.log("mp3Path", `${mp3Path}/typechat${episodeNumber}.mp3`)
  // const url = import(mp3Path + "/typechat" + episodeNumber + ".mp3")

  // console.log({ url })

  return (
    <PodcastClientPlayer
      episodeNumber={episodeNumber}
      srtContent={srtContent}
    />
  )
}

export default PodcastPlayer
