import fs from "node:fs/promises"
import path from "node:path"

const srtDirPath = path.join(process.cwd(), "src/srt")

export async function readFile(filePath: string) {
  const finalPath = path.join(process.cwd(), filePath)

  try {
    return fs.readFile(finalPath, "utf-8")
  } catch (_error) {
    console.error(`Error reading ${finalPath} file`)

    return ""
  }
}

export async function readSubtitleFile(episodeNumber: number): Promise<string> {
  const filePath = path.join(srtDirPath, `typechat${episodeNumber}.srt`)

  try {
    return fs.readFile(filePath, "utf-8")
  } catch (_error) {
    console.error(`Error reading subtitle file`)

    return ""
  }
}
