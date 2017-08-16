import React from 'react'
import styled from 'styled-components'
import moment from 'modules/moment'
import { firstLetterUppercase } from 'modules/stringUtils'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 80px;
  height: 100px;
  border-radius: 3px;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.10);
`

const Month = styled.div`
  background-color: #ef5656;
  color: #fff;
  font-size: 13px;
  line-height: 16px;
  padding: 4px 0;
  border-radius: 4px 4px 0 0;
  letter-spacing: 0.25px;
`

const Day = styled.div`
  font-size: 26px;
  line-height: 30px;
  margin: 12px 0 8px;
`

const Place = styled.div`
  font-size: 14px;
  line-height: 20px;
`

const SessionCard = ({ startDate, location }) => {
  const mStartDate = moment.utc(startDate)
  return (
    <Container>
      <Month>
        {firstLetterUppercase(mStartDate.format('MMMM'))}
      </Month>
      <Day>
        {mStartDate.format('DD')}
      </Day>
      <Place>
        {location.city}
      </Place>
    </Container>
  )
}

export default SessionCard
