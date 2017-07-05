// import * as htmlPdf from 'html-pdf-chrome
import tmp from 'tmp-promise'
import { createReadStream } from 'fs'
import { exec } from 'mz/child_process'
import config from 'server/config'
import { trainingRoute } from 'modules/routePaths'

async function generatePdf(training) {
  const trainingPath = trainingRoute(training.slug)
  const trainingUrl = `${config.get('server.externalUrl')}${trainingPath}`
  const { path: tmpFile } = await tmp.file()
  const chromeBin = config.get('chrome.bin')
  await exec(
    `"${chromeBin}" --headless --disable-gpu --no-sandbox --print-to-pdf=${tmpFile} ${trainingUrl}`,
  )
  return createReadStream(tmpFile)
}

export default generatePdf
