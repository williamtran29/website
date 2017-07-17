/* eslint-disable react/no-array-index-key */
import React from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import { gql, graphql } from 'react-apollo'
import ReactMarkdown from 'react-markdown'
import theme from 'style/theme'
import { clUrl } from 'modules/cloudinary'
import PageContainer from 'client/PageContainer'
import Separator from 'modules/components/Separator'
import Logo from 'client/Logo'

const Container = styled.div`
  flex: 1;
  align-self: center;
  max-width: 1000px;
  width: 700px;
  margin: 20px 0 0;
  position: relative;
  padding-bottom: 80px;

  @media (min-width: ${theme.medias.phablet}) {
    flex-direction: row;
  }
`

const Footer = styled.footer`
  position: absolute;
  bottom: 0;
  width: 700px;
  padding-top: 50px;
`
const FooterText = styled.div`font-size: 12px;`

const Header = styled.header`
  display: flex;
  margin-bottom: 40px;
`
const HeaderMain = styled.div`
  flex: 1;
  display: flex;
  margin-right: 20px;
`
const HeaderImg = styled.img`
  margin-right: 10px;
  flex-shrink: 0;
`
const Titles = styled.div``
const Title = styled.h1`
  font-size: 20px;
  font-weight: 400;
  flex: 1;
  margin: 0;
`
const Subtitle = styled.div`
  font-size: 17px;
  font-weight: 300;
`
const Brand = styled.div`width: 160px;`
const ColoredLogo = styled(Logo)`
  color: ${theme.colors.primary};
  width: 160px;
`
const Website = styled.div`
  font-size: 12px;
  font-weight: 300;
`
const Section = styled.div`
  font-size: 13px;
  line-height: 1.3;
  margin-bottom: 20px;

  h3 {
    font-size: 15px;
    margin: 0 0 10px 0;
    color: ${theme.colors.primary};
    font-weight: bold;
    line-height: 1.5;
    break-after: avoid;
    page-break-after: avoid;
  }

  h3 + p {
    margin: 0;
  }

  ul {
    margin: 0;
    padding-left: 20px;
  }

  h4 {
    margin: 8px 0 5px;
    padding: 0;
  }
`

const Planning = styled.div`
  display: flex;
  margin: 10px 0 20px;
`

const Day = styled.div`
  flex: 1;
  margin-right: 5px;
  font-size: 12px;

  &:last-child {
    margin-right: 0;
  }
`
const DayTitle = styled.div`
  border-left: 4px ${theme.colors.primary} solid;
  padding-left: 10px;
  font-size: 14px;
  font-weight: 600;
`
const Intro = styled.div`
  display: flex;

  ${Section} {
    flex: 1;
    margin-right: 20px;
  }
`

const Infos = styled.div`
  flex-shrink: 0;
  width: 160px;
`

const Info = styled.div`margin-bottom: 10px;`

const InfoLabel = styled.div`
  margin-bottom: 5px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 600;
`

const InfoContent = styled.div`font-size: 18px;`

const Outline = ({ outline }) =>
  <Planning>
    {outline.split(/### Jour \d+[\s-]*/).filter(day => day).map((day, i) =>
      <Day key={i}>
        <DayTitle>
          Jour {i + 1}
        </DayTitle>
        <ReactMarkdown source={day} />
      </Day>,
    )}
  </Planning>

const expandDescription = description => {
  const SPLIT_PATTERN = '### '
  const parts = description.split(SPLIT_PATTERN)
  return {
    description: `${SPLIT_PATTERN} Description \n ${parts[0]}`,
    objectives: `${SPLIT_PATTERN}${parts[1]}`,
    requirements: `${SPLIT_PATTERN}${parts[2]}`,
  }
}

const withTraining = graphql(
  gql`
    query trainingData($slug: ID!) {
      training(slug: $slug) {
        cloudinary_id
        name
        abstract
        duration
        slug
        color
        outline
        description
        price
      }
    }
  `,
  {
    options: ({ match }) => ({ variables: { slug: match.params.slug } }),
  },
)

export default withTraining(({ data: { training } }) => {
  if (!training) return null
  const { description, objectives, requirements } = expandDescription(
    training.description,
  )
  return (
    <PageContainer>
      <Helmet>
        <title>
          {`Formation ${training.name}`}
        </title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Container>
        <Header>
          <HeaderMain>
            <HeaderImg
              alt={`${training.name}`}
              width="50"
              height="50"
              src={clUrl(training.cloudinary_id, 'c_scale,w_50,h_50,dpr_2')}
            />
            <Titles>
              <Title>
                {`Formation ${training.name}`}
              </Title>
              <Subtitle>
                {training.abstract}
              </Subtitle>
            </Titles>
          </HeaderMain>
          <Brand>
            <ColoredLogo />
            <Website>www.smooth-code.com</Website>
          </Brand>
        </Header>
        <Intro>
          <Section>
            <ReactMarkdown source={objectives} />
          </Section>
          <Infos>
            <Info>
              <InfoLabel>Durée :</InfoLabel>
              <InfoContent>
                {`${training.duration} ${training.duration > 1
                  ? 'jours'
                  : 'jour'}`}
              </InfoContent>
            </Info>
            <Info>
              <InfoLabel>Prix :</InfoLabel>
              <InfoContent>
                {`${training.price} € HT / pers.`}
              </InfoContent>
            </Info>
          </Infos>
        </Intro>
        <Section>
          <ReactMarkdown source={requirements} />
        </Section>
        <Section>
          <h3>Programme</h3>
          <Outline outline={training.outline} />
        </Section>
        <Section>
          <ReactMarkdown source={description} />
        </Section>
        <Footer>
          <Separator style={{ width: 250, margin: '10px auto' }} />
          <FooterText>
            <strong>Une question ?</strong> Vous avez besoin d’un renseignement
            ou d’une formation personnalisée ? Nous nous ferons un plaisir de
            répondre à vos questions. <strong>Tél. :</strong> 06 50 58 80 79 -{' '}
            <strong>Email :</strong> contact@smooth-code.com
          </FooterText>
        </Footer>
      </Container>
    </PageContainer>
  )
})
