/* eslint-disable no-cond-assign */
const getStdin = require('./getStdin')

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
  .then(courses => process.stdout.write(JSON.stringify(courses)))
