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

getStdin()
  .then(stdin => {
    const courses = []
    const REGEXP = /###\s?(.*)\n{1,2}([^#]*)/g
    let match
    while ((match = REGEXP.exec(stdin)) !== null) {
      courses.push({ title: match[1], content: match[2] })
    }
    return courses
  })
  .then(courses => console.log(JSON.stringify(courses)))
