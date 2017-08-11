import React from 'react'
import styled from 'styled-components'
import compose from 'recompact/compose'
import { Helmet } from 'react-helmet'
import { gql, graphql } from 'react-apollo'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'
import { Link as ScrollLink, Element as ScrollElement } from 'react-scroll'
import { StickyContainer, Sticky } from 'react-sticky'
import FaPhone from 'react-icons/lib/fa/phone'
import FaEnvelope from 'react-icons/lib/fa/envelope'
import theme from 'style/theme'
import moment from 'modules/moment'
import { clUrl } from 'modules/cloudinary'
import { longHumanizeDate } from 'modules/dateUtils'
import PageContainer from 'client/PageContainer'
import Header from 'client/Header'
import Footer from 'client/Footer'
import Button from 'modules/components/Button'
import TrainingHero from 'modules/components/TrainingHero'

const Container = styled.div`
  flex: 1;
  display: flex;
  align-self: center;
  max-width: 1000px;
  width: 100%;
  flex-direction: column;

  @media (min-width: ${theme.medias.phablet}) {
    flex-direction: row;
  }
`

const Content = styled.div`
  flex: 1;
  margin: 0 20px 20px;
  font-size: 17px;
  font-weight: 300;
  letter-spacing: 0.2px;
  line-height: 22px;

  hr {
    border: 0;
    border-top: 1px solid ${theme.colors.grayLight};
  }

  strong {
    font-weight: 400;
  }

  h3 {
    font-weight: 400;
    font-size: 24px;
    line-height: 30px;
    margin: 30px 0;
  }

  h4 {
    font-weight: 600;
    font-size: 18px;
    line-height: 24px
    margin: 20px 0;
  }

  ul {
    margin: 20px 0 30px;
  }
`

const Sidebar = styled.aside`
  color: ${theme.colors.grayDark};

  @media (min-width: ${theme.medias.phablet}) {
    width: 350px;
    border-left: 1px solid ${theme.colors.grayLight};
  }
`

const SidebarStickyContainer = styled(StickyContainer)`
  @media (min-width: ${theme.medias.phablet}) {
    height: 100%;
    overflow: hidden;
  }

  @media (max-width: ${theme.medias.phablet}) {
    div:first-child > div:first-child {
      padding-bottom: 0 !important;
    }
  }
`

const SidebarSticky = styled.div`
  @media (max-width: ${theme.medias.phablet}) {
    position: relative !important;
    top: 0 !important;
    left: 0 !important;
  }
`

const SidebarSection = styled.div`
  padding: 20px;
  border-bottom: 1px solid ${theme.colors.grayLight};

  &:first-child {
    border-top: 1px solid ${theme.colors.grayLight};
  }

  &:last-child {
    border-bottom: 0;
  }

  @media (min-width: ${theme.medias.phablet}) {
    padding: 40px 30px;

    &:first-child {
      border-top: 0;
    }
  }
`

const SidebarTitle = styled.h3`
  margin: 0;
  font-weight: 300;
  font-size: 30px;
`

const SidebarText = styled.p`font-size: 16px;`

const ContactItem = styled.div`
  font-size: 24px;
  margin: 20px 0;

  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    display: flex;
    align-items: center;

    svg {
      margin-right: 10px;
    }
  }
`

const Sibling = styled(Link)`
  margin: 20px 0;
  padding: 10px;
  border: 1px solid ${theme.colors.grayLight};
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 3px;
  will-change: transform;
  transition: transform 300ms;
  text-decoration: none;
  color: ${theme.colors.grayDark};
  text-align: center;

  &:hover {
    transform: scale(1.05);
    text-decoration: none;
  }
`
const SiblingImage = styled.img`flex-shrink: 0;`
const SiblingName = styled.h3`
  margin: 0;
  font-size: 24px;
  font-weight: 400;
`
const SiblingAbstract = styled.div`
  font-size: 16px;
  font-weight: 300;
`
const SiblingInfo = styled.div`padding: 10px;`

