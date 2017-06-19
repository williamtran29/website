import React from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import { gql, graphql } from 'react-apollo'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'
import { Link as ScrollLink, Element as ScrollElement } from 'react-scroll'
import { StickyContainer, Sticky } from 'react-sticky'
import FaPhone from 'react-icons/lib/fa/phone'
import FaEnvelope from 'react-icons/lib/fa/envelope'
import theme from 'style/theme'
import { clUrl } from 'modules/cloudinary'
import PageContainer from 'client/PageContainer'
import Header from 'client/Header'
import Footer from 'client/Footer'
import Hero from 'modules/components/Hero'
import MainTitle from 'modules/components/MainTitle'
import Lead from 'modules/components/Lead'
import Button from 'modules/components/Button'

const Picture = styled.div`
  flex-shrink: 0;
  height: 150px;
  width: 150px;
  ${props =>
    props.background ? `background-image: url(${props.background});` : ''}
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`

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
      border-top: 0
    }
  }
`

const SidebarTitle = styled.h3`
  margin: 0;
  font-weight: 300;
  font-size: 30px;
`

const SidebarText = styled.p`
  font-size: 16px;
`

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
  border: 1px solid ${theme.colors.grayLight};
  display: flex;
  border-radius: 3px;
  will-change: transform;
  transition: transform 300ms;
  text-decoration: none;
  color: ${theme.colors.grayDark};

  &:hover {
    transform: scale(1.05);
  }
`
const SiblingImage = styled.img`
  flex-shrink: 0;
`
const SiblingName = styled.h3`
  margin: 0;
  font-size: 24px;
  font-weight: 400;
`
const SiblingAbstract = styled.div`
  font-size: 16px;
  font-weight: 300;
`
const SiblingInfo = styled.div`
  padding: 10px;
`

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

const AmountSmall = styled.span`
  font-size: 15px;
`

const LinkButton = Button.extend`
  display: block;
  font-size: 20px;
`.withComponent(Link)

const SectionTitle = styled.h2``

const Nav = styled.nav`
  background-color: white;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid ${theme.colors.grayLight};
`

const StyledScrollLink = styled(ScrollLink)`
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

export default graphql(
  gql`
  query Training($slug: ID!) {
    training(slug: $slug) {
      color
      cloudinary_id
      duration
      name
      abstract
      outline
      description
      slug
      siblings {
        cloudinary_id
        slug
        name
        abstract
      }
    }
  }
`,
  {
    options: ({ match }) => ({
      variables: {
        slug: match.params.slug,
      },
    }),
  },
)(({ data: { training } }) =>
  <PageContainer>
    <Helmet>
      <title>Nos formations JavaScript</title>
    </Helmet>
    <Header />
    <Hero background={training && training.color}>
      <Picture
        background={
          training
            ? clUrl(training.cloudinary_id, 'c_scale,w_150,h_150,dpr_2')
            : null
        }
      />
      <MainTitle>{training && `Formation ${training.name}`}</MainTitle>
      <Lead>{training && training.abstract}</Lead>
    </Hero>
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
              </Nav>}
          </Sticky>
          <ScrollElement name="description">
            {training && <ReactMarkdown source={training.description} />}
          </ScrollElement>
          <ScrollElement name="outline">
            <SectionTitle>Programme</SectionTitle>
            {training && <ReactMarkdown source={training.outline} />}
          </ScrollElement>
        </StickyContainer>
      </Content>
      <Sidebar>
        <SidebarStickyContainer>
          <Sticky>
            {({ style }) =>
              <SidebarSticky style={style}>
                <SidebarSection>
                  <InfoLabel>Prix :</InfoLabel>
                  <Amount>
                    1500€ <AmountSmall>HT / personne</AmountSmall>
                  </Amount>
                  <InfoLabel>Durée :</InfoLabel>
                  <Amount>{training && `${training.duration} jours`}</Amount>
                  <LinkButton to="/contact">Demander un devis</LinkButton>
                </SidebarSection>
                <SidebarSection>
                  <SidebarTitle>Une question ?</SidebarTitle>
                  <SidebarText>
                    Vous avez besoin d&apos;un renseignement ou d&apos;une
                    formation
                    personnalisée ?<br />
                    Nous nous ferons un plaisir de répondre à
                    vos questions.
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
                  <SidebarTitle>
                    Autres formations
                  </SidebarTitle>
                  {training &&
                    training.siblings.map(sibling =>
                      <Sibling to={`/trainings/${sibling.slug}`}>
                        <SiblingImage
                          width="90"
                          height="90"
                          src={clUrl(
                            sibling.cloudinary_id,
                            'c_scale,w_90,h_90,dpr_2',
                          )}
                        />
                        <SiblingInfo>
                          <SiblingName>{sibling.name}</SiblingName>
                          <SiblingAbstract>{sibling.abstract}</SiblingAbstract>
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
