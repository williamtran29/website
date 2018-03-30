import moment from 'moment'

export const getDatesBetween = (startDate, endDate) => {
  const dates = []
  let currDate = moment.utc(startDate).startOf('day')
  const lastDate = moment.utc(endDate).startOf('day')

  dates.push(currDate.toDate())

  while (currDate.add(1, 'days').diff(lastDate) <= 0) {
    currDate = currDate.clone()
    dates.push(currDate.toDate())
  }

  return dates
}

export const shortDuration = (startDate, endDate) => {
  const mStartDate = moment.utc(startDate)
  const mEndDate = moment.utc(endDate)
  const startDateMonth = mStartDate.format('MMM')
  const endDateMonth = mEndDate.format('MMM')
  const startDateDay = mStartDate.format('D')
  const endDateDay = mEndDate.format('D')
  return startDateDay === endDateDay
    ? `${startDateDay} ${startDateMonth}`
    : `${startDateDay}-${endDateDay} ${endDateMonth}`
}

export const longDuration = (startDate, endDate) => {
  const mStartDate = moment.utc(startDate)
  const mEndDate = moment.utc(endDate)
  const startDateMonth = mStartDate.format('MMMM')
  const endDateMonth = mEndDate.format('MMMM')
  const startDateDay = mStartDate.format('D')
  const endDateDay = mEndDate.format('D')
  return startDateDay === endDateDay
    ? `le ${mStartDate.format('D')} ${startDateMonth}`
    : startDateMonth === endDateMonth
      ? `du ${mStartDate.format('D')} au ${mEndDate.format(
          'D',
        )} ${endDateMonth}`
      : `du ${mStartDate.format('D')} ${startDateMonth} au ${mEndDate.format(
          'D',
        )} ${endDateMonth}`
}
