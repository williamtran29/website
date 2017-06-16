import React from 'react'
import { transparentize } from 'polished'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import { gql, graphql } from 'react-apollo'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'
import { Link as ScrollLink, Element as ScrollElement } from 'react-scroll'
import { StickyContainer, Sticky } from 'react-sticky'
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

const Duration = styled.div`
  margin: 20px 0;
  font-weight: 300;
  font-size: 20px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`

const Container = styled.div`
  flex: 1;
  display: flex;
  align-self: center;
  max-width: 1000px;
  width: 100%;
`

const Content = styled.div`
  flex: 1;
  margin: 0 20px 20px;
`

const Sidebar = styled.aside`
  width: 300px;
  border-left: 1px solid ${theme.colors.grayLight};
`

const Price = styled.div`
  color: white;
  background-color: ${transparentize(0.1, theme.colors.grayDark)};
  font-size: 15px;
  line-height: 30px;
  padding: 10px;
  height: 50px;
`

const Amount = styled.span`
  font-weight: 600;
  font-size: 22px;
  margin-right: 10px;
`

const LinkButton = Button.extend`
  display: block;
  margin: 20px;
  font-size: 20px;
`.withComponent(Link)

const SectionTitle = styled.h2`

`

const SidebarStickyContainer = styled(StickyContainer)`
  height: 100%;
  margin-top: -50px;
`

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

const StickySidebar = styled.div``

export default graphql(
  gql`
  query Training($slug: String!) {
    training(slug: $slug) {
      id
      color
      cloudinary_id
      duration
      name
      abstract
      outline
      description
      slug
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
      <Picture background={training ? clUrl(training.cloudinary_id) : null} />
      <MainTitle>{training && `Formation ${training.name}`}</MainTitle>
      <Lead>{training && training.abstract}</Lead>
      <Duration>{training && `${training.duration} jours`}</Duration>
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
              <StickySidebar style={style}>
                <Price>
                  <Amount>1500€</Amount> HT / personne
                </Price>
                <LinkButton to="/contact">Demander un devis</LinkButton>
              </StickySidebar>}
          </Sticky>
        </SidebarStickyContainer>
      </Sidebar>
    </Container>
    <Footer />
  </PageContainer>,
)
