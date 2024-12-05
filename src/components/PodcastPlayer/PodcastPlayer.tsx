import { getEpisode } from "@/helper/podcast"
import { getSrtContent } from "@/helper/srt"
import React from "react"

import PodcastClientPlayer from "./Client"

type Props = React.PropsWithChildren<{
  episodeNumber: number
}>

async function PodcastPlayer({ episodeNumber }: Props) {
  const episodeInfo = await getEpisode(episodeNumber)
  const srtContent = (await getSrtContent(episodeNumber)).entries

  if (!episodeInfo) {
    return <div>not found #{episodeNumber} podcast!</div>
  }

  return (
    <PodcastClientPlayer episodeInfo={episodeInfo} srtContent={srtContent} />
  )
}

export default PodcastPlayer
