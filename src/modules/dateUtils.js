import moment from 'modules/moment'

export const humanizeDate = ({ startDate, endDate }) => {
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

export const longHumanizeDate = ({ startDate, endDate }) => {
  const mStartDate = moment.utc(startDate)
  const mEndDate = moment.utc(endDate)
  const startDateMonth = mStartDate.format('MMMM')
  const endDateMonth = mEndDate.format('MMMM')
  const startDateDay = mStartDate.format('D')
  const endDateDay = mEndDate.format('D')
  return startDateDay === endDateDay
    ? `${mStartDate.format('dddd')} ${mStartDate.format('D')} ${startDateMonth}`
    : startDateMonth === endDateMonth
      ? `du ${mStartDate.format('dddd')} ${mStartDate.format(
          'D',
        )} au ${mEndDate.format('dddd')} ${mEndDate.format(
          'D',
        )} ${endDateMonth}`
      : `du ${mStartDate.format('dddd')} ${mStartDate.format(
          'D',
        )} ${startDateMonth} au ${mEndDate.format('dddd')} ${mEndDate.format(
          'D',
        )} ${endDateMonth}`
}
