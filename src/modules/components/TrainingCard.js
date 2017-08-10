import React from 'react'
import styled from 'styled-components'
import { darken, lighten, saturate } from 'polished'

const Container = styled.div`
  position: relative;
  margin-top: 40px;
  width: 220px;
  height: 250px;
  background: #ffffff;
  border: 1px solid #ededed;
  box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.08), 0 10px 40px 0 rgba(0, 0, 0, 0.06);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  padding: 40px 10px 10px;
`

const Head = styled.div`
  position: absolute;
  top: -40px;
  left: calc(50% - 40px);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-image: linear-gradient(
    to bottom left,
    ${props => saturate(0.3, lighten(0.1, props.color))} -20%,
    ${props => saturate(0.5, darken(0.2, props.color))} 120%
  );
  border: 4px solid #fff;
  box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.08), 0 10px 40px 0 rgba(0, 0, 0, 0.06);
`

const Content = styled.div`flex: 1;`

const Path = styled.div`
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.8px;
  font-size: 12px;
  line-height: 18px;
  color: ${props => saturate(0.4, darken(0.1, props.color))};
  margin-top: 20px;
`

const Title = styled.h4`
  font-size: 24px;
  letter-spacing: 0.2px;
  line-height: 30px;
  font-weight: 400;
  margin: 5px 0 0;
`

const Abstract = styled.p`
  margin: 10px 0;
  font-size: 14px;
  color: rgba(51, 51, 51, 0.80);
  line-height: 20px;
`

const Footer = styled.div`
  line-height: 20px;
  font-size: 14px;
`

const Duration = styled.div`font-weight: 600;`
const Price = styled.div``

const pluralize = (word, count) => (count > 1 ? `${word}s` : word)

const TrainingCard = ({
  title,
  abstract,
  icon,
  link,
  duration,
  intraPrice,
  path,
}) =>
  <Container>
    <Head color={path.color} />
    <Content>
      <Path color={path.color}>
        {path.title}
      </Path>
      <Title>
        {title}
      </Title>
      <Abstract>
        {abstract}
      </Abstract>
    </Content>
    <Footer>
      <Duration>
        {`${duration} ${pluralize('jour', duration)}`}
      </Duration>
      <Price>
        À partir de {intraPrice} € HT
      </Price>
    </Footer>
  </Container>

export default TrainingCard
