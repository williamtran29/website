/* eslint-disable no-cond-assign */
const getStdin = require('./getStdin')

getStdin().then(stdin => {
  const courses = JSON.parse(stdin)
  courses.forEach(course => {
    process.stdout.write(`### ${course.title}\n\n${course.content}\n`)
  })
})
