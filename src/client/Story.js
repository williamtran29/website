import React from 'react'
import { lighten, darken } from 'polished'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'
import theme from 'style/theme'
import MainTitle from 'modules/components/MainTitle'
import SecondaryTitle from 'modules/components/SecondaryTitle'
import ThirdTitle from 'modules/components/ThirdTitle'
import Paragraph from 'modules/components/Paragraph'
import List from 'modules/components/List'
import Separator from 'modules/components/Separator'
import PageContainer from 'client/PageContainer'
import Header from 'client/Header'
import Footer from 'client/Footer'
import Code from 'client/story/Code'
import Rocket from 'client/story/Rocket'
import Target from 'client/story/Target'

const Content = styled.div`
  flex: 1;
`

const Wrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
`

const Founder = styled.div`
  flex: 1;
  display: flex;
  margin: 60px 0;
  flex-direction: column;

  @media (min-width: ${theme.medias.phablet}) {
    flex-direction: row;

    &:last-child {
      flex-direction: ${props => (props.inverse ? 'row-reverse' : 'row')};
    }
  }
`

const FounderPicture = styled.img`
  flex-shrink: 0;
  width: 100%;
  height: auto;

  @media (min-width: ${theme.medias.phablet}) {
    width: 300px;
    height: 400px;
  }
`

const FounderInfo = styled.div`
  flex: 1;
  margin: 20px 0 0;

  @media (min-width: ${theme.medias.phablet}) {
    margin: 0 30px;
  }
`

const SectionTitle = MainTitle.extend`
  text-align: center;
  margin: 40px 0 20px;
`.withComponent('h2')

const Vision = styled.div`
  margin: 60px 0;
  padding: 20px 0;
  background-image: linear-gradient(0, ${theme.colors.primary}, ${darken(
  0.2,
  theme.colors.primary,
)});
  color: white;

  ${Paragraph}, ${List} {
    color: ${lighten(0.4, theme.colors.primary)};
    mix-blend-mode: luminosity;
    text-shadow: 0 1px 2px rgba(0,0,0,.2);
  }

  @media (min-width: ${theme.medias.phablet}) {
    margin: 100px 0;
  }
`

const SmoothTouches = styled.div`
  display: flex;
  margin: 40px -20px 60px;
  flex-direction: column;

  @media (min-width: ${theme.medias.phablet}) {
    flex-direction: row;
  }
`

const SmoothTouch = styled.div`
  flex: 1 0 0;
  margin: 0 20px;
  display: flex;
  flex-direction: column;
  font-size: 14px;

  svg {
    align-self: center;
    width: 60%;
    margin: 20px 0;
  }

  ${List} {
    margin: 0;
    padding-left: 20px;
  }
`

const Introduction = styled.section`
  text-align: center;
  margin: 40px 0 20px;

  ${Paragraph} {
    font-size: 20px;
  }
