import React from 'react'
import gql from 'graphql-tag'
import moment from 'moment'
import { getDatesBetween } from 'shared/date'

const SessionDates = ({ session }) => (
  <React.Fragment>
    {getDatesBetween(session.startDate, session.endDate).map(date => (
      <div key={date.toString()}>
        {moment(date).format('DD/MM')} | 9h30 - 17h30
      </div>
    ))}
  </React.Fragment>
)

export const sessionDatesFragment = gql`
  fragment SessionDates on Session {
    startDate
    endDate
  }
`

export default SessionDates
