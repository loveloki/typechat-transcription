import type { TypechatPodcast } from "@/types/podcast"

import { XMLParser } from "fast-xml-parser"
import { cache } from "react"

import { readFile } from "./file"

const options = {
  ignoreAttributes: false,
}

const parser = new XMLParser(options)

const podcastRSSFilePath = "public/typechat.xml"

export const getEpisode = cache(async function getEpisode(
  episodeNumber: number,
) {
  const typechatXML = await getRSS()

  const { item } = typechatXML.rss.channel

  return item.find((p) => p.title.split("：")[0] === `#${episodeNumber}`)
})

export const getRSS = cache(async function getRSS() {
  const file = await readFile(podcastRSSFilePath)
  const jsonObj = parser.parse(file) as TypechatPodcast

  return jsonObj
})
