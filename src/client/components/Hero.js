import theme from 'client/style/legacyTheme'
import styled from 'styled-components'

const Hero = styled.div`
  background: ${props => props.background || theme.colors.primary};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  color: white;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 70px 20px;
  text-align: center;
`

export default Hero
