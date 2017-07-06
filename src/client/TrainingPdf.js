/* eslint-disable react/no-array-index-key */
import React from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import { gql, graphql } from 'react-apollo'
import ReactMarkdown from 'react-markdown'
import theme from 'style/theme'
import { clUrl } from 'modules/cloudinary'
import PageContainer from 'client/PageContainer'
import MainTitle from 'modules/components/MainTitle'
import Paragraph from 'modules/components/Paragraph'
import Logo from 'client/Logo'

const Container = styled.div`
  flex: 1;
  display: flex;
  align-self: center;
  max-width: 1000px;
  width: 700px;
  flex-direction: column;

  @media (min-width: ${theme.medias.phablet}) {
    flex-direction: row;
  }
`

const Content = styled.div`
  flex: 1;
  margin: 20px 0 0;
  font-size: 17px;
  font-weight: 300;
  letter-spacing: 0.2px;
  line-height: 22px;
  padding-bottom: 40px;

  strong {
    font-weight: 400;
  }

  h3 {
    font-size: 22px;
    font-weight: 400;
    letter-spacing: -0.2px;
    line-height: 28px;
  }
}
`

const FloatRigthContainer = styled.div`float: right;`

const ColoredLogo = styled(Logo)`
  color: ${theme.colors.primary};
  width: 160px;
`

const ParagraphPrint = styled(Paragraph)`
  font-size: 12px;
  margin: 0;
`

const MainTitleSmall = styled(MainTitle)`
  font-size: 20px;
`

const AbstractContent = styled.div`
  height: 50px;

  ${FloatRigthContainer} {
    padding-left: 10px;
    border-left: 1px solid black;
  }
`

const Picture = styled.img`
  width: 50px;
  float: left;
`

const AbstractParagraph = styled(ParagraphPrint)`
  height: 50px;
  width: 380px;
  padding-left: 60px;
  margin-top: 40px;
`

const Section = styled.div`
  h3 {
    font-size: 14px;
    margin: 15px 0 0 0;
    padding: 0;
    color: ${theme.colors.primary};
    font-weight: bold;
    line-height: 1.5;
  }

  p {
    padding: 0;
    font-size: 12px;
    line-height: 1.5;
  }

  h3 + p {
    margin: 0;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    font-size: 12px;
    line-height: 1.5;
  }
`

const splitDescription = ({ fullDescription }) => {
  const splitPattern = '### '
  const descriptionParts = fullDescription.split(splitPattern)
  return {
    description: `${splitPattern} Description \n ${descriptionParts[0]}`,
    objectives: splitPattern + descriptionParts[1],
    requirements: splitPattern + descriptionParts[2],
  }
}

const DescriptionPart = ({ fullDescription, partName }) =>
  <Section>
    <ReactMarkdown source={splitDescription({ fullDescription })[partName]} />
  </Section>

const SectionTitle = styled.h2`
  margin: 20px 0 0 0;
  font-size: 14px;
  font-weight: bold;
  color: ${theme.colors.primary};
`

const Planning = styled.div`
  flex: 1;
  display: flex;
  margin: 5px 0 10px;
`

const ProgrammeDay = styled.div`
  margin-right: 5px;
  flex: 1;
  font-size: 11px;

  h4 {
    margin: 5px 0 0 0;
    padding: 0;
  }

  ul {
    margin-top: 0;
    margin-bottom: 0;
    padding-left: 15px;
  }

  li {
    margin: 0;
    line-height: 1.2;
  }
`
const ProgrammeDayTitle = styled(SectionTitle)`
  margin: 0 0 5px 0;
  padding: 0;
  font-weight: bold;
  border-left: 4px ${theme.colors.primary} solid;
  padding-left: 10px;
  font-size: 12px;
  color: black;
  line-height: 1;
`

const ProgrammeArray = ({ programmeContent }) => {
  const daySplitting = programmeContent.split(/### Jour \d+/)
  daySplitting.shift()
  const res = daySplitting.map((day, i) =>
    <Planning key={i}>
      <ProgrammeDay>
        <ProgrammeDayTitle>
          Jour {i + 1}
        </ProgrammeDayTitle>
        <ReactMarkdown source={day} />
      </ProgrammeDay>
    </Planning>,
  )

  return (
    <Planning>
      {res}
    </Planning>
  )
}

const Footer = styled.div`
  position: absolute;
  bottom: 0;
  width: 700px;
  padding-top: 20;

  hr {
    width: 250px;
  }
`

const TRAINING_QUERY = gql`
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
`

const options = ({ match }) => ({ variables: { slug: match.params.slug } })

const withTraining = graphql(TRAINING_QUERY, {
  name: 'trainingData',
  options,
})

export default withTraining(
  ({ trainingData: { training } }) =>
    training
      ? <PageContainer>
          <Helmet>
            <title>
              {`Formation ${training.name}`}
            </title>
            <meta name="robots" content="noindex" />
          </Helmet>
          <Container>
            <Content>
              <FloatRigthContainer>
                <ColoredLogo />
                <ParagraphPrint>www.smooth-code.com</ParagraphPrint>
              </FloatRigthContainer>
              <MainTitleSmall itemProp="name">
                {`Formation ${training.name}`}
              </MainTitleSmall>
              <AbstractContent>
                <FloatRigthContainer>
                  <ParagraphPrint>
                    <strong style={{ textTransform: 'uppercase' }}>
                      Durée:{' '}
                    </strong>
                    {`${training.duration} ${training.duration > 1
                      ? 'jours'
                      : 'jours'}`}
                    <br />
                    <strong>PRIX: </strong>
                    {`${training.price}`}
                  </ParagraphPrint>
                </FloatRigthContainer>
                <Picture
                  alt={`${training.name} icon`}
                  src={clUrl(training.cloudinary_id, 'c_scale,w_50,h_50,dpr_2')}
                />
                <AbstractParagraph>
                  {training.abstract}
                </AbstractParagraph>
              </AbstractContent>

              <DescriptionPart
                fullDescription={training.description}
                partName="objectives"
              />
              <DescriptionPart
                fullDescription={training.description}
                partName="requirements"
              />
              <SectionTitle>Programme</SectionTitle>
              <ProgrammeArray programmeContent={training.outline} />
              <DescriptionPart
                fullDescription={training.description}
                partName="description"
              />
              <Footer>
                <hr />
                <ParagraphPrint>
                  <strong>Une question ?</strong> Vous avez besoin d’un
                  renseignement ou d’une formation personnalisée ? Nous nous
                  ferons un plaisir de répondre à vos questions.{' '}
                  <strong>Tel.</strong> 06 50 58 80 79 - <strong>Mail :</strong>
                  contact@smooth-code.com
                </ParagraphPrint>
              </Footer>
            </Content>
          </Container>
        </PageContainer>
      : null,
)
