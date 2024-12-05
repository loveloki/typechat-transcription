export enum ItunesExplicit {
  Clean = "clean",
}

export enum Type {
  AudioMPEG = "audio/mpeg",
}

export interface AtomLink {
  "@_href": string
  "@_rel": string
  "@_type": string
}

export interface Channel {
  "atom:link": AtomLink
  copyright: string
  description: string
  image: Image
  item: Item[]
  "itunes:author": string
  "itunes:category": ItunesCategoryElement[]
  "itunes:explicit": string
  "itunes:image": ItunesImage
  "itunes:keywords": string
  "itunes:new-feed-url": string
  "itunes:owner": ItunesOwner
  "itunes:subtitle": string
  "itunes:summary": string
  language: string
  lastBuildDate: string
  link: string
  pubDate: string
  "rawvoice:rating": string
  title: string
}

export interface Enclosure {
  "@_length": string
  "@_type": Type
  "@_url": string
}

export interface Image {
  link: string
  title: string
  url: string
}

export interface Item {
  description: string
  enclosure: Enclosure
  guid: string
  "itunes:author": string
  "itunes:duration": string
  "itunes:explicit": ItunesExplicit
  "itunes:image": ItunesImage
  "itunes:subtitle": string
  "itunes:summary": string
  link: string
  pubDate: string
  "rawvoice:poster": RawvoicePoster
  title: string
}

export interface ItunesCategoryElement {
  "@_text": string
  "itunes:category"?: ItunesCategoryItunesCategory
}

export interface ItunesCategoryItunesCategory {
  "@_text": string
}

export interface ItunesImage {
  "@_href": string
}

export interface ItunesOwner {
  "itunes:email": string
  "itunes:name": string
}

export interface RawvoicePoster {
  "@_url": string
}

export interface RSS {
  "@_version": string
  "@_xmlns:atom": string
  "@_xmlns:itunes": string
  "@_xmlns:rawvoice": string
  channel: Channel
}

export interface TypechatPodcast {
  rss: RSS
}
