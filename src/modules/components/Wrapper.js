import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: ${props => props.flexDirection};
  max-width: 1440px;
  margin: 70px auto;
  @media (min-width: 700px) {
    margin: 100px auto;
    flex-direction: ${props => props.lgFlexDirection || props.flexDirection};
  }
`

Wrapper.defaultProps = {
  flexDirection: 'row',
}

export default Wrapper
