import React from 'react'
import { lighten, darken } from 'polished'
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

  p, li {
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
  flex: 1 0;
  margin: 0 20px;
  display: flex;
  flex-direction: column;
  font-size: 14px;

  svg {
    align-self: center;
    width: 60%;
    margin: 20px 0;
  }
`

const Introduction = styled.section`
  text-align: center;
  margin: 40px 0 20px;
`

export default () =>
  <PageContainer>
    <Header />
    <Content>
      <Wrapper>
        <Introduction>
          <MainTitle>Notre histoire</MainTitle>
          <Paragraph>
            Smooth Code a été fondée en 2017. Nous proposons des formations
            professionnelles courtes de haut niveau aux développeurs pour leur
            permettre d’intégrer rapidement les nouvelles librairies
            JavaScripts dans leur projets et réduire leur cycles
            d’apprentissage.
          </Paragraph>
        </Introduction>
      </Wrapper>
      <Wrapper>
        <Founder>
          <FounderPicture
            src="http://res.cloudinary.com/smooth/image/upload/c_scale,h_400,w_300,dpr_2/v1497877192/profile_greg_ihxwjo.jpg"
            alt="Greg Bergé"
            width="300"
            height="400"
          />
          <FounderInfo>
            <SecondaryTitle>Greg Bergé</SecondaryTitle>
            <ThirdTitle>Co-fondateur et Président de Smooth Code</ThirdTitle>
            <Paragraph>
              Senior front-end ingénieur développeur, blogueur et
              conférencier.
            </Paragraph>
            <Paragraph>
              Passionné de JavaScript, il suit et participe activement à
              l’évolution du langage JavaScript.
            </Paragraph>
            <Paragraph>
              Sa mission consiste à accompagner les développeurs dans
              l’apprentissage et l’intégration des nouvelles
              librairies JavaScript dans leur projets.
            </Paragraph>
            <Paragraph>
              Il compte parmi ses références Le Monde, Doctolib, Entefy,
              WisePops, et bien d’autres...
            </Paragraph>
          </FounderInfo>
        </Founder>
      </Wrapper>
      <Separator />
      <Wrapper>
        <Founder inverse>
          <FounderPicture
            src="http://res.cloudinary.com/smooth/image/upload/c_scale,h_400,w_300,dpr_2/v1497877282/profile_jeremy_vdqdbb.jpg"
            alt="Jérémy Sfez"
            width="300"
            height="400"
          />
          <FounderInfo>
            <SecondaryTitle>Jérémy Sfez</SecondaryTitle>
            <ThirdTitle>Co-fondateur et Directeur General de Smooth Code</ThirdTitle>
            <Paragraph>
              Ingénieur développeur, entrepreneur, passionné de développement
              web et d’actualité tech.
            </Paragraph>
            <Paragraph>
              Ses missions consistent à répondre aux besoins business et
              techniques des entreprises en leur proposant des formations
              adaptées. Il se charge aussi d’accompagner les clients lors de
              la constitution de leur dossier de formation.
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
            JavaScript évolue très vite, réponds à de nombreux objectifs
            business et s’impose sur tous les environnements :
          </Paragraph>
          <List small>
            <li>Création d’interfaces utilisateur interactives avec React,</li>
            <li>
              Exécution d’un moteur ultra-rapide côté serveur avec Node.js,
            </li>
            <li>Développement mobile avec React Native,</li>
            <li>
              Création d’application Mac, Windows et Linux avec le framework
              Electron
            </li>
            <li>Et bien d’autres applications encore &hellip;</li>
          </List>
          <Paragraph small>
            Smooth Code propose des formations professionnelles courtes de haut niveau sur les nouvelles
            méthodes de développement JavaScript (ES6 et ES7), sur les librairies qui l’enrichissent (React,
            Node.js, Redux,...) et sur les outils et frameworks du langage (Webpack, Angular, Jest, ...).
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
              <b>Objectif</b> : Maîtriser une nouvelle technologie en quelques jours
              l’intégrer dans vos projets dès le lendemain.<br/><br/>

              <b>Nos points forts</b> :
              <ul>
                <li>Des experts à votre service,</li>
                <li>Un petit groupe de travail</li>
                <li>Et optimisation de votre temps : 50% de présentation et 50% d’exercices</li>
              </ul>
              Tous nos présentations sont illustrés par des exercices d’applications et nos formateurs sont là pour vous guider.
            </Paragraph>
          </SmoothTouch>
          <SmoothTouch>
            <Rocket />
            <ThirdTitle>Une expertise complète</ThirdTitle>
            <Paragraph small>
              Nous nous positionnons comme experts du langages JavaScript et des
              sujets s’y rapportant. Nous effectuons une importante veille technologique
              pour maîtriser les technologies d’avant-garde et les librairies à venir.
              Nous testons ces technologies en production et nous sommes heureux de pouvoir
              échanger nos retours expériences avec vous.
            </Paragraph>
          </SmoothTouch>
          <SmoothTouch>
            <Code />
            <ThirdTitle>Développeur avant tout</ThirdTitle>
            <Paragraph small>
              Nous nous engageons à vous transmettre des informations à jour,
              vous
              permettant d’accélérer les cycles d’apprentissages des différentes
              technologies proposées en formation. Nos conseils ont étés testés,
              discutés et éprouvés en environnement de production.
            </Paragraph>
          </SmoothTouch>
        </SmoothTouches>
      </Wrapper>
    </Content>
    <Footer />
  </PageContainer>
