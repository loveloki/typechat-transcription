import { getSrtContent } from "@/helper/srt"
import React from "react"

type Props = React.PropsWithChildren<{
  episodeNumber: number
}>

async function PodcastPlayer({ episodeNumber }: Props) {
  const srtContent = await getSrtContent(episodeNumber)

  return <div>{srtContent.entries[0].text}</div>
}

export default PodcastPlayer