const InfoLabel = styled.div`
  margin-bottom: 10px;
  font-size: 15px;
  text-transform: uppercase;
  font-weight: bold;
`

const Amount = styled.div`
  margin-bottom: 20px;
  font-size: 35px;
`

const AmountSmall = styled.span`font-size: 15px;`

const LinkButton = Button.extend`
  display: block;
  font-size: 20px;
`.withComponent(Link)

const SectionTitle = styled.h2`
  margin: 60px 0 20px;
  font-size: 32px;
  line-height: 40px;
  font-weight: 400;
  padding-bottom: 10px;
  border-bottom: 1px solid ${theme.colors.grayLight};
`

const Nav = styled.nav`
  background-color: white;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid ${theme.colors.grayLight};
`

const StyledScrollLink = styled(ScrollLink)`
  font-size: 14px;
  color: ${theme.colors.primary};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  &.active {
    font-weight: 600;
    cursor: default;
    color: ${theme.colors.grayDark};

    &:hover {
      text-decoration: none;
    }
  }
`

const Trainer = styled.div`margin-bottom: 40px;`
const TrainerName = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin: 30px 0 20px;
`
const TrainerDescription = styled.div`
  font-size: 14px;
  line-height: 1.5;

  p {
    margin: 0;
  }
`
const TrainerPicture = styled.img`
  display: block;
  margin: 0 auto;

  @media (min-width: ${theme.medias.phablet}) {
    float: left;
    margin-right: 15px;
  }
`

const Sessions = styled.div`
  margin-top: 20px;
  display: flex;
`

const TrainingSession = styled.div`
  margin-right: 10px;

  &:last-child {
    margin-right: 0;
  }
`

const SessionLink = styled(Link)`
  display: block;
  flex-shrink: 0;
  border: 1px solid ${theme.colors.grayLight};
  border-radius: 5px;
  text-align: center;
  width: 90px;
  text-decoration: none;
  color: ${theme.colors.grayDark};
  will-change: transform;
  transition: transform 300ms;

  &:hover {
    transform: scale(1.05);
    text-decoration: none;
  }
`
const SessionMonth = styled.div`
  background-color: #e16565;
  text-transform: uppercase;
  color: white;
  font-size: 13px;
  padding: 5px;
  border-radius: 4px 4px 0 0;
  letter-spacing: 0.05em;
`

const SessionDate = styled.div`
  font-size: 35px;
  height: 70px;
  line-height: 70px;
`

const SessionCity = styled.div`
  font-size: 14px;
  text-transform: uppercase;
  padding: 5px;
`

const fullUrl = url => `https://www.smooth-code.com${url}`

const Session = ({ training, trainingDetail, session }) => {
  const startDate = moment.utc(session.start_date)
  const longHumanizedDate = longHumanizeDate({
    startDate: session.start_date,
    endDate: session.end_date,
  })
  const title = `Session formation "${training.name}" du ${longHumanizedDate}`
  const description = `Inscrivez-vous pour la formation "${training.name}" du ${longHumanizedDate}. Les places sont limités !`

  return (
    <TrainingSession itemScope itemType="http://schema.org/Event">
      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={description} />
      <meta itemProp="startDate" content={session.start_date} />
      <meta itemProp="endDate" content={session.end_date} />
      <meta itemProp="image" content={trainingDetail.ogImageUrl} />
      {trainingDetail.trainers.map(trainer =>
        <span
          key={trainer.slug}
          itemScope
          itemProp="performer"
          itemType="http://schema.org/Person"
        >
          <meta itemProp="name" content={trainer.fullName} />
          <meta itemProp="url" content={fullUrl(trainer.link)} />
        </span>,
      )}
      <span itemProp="offers" itemScope itemType="http://schema.org/Offer">
        <meta itemProp="price" content={trainingDetail.price} />
        <meta itemProp="priceCurrency" content="EUR" />
        <link itemProp="availability" href="http://schema.org/InStock" />
      </span>
      <SessionLink to={session.link} itemProp="url" title={title}>
        <SessionMonth>
          {startDate.format('MMMM')}
        </SessionMonth>
        <SessionDate>
          {startDate.format('DD')}
        </SessionDate>
        <SessionCity
          itemProp="location"
          itemScope
          itemType="http://schema.org/Place"
        >
          <meta itemProp="name" content={session.location.city} />
          <meta
            itemProp="description"
            content={`Dans les locaux de ${session.location.name} à ${session
              .location.city}`}
          />
          <span
            itemProp="address"
            itemScope
            itemType="http://schema.org/PostalAddress"
          >
            <meta itemProp="streetAddress" content={session.location.address} />
            <meta itemProp="postalCode" content={session.location.zipcode} />
            <meta
              itemProp="addressLocality"
              content={`${session.location.city}, ${session.location.country}`}
            />
            {session.location.city}
          </span>
        </SessionCity>
      </SessionLink>
    </TrainingSession>
  )
}

