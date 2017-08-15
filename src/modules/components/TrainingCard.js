import React from 'react'
import styled from 'styled-components'
import { darken, lighten } from 'polished'
import { clUrl } from 'modules/cloudinary'
import { pluralize } from 'modules/i18n'

const Container = styled.div`
  position: relative;
  margin-top: 40px;
  height: 250px;
  background: #fff;
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
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-image: linear-gradient(
    to bottom left,
    ${props => lighten(0.2, props.color)} -20%,
    ${props => darken(0.2, props.color)} 120%
  );
  border: 4px solid #fff;
  box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.08), 0 10px 40px 0 rgba(0, 0, 0, 0.06);
`

const HeadIcon = styled.img`
  margin-top: -4px;
  margin-left: -4px;
`

const Content = styled.div`flex: 1;`

const Path = styled.div`
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.8px;
  font-size: 12px;
  line-height: 18px;
  color: ${props => darken(0.1, props.color)};
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

const TrainingCard = ({ title, abstract, icon, duration, interPrice, path }) =>
  <Container>
    <Head color={path.color}>
      <HeadIcon src={clUrl(icon, null, 'svg')} alt={title} />
    </Head>
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
      <div>
        À partir de {interPrice} € HT
      </div>
    </Footer>
  </Container>

export default TrainingCard
