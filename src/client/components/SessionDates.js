import React from 'react'
import gql from 'fraql'
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

SessionDates.fragments = {
  session: gql`
    fragment _ on Session {
      startDate
      endDate
    }
  `,
}

export default SessionDates
