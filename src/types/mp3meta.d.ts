export interface APIC {
  data: Picture
  description: string
  id: string
  size: number
}

export interface Chap {
  data: CHAPData
  description: string
  id: string
  size: number
}

export interface CHAPData {
  endOffset: number
  endTime: number
  id: string
  startOffset: number
  startTime: number
  subFrames: PurpleSubFrames
}

export interface Comm {
  data: Comment
  description: string
  id: string
  size: number
}

export interface Comment {
  language: string
  short_description: string
  text: string
}

export interface Ctoc {
  data: CTOCData
  description: string
  id: string
  size: number
}

export interface CTOCData {
  childElementIds: string[]
  entryCount: number
  id: string
  ordered: boolean
  subFrames: FluffySubFrames
  topLevel: boolean
}

export interface Flags {
  experimental_indicator: boolean
  extended_header: boolean
  footer_present: boolean
  unsynchronisation: boolean
}

export type FluffySubFrames = object

export interface Mp3Meta {
  flags: Flags
  major: number
  revision: number
  size: number
  tags: Tags
  type: string
  version: string
}

export interface Picture {
  data: number[]
  description: string
  format: string
  type: string
}

export interface PurpleSubFrames {
  APIC: APIC
  TIT2: Talb
}

export interface Tags {
  album: string
  APIC: APIC
  artist: string
  CHAP: Chap[]
  COMM: Comm
  comment: Comment
  CTOC: Ctoc
  genre: string
  picture: Picture
  TALB: Talb
  TCON: Talb
  TENC: Talb
  TIT2: Talb
  TIT3: Talb
  title: string
  TLEN: Talb
  TPE1: Talb
  TYER: Talb
  year: string
}

export interface Talb {
  data: string
  description: string
  id: string
  size: number
}