const TRAINING_QUERY = gql`
  query trainingData($slug: ID!) {
    training(slug: $slug) {
      cloudinary_id
      name
      abstract
      duration
      slug
      color
      price
    }
  }
`

const TRAINING_DETAIL_QUERY = gql`
  query trainingDetailData($slug: ID!) {
    training(slug: $slug) {
      slug
      outline
      description
      price
      ogImageUrl
      siblings {
        cloudinary_id
        slug
        name
        abstract
      }
      sessions {
        id
        start_date
        end_date
        link
        location {
          name
          address
          city
          zipcode
          country
        }
      }
      trainers {
        slug
        fullName
        description
        link
        cloudinary_id
      }
    }
  }
`

const options = ({ match }) => ({ variables: { slug: match.params.slug } })

const withTraining = graphql(TRAINING_QUERY, {
  name: 'trainingData',
  options,
})

const withTrainingDetail = graphql(TRAINING_DETAIL_QUERY, {
  name: 'trainingDetailData',
  options,
})

export default compose(
  withTraining,
  withTrainingDetail,
)(
  ({
    trainingData: { training },
    trainingDetailData: { training: trainingDetail },
  }) =>
    <PageContainer itemScope itemType="http://schema.org/Course">
      <Helmet>
        <title>
          {training && `Formation ${training.name}`}
        </title>
        <meta name="description" content={training && training.abstract} />
        <meta
          property="og:title"
          content={training && `Smooth Code - Formation ${training.name}`}
        />
        <meta
          property="og:description"
          content={training && training.abstract}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content={trainingDetail && trainingDetail.ogImageUrl}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image"
          content={trainingDetail && trainingDetail.ogImageUrl}
        />
      </Helmet>
      <Header transparent />
      <meta itemProp="accessMode" content="auditory" />
      <meta itemProp="learningResourceType" content="presentation" />
      <TrainingHero training={training} />
      <Container>
        <Content>
          <StickyContainer>
            <Sticky>
              {({ style }) =>
                <Nav style={style}>
                  <span>
                    <StyledScrollLink
                      activeClass="active"
                      spy
                      smooth
                      offset={-60}
                      to="description"
                    >
                      Description
                    </StyledScrollLink>
                  </span>
                  <span aria-hidden="true"> · </span>
                  <span>
                    <StyledScrollLink
                      activeClass="active"
                      spy
                      smooth
                      offset={-60}
                      to="outline"
                    >
                      Programme
                    </StyledScrollLink>
                  </span>
                  <span aria-hidden="true"> · </span>
                  <span>
                    <StyledScrollLink
                      activeClass="active"
                      spy
                      smooth
                      offset={-60}
                      to="trainers"
                    >
                      Formateurs
                    </StyledScrollLink>
                  </span>
                </Nav>}
            </Sticky>
            <ScrollElement name="description">
              {trainingDetail &&
                <ReactMarkdown source={trainingDetail.description} />}
            </ScrollElement>
            <ScrollElement name="outline">
              <SectionTitle>Programme</SectionTitle>
              {trainingDetail &&
                <ReactMarkdown source={trainingDetail.outline} />}
            </ScrollElement>
            {trainingDetail &&
              trainingDetail.trainers.length > 0 &&
              <ScrollElement name="trainers">
                <SectionTitle>Formateurs</SectionTitle>
                {trainingDetail.trainers.map(trainer =>
                  <Trainer
                    key={trainer.slug}
                    itemScope
                    itemType="http://schema.org/Person"
                  >
                    <TrainerName>
                      {trainer.fullName}
                    </TrainerName>
                    <Link to={trainer.link}>
                      <TrainerPicture
                        alt={trainer.fullName}
                        src={clUrl(
                          trainer.cloudinary_id,
                          'c_fill,g_face,h_180,w_180,dpr_2',
                        )}
                        height="180"
                        width="180"
                      />
                    </Link>
                    <TrainerDescription>
                      <ReactMarkdown source={trainer.description} />
                    </TrainerDescription>
                  </Trainer>,
                )}
              </ScrollElement>}
          </StickyContainer>
        </Content>
        <Sidebar>
          <SidebarStickyContainer>
            <Sticky>
              {({ style }) =>
                <SidebarSticky style={style}>
                  <SidebarSection>
                    <InfoLabel>Prix :</InfoLabel>
                    <Amount
                      itemProp="offers"
                      itemScope
                      itemType="http://schema.org/Offer"
                    >
                      <span
                        content={trainingDetail && trainingDetail.price}
                        itemProp="price"
                      >
                        {trainingDetail ? trainingDetail.price : '-'}
                      </span>
                      <span content="EUR" itemProp="priceCurrency">
                        €
                      </span>{' '}
                      <AmountSmall>HT / personne</AmountSmall>
                    </Amount>
                    <InfoLabel>Durée :</InfoLabel>
                    <Amount>
                      {training &&
                        `${training.duration} ${training.duration > 1
                          ? 'jours'
                          : 'jour'}`}
                    </Amount>
                    <LinkButton to="/contact">Demander un devis</LinkButton>
                  </SidebarSection>
                  {trainingDetail &&
                    training &&
                    trainingDetail.sessions.length > 0 &&
                    <SidebarSection>
                      <SidebarTitle>Sessions</SidebarTitle>
                      <Sessions>
                        {trainingDetail.sessions.map(session =>
                          <Session
                            key={session.id}
                            session={session}
                            training={training}
                            trainingDetail={trainingDetail}
                          />,
                        )}
                      </Sessions>
                    </SidebarSection>}
                  <SidebarSection>
                    <SidebarTitle>Une question ?</SidebarTitle>
                    <SidebarText>
                      Vous avez besoin d’un renseignement ou d’une formation
                      personnalisée ?<br />
                      Nous nous ferons un plaisir de répondre à vos questions.
                    </SidebarText>
                    <ContactItem>
                      <a href="tel:+33650588079">
                        <FaPhone /> <span>06 50 58 80 79</span>
                      </a>
                    </ContactItem>
                    <ContactItem>
                      <a href="mailto:contact@smooth-code.com?subject=Demande%20d%27information">
                        <FaEnvelope /> <span>Email</span>
                      </a>
                    </ContactItem>
                  </SidebarSection>
                  <SidebarSection>
                    <SidebarTitle>Autres formations</SidebarTitle>
                    {trainingDetail &&
                      trainingDetail.siblings.map(sibling =>
                        <Sibling
                          key={sibling.slug}
                          to={`/trainings/${sibling.slug}`}
                        >
                          <SiblingImage
                            alt={sibling.name}
                            width="140"
                            height="140"
                            src={clUrl(
                              sibling.cloudinary_id,
                              'c_scale,w_140,h_140,dpr_2',
                            )}
                          />
                          <SiblingInfo>
                            <SiblingName>
                              {sibling.name}
                            </SiblingName>
                            <SiblingAbstract>
                              {sibling.abstract}
                            </SiblingAbstract>
                          </SiblingInfo>
                        </Sibling>,
                      )}
                  </SidebarSection>
                </SidebarSticky>}
            </Sticky>
          </SidebarStickyContainer>
        </Sidebar>
      </Container>
      <Footer />
    </PageContainer>,
)