`

export default () =>
  <PageContainer>
    <Helmet>
      <title>Notre histoire</title>
    </Helmet>
    <Header />
    <Content>
      <Wrapper>
        <Introduction>
          <MainTitle>Notre histoire</MainTitle>
          <Paragraph>
            Smooth Code a été fondée en 2017 a Paris.<br />
            Nous proposons des formations professionnelles destinées aux
            développeurs afin de leur permettre d’intégrer de manière efficace
            les librairies JavaScript modernes dans leurs projets.
          </Paragraph>
        </Introduction>
      </Wrapper>
      <Wrapper>
        <Founder>
          <FounderPicture
            src="//res.cloudinary.com/smooth/image/upload/c_scale,h_400,w_300,dpr_2/v1497877192/profile_greg_ihxwjo.jpg"
            alt="Greg Bergé"
            width="300"
            height="400"
          />
          <FounderInfo>
            <SecondaryTitle>Greg Bergé</SecondaryTitle>
            <ThirdTitle>Co-fondateur et Président de Smooth Code</ThirdTitle>
            <Paragraph>
              Senior full-stack développeur, blogueur et conférencier.
            </Paragraph>
            <Paragraph>
              Passionné de JavaScript, il participe activement à
              l’évolution du langage JavaScript.
            </Paragraph>
            <Paragraph>
              Sa mission consiste à accompagner et former les développeurs dans
              l’apprentissage et l’intégration des nouvelles
              librairies JavaScript dans leurs projets.
            </Paragraph>
            <Paragraph>
              Il compte, entre autres, parmi ses références : Le Monde,
              Doctolib, Entefy, WisePops.
            </Paragraph>
          </FounderInfo>
        </Founder>
      </Wrapper>
      <Separator />
      <Wrapper>
        <Founder inverse>
          <FounderPicture
            src="//res.cloudinary.com/smooth/image/upload/c_scale,h_400,w_300,dpr_2/v1497877282/profile_jeremy_vdqdbb.jpg"
            alt="Jérémy Sfez"
            width="300"
            height="400"
          />
          <FounderInfo>
            <SecondaryTitle>Jérémy Sfez</SecondaryTitle>
            <ThirdTitle>Co-fondateur et DG de Smooth Code</ThirdTitle>
            <Paragraph>
              Développeur, entrepreneur, passionné de développement
              web et d’actualité tech.
            </Paragraph>
            <Paragraph>
              Ses missions consistent à répondre aux besoins business et
              techniques des entreprises en leur proposant des formations
              adaptées. Il se charge aussi d’accompagner les clients lors de la
              constitution de leur dossier de formation.
            </Paragraph>
            <Paragraph>
              Il compte parmi ses références BNP Paribas, Canal +, Doctolib,
              Alten SIR, Pacifica...
            </Paragraph>
          </FounderInfo>
        </Founder>
      </Wrapper>
      <Vision>
        <Wrapper>
          <SecondaryTitle>Notre vision</SecondaryTitle>
          <Paragraph small>
            JavaScript évolue très vite, répond à de nombreux objectifs
            business et s’impose sur tous les environnements :
          </Paragraph>
          <List small>
            <li>Création d’interfaces utilisateur interactives avec React,</li>
            <li>Outil en ligne de commande avec Node.js</li>
            <li>API moderne et performante avec Koa ou Express</li>
            <li>Développement mobile avec React Native,</li>
            <li>
              Création d’application native multi-plateformes avec Electron
            </li>
          </List>
          <Paragraph small>
            Smooth Code propose des formations courtes de haut niveau sur les
            nouvelles méthodes de développement JavaScript.<br />
            Experts dans notre domaine et focalisés sur un périmètre restreint
            de libraires JavaScript comme React, Redux ou RxJS nous proposons
            des formations courtes de haut niveau sur ces nouvelles méthodes de
            développement.
            Notre expertise porte également sur les outils tels que
            Atom, Webpack, Babel, Prettier ou ESLint.
          </Paragraph>
        </Wrapper>
      </Vision>
      <Wrapper>
        <SectionTitle>La Smooth Touch</SectionTitle>
        <SmoothTouches>
          <SmoothTouch>
            <Target />
            <ThirdTitle>Un format court et efficace</ThirdTitle>
            <Paragraph small>
              Le format de nos formations est optimisé pour un apprentissage
              rapide et efficace : un petit groupe de travail (6 personnes
              maximum) et une répartition du temps efficace : 50% de cours, 50%
              d’applications. Tous nos supports et exercices sont également
              accessibles en ligne pendant et après la formation.
            </Paragraph>
          </SmoothTouch>
          <SmoothTouch>
            <Rocket />
            <ThirdTitle>Une expertise complète</ThirdTitle>
            <Paragraph small>
              Nous nous positionnons comme expert du langage JavaScript.
              Notre veille technologique régulière nous permet de maîtriser les
              dernières technologies et vous fournir les bonnes pratiques
              les plus récentes.
            </Paragraph>
          </SmoothTouch>
          <SmoothTouch>
            <Code />
            <ThirdTitle>Développeur avant tout</ThirdTitle>
            <Paragraph small>
              Nous utilisons et développons chaque jour des projets grâce aux
              technologies proposées dans nos formations. Nos conseils sont de
              vrais retours d’expérience sur l’utilisation des librairies en
              production.
            </Paragraph>
          </SmoothTouch>
        </SmoothTouches>
      </Wrapper>
    </Content>
    <Footer />
  </PageContainer>
