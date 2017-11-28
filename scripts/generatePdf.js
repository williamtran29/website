/* eslint-disable no-console, no-restricted-syntax, no-await-in-loop, import/no-extraneous-dependencies */
import chalk from 'chalk'
import tmp from 'tmp-promise'
import puppeteer from 'puppeteer'
import cloudinary from 'cloudinary'
import Training from '../src/server/models/Training'
import { connect, disconnect } from '../src/server/services/database'
import { run } from '../src/server/graphql'

const completeUrl = path => `https://smooth-code-website.herokuapp.com${path}`

const upload = async (publicId, buffer) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(resolve, {
      public_id: publicId,
      resource_type: 'raw',
    })
    stream.on('error', reject)
    stream.end(buffer)
  })

const main = async () => {
  console.log(chalk.gray('Fetching trainings...'))
  const { trainings } = await run(/* GraphQL */ `
    {
      trainings {
        id
        slug
        printLink
      }
    }
  `)
  console.log(chalk.green(`${trainings.length} trainings found.`))
  console.log(chalk.gray(`Starting Chrome...`))
  const browser = await puppeteer.launch()
  console.log(chalk.green(`Browser started.`))
  console.log(chalk.gray(`Generating PDF for all trainings...`))
  await Promise.all(
    trainings.map(async training => {
      const page = await browser.newPage()
      console.log(chalk.gray(`${training.printLink} - Generating PDF...`))
      await page.goto(completeUrl(training.printLink), {
        waitUntil: 'networkidle2',
      })

      const tmpFile = await tmp.tmpName()
      const buffer = await page.pdf({
        path: tmpFile,
        format: 'A4',
        margin: {
          top: '0.5in',
          right: '0.5in',
          bottom: '0.5in',
          left: '0.5in',
        },
      })
      console.log(chalk.green(`${training.printLink} - PDF generated`))
      console.log(chalk.gray(`${training.printLink} - Uploading`))
      const result = await upload(`${training.slug}.pdf`, buffer)
      console.log(chalk.green(`${training.printLink} - Uploaded`))
      console.log(chalk.gray(`${training.printLink} - Updating`))
      await Training.query()
        .update({ pdf: result.secure_url })
        .where({ id: training.id })
      console.log(chalk.green(`${training.printLink} - Updated`))
    }),
  )
  console.log(chalk.green(`✅ All done.`))
  await browser.close()
}

connect()

main()
  .then(() => disconnect())
  .catch(error => {
    setTimeout(() => {
      throw error
    })
  })
