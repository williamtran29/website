/* eslint-disable no-cond-assign, no-console */
async function getStdin() {
  return new Promise((resolve, reject) => {
    let data = ''
    process.stdin.setEncoding('utf8')
    process.stdin.on('error', reject)

    process.stdin.on('readable', () => {
      const chunk = process.stdin.read()
      if (chunk !== null) {
        data += chunk.toString()
      }
    })

    process.stdin.on('end', () => {
      resolve(data)
    })
  })
}

module.exports = getStdin
