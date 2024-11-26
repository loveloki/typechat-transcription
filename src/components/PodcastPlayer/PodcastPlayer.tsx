import { getSrtContent } from "@/helper/srt"
import React from "react"

type Props = React.PropsWithChildren<{
  episodeNumber: number
}>

async function PodcastPlayer({ episodeNumber }: Props) {
  const srtContent = getSrtContent(episodeNumber)

  return <div>{(await srtContent).entries[0].text}</div>
}

export default PodcastPlayer
