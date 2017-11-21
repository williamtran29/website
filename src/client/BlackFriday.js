import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Route, Link } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'
import theme from 'style/theme'
import Countdown from './Countdown'

const LIMIT = new Date('2017-11-24T23:00:00.000Z')

export class BlackFridayProvider extends React.Component {
  static childContextTypes = {
    blackFriday: PropTypes.bool.isRequired,
  }

  getChildContext() {
    return { blackFriday: new Date() < LIMIT }
  }

  render() {
    return this.props.children
  }
}

export const connectBlackFriday = Component => {
  const BlackFriday = (props, context) => <Component {...props} {...context} />
  BlackFriday.contextTypes = {
    blackFriday: PropTypes.bool.isRequired,
  }
  return BlackFriday
}

const BannerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-weight: 900;
  text-transform: uppercase;
  line-height: 1.2;
  color: #fff;
  padding: 20px;
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.05);
  background-image: linear-gradient(160deg, #ab0f03 0%, #c36228 100%);
  border-bottom: 10px solid rgba(0, 0, 0, 0.03);

  a {
    border-bottom: 1px solid #fff;
    cursor: pointer;
  }

  @media (min-width: ${theme.medias.desktop}) {
    padding: 30px;
  }
`

const BigText = styled.div`
  font-size: 20px;
  margin-bottom: 10px;

  @media (min-width: ${theme.medias.desktop}) {
    font-size: 40px;
  }
`

const Lead = styled.p`
  margin: 0;
  font-size: 12px;

  @media (min-width: ${theme.medias.desktop}) {
    font-size: 16px;
  }
`

const CountdownContainer = styled.div`
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
  margin-left: 50px;
  display: none;

  > div {
    font-size: 20px;
  }

  table {
    margin: 10px 0;
  }

  td {
    text-align: center;
    padding: 0 10px;
  }

  tr:first-child {
    font-size: 40px;
  }

  tr:last-child {
    font-size: 14px;
  }

  @media (min-width: ${theme.medias.desktop}) {
    display: block;
  }
`

export const BlackFridayBanner = connectBlackFriday(
  ({ blackFriday }) =>
    blackFriday && (
      <BannerContainer>
        <div>
          <BigText>
            Promotions Black Friday<br />
            -50% sur nos formations !
          </BigText>
          <Lead>
            La journée à <del>400€</del> 200€ !<br />
            Valable sur{' '}
            <Route exact path="/">
              {({ match }) =>
                match ? (
                  <ScrollLink to="workshops" spy smooth>
                    toutes nos formations
                  </ScrollLink>
                ) : (
                  <Link to="/">toutes nos formations</Link>
                )
              }
            </Route>.
          </Lead>
        </div>
        <Countdown date={LIMIT}>
          {({ days, hours, minutes, seconds }) => (
            <CountdownContainer>
              <div>Inscrivez-vous avant la fin !</div>
              <table>
                <tr>
                  <td>{days}</td>
                  <td>{hours}</td>
                  <td>{minutes}</td>
                  <td>{seconds}</td>
                </tr>
                <tr>
                  <td>jours</td>
                  <td>heures</td>
                  <td>mins</td>
                  <td>secs</td>
                </tr>
              </table>
            </CountdownContainer>
          )}
        </Countdown>
      </BannerContainer>
    ),
)
