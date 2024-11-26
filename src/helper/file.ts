import fs from "node:fs/promises"
import path from "node:path"

const srtDirPath = path.join(process.cwd(), "src/srt")

export async function readSubtitleFile(episodeNumber: number): Promise<string> {
  const filePath = path.join(srtDirPath, `typechat${episodeNumber}.srt`)

  try {
    return fs.readFile(filePath, "utf-8")
  } catch (error: any) {
    console.error(`Error reading subtitle file: ${error}`)

    return ""
  }
}
