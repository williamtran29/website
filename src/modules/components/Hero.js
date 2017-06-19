import theme from 'style/theme'
import styled from 'styled-components'

const Hero = styled.div`
  background-color: ${props => props.background || theme.colors.primary};
  background-image: url(${props => props.background});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: white;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 70px 20px;
  text-align: center;
  transition: background-color 2s;
`

export default Hero
