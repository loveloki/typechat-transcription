import { parse } from "@plussub/srt-vtt-parser"

import { readSubtitleFile } from "./file"

export async function getSrtContent(episodeNumber: number) {
  const fileContent = await readSubtitleFile(episodeNumber)
  const subtitleContent = parse(fileContent)

  return subtitleContent
}
