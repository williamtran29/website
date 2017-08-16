import tmp from 'tmp-promise'
import { createReadStream } from 'fs'
import { exec } from 'mz/child_process'
import config from 'server/config'

async function generatePdf(url) {
  const { path: tmpFile } = await tmp.file()
  const chromeBin = config.get('chrome.bin')
  await exec(
    `"${chromeBin}" --headless --disable-gpu --no-sandbox --print-to-pdf=${tmpFile} ${url}`,
  )
  return createReadStream(tmpFile)
}

export default generatePdf
