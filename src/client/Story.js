import React from 'react'
import { lighten, darken } from 'polished'
import styled from 'styled-components'
import theme from 'style/theme'
import PageContainer from 'client/PageContainer'
import Header from 'client/Header'
import Footer from 'client/Footer'

const Content = styled.div`
  flex: 1;
  font-size: 17px;
  font-weight: 300;
  letter-spacing: 0.2px;
  line-height: 1.5;
`

const Wrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
`

const Founders = styled.div``

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
    margin: 20px 30px;
  }
`

const FounderName = styled.h3`
  font-weight: 300;
  font-size: 30px;
  line-height: 1.1;
  letter-spacing: 0.3;
  margin: 0 0 10px;

  @media (min-width: ${theme.medias.phablet}) {
    font-size: 44px;
  }
`

const FounderJob = styled.p`
  font-weight: 300;
  font-size: 20px;
  line-height: 1.3;
  margin: 0 0 20px;

  @media (min-width: ${theme.medias.phablet}) {
    font-size: 24px;
  }
`

const Separator = styled.hr`
  height: 1px;
  background-color: ${theme.colors.grayLight};
  margin: 0;
  padding: 0;
  border: 0;
`

const SectionTitle = styled.h2`
  font-weight: 300;
  font-size: 40px;
  line-height: 1.2;
  letter-spacing: 0.3;
  text-align: center;
  margin: 40px 0 20px;

  @media (min-width: ${theme.medias.phablet}) {
    font-size: 50px;
  }
`

const WhoAreWe = styled.div`
  margin: 60px 0;
  padding: 20px 0;
  font-size: 20px;
  background-image: linear-gradient(0, ${theme.colors.primary}, ${darken(
  0.2,
  theme.colors.primary,
)});
  color: white;

  p, li {
    font-size: 16px;
    color: ${lighten(0.4, theme.colors.primary)};
    mix-blend-mode: luminosity;
    text-shadow: 0 1px 2px rgba(0,0,0,.2);
  }

  @media (min-width: ${theme.medias.phablet}) {
    margin: 100px 0;
  }
`

const WhoWeAreTitle = styled.h2`
  font-weight: 300;
  font-size: 24px;
  margin: 0;
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

  p {
    font-size: 14px;
  }
`

const SmoothTouchTitle = styled.div`
  font-weight: 400;
  font-size: 20px;
  line-height: 1.2;
`

const Introduction = styled.div`
  font-size: 18px;
  text-align: center;

  @media (min-width: ${theme.medias.phablet}) {
    font-size: 20px;
  }
`

export default () =>
  <PageContainer>
    <Header />
    <Content>
      <SectionTitle>Notre histoire</SectionTitle>
      <Founders>
        <Wrapper>
          <Introduction>
            Smooth Code a été fondée en 2017. Nous proposons des formations
            professionnelles courtes de haut niveau aux développeurs pour leur
            permettre d’intégrer rapidement les nouvelles librairies
            JavaScripts et dans leur projets et réduire leur cycles
            d’apprentissage.
          </Introduction>
          <Founder>
            <FounderPicture
              src="http://res.cloudinary.com/smooth/image/upload/c_scale,h_400,w_300,dpr_2/v1497877192/profile_greg_ihxwjo.jpg"
              alt="Greg Bergé"
              width="300"
              height="400"
            />
            <FounderInfo>
              <FounderName>Greg Bergé</FounderName>
              <FounderJob>Co-fondateur et Président de Smooth Code</FounderJob>
              <p>
                Senior front-end ingénieur développeur, blogueur et
                conférencier.
              </p>
              <p>
                Passionné de JavaScript, il suit et participe activement à
                l’évolution
                du langage JavaScript.
              </p>
              <p>
                Sa mission consiste à accompagner les
                développeurs dans l’apprentissage et l’intégration des nouvelles
                librairies JavaScript et dans leur projets.
              </p>
              <p>
                Il compte parmi ses
                références Le Monde et Doctolib, Entefy, WisePops, et bien
                d’autres...
              </p>
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
              <FounderName>Jérémy Sfez</FounderName>
              <FounderJob>Co-fondateur et DG de Smooth Code</FounderJob>
              <p>
                Ingénieur développeur et entrepreneur passionné de développement
                web
                d’actualité tech.
              </p>
              <p>
                Ses missions consistent à répondre aux besoins business et
                techniques
                des entreprises en leur proposant des formations adaptées. Il se
                charge
                aussi d’accompagner les clients lors de la constitution de leur
                dossier
                de formation.
              </p>
              <p>
                Il compte parmi ses références BNP Paribas, Canal +, Doctolib,
                Alten
                SIR, Pacifica,...
              </p>
            </FounderInfo>
          </Founder>
        </Wrapper>
      </Founders>
      <WhoAreWe>
        <Wrapper>
          <WhoWeAreTitle>Notre vision</WhoWeAreTitle>
          <p>
            JavaScript évolue très vite, réponds à de nombreux objectifs
            business et
            s’impose sur tous les environnements :
          </p>
          <ul>
            <li>Création d’interfaces utilisateur interactives avec React</li>
            <li>
              Exécution d&apos;un moteur ultra-rapide côté serveur avec Node.js
            </li>
            <li>Développement mobile avec React Native</li>
            <li>
              Création d’application Mac, Windows et Linux avec le framework
              Electron
            </li>
          </ul>
          <p>
            Smooth Code propose des formations professionnelles courtes de haut
            niveau aux développeurs pour leur permettre d’intégrer rapidement
            les
            nouvelles les librairies JavaScripts et dans leur projets et réduire
            leur cycles d’apprentissage.
          </p>
        </Wrapper>
      </WhoAreWe>
      <Wrapper>
        <SectionTitle>La Smooth Touch</SectionTitle>
        <SmoothTouches>
          <SmoothTouch>
            <SmoothTouchTitle>Un format court et efficace</SmoothTouchTitle>
            <p>
              Smooth Code propose des formations professionnelles courtes de
              haut
              niveau sur les nouvelles méthodes de développement, sur les
              librairies
              qui enrichissent (React, Node.js, Redux,...), les outils et
              frameworks
              (Webpack, Angular, Jest) du langage JavaScript.
              Les formations se déroulent en petit groupes ( ~6 pers. ) au sein
              des
              entreprises cliente ou bien dans nos locaux au centre de Paris.
            </p>
          </SmoothTouch>
          <SmoothTouch>
            <SmoothTouchTitle>Une expertise complète</SmoothTouchTitle>
            <p>
              Nous nous positionnons comme experts du langages JavaScript et des
              sujets s’y rapportant.
              Nous effectuons une importante veille technologique pour maîtriser
              les
              technologies d’avant-garde et les librairies à venir. Nous testons
              ces
              technologies en production et nous sommes heureux de pouvoir
              échanger
              retours les différents choix techniques.
            </p>
          </SmoothTouch>
          <SmoothTouch>
            <SmoothTouchTitle>Avant tout des développeurs</SmoothTouchTitle>
            <p>
              Nous nous engageons à vous transmettre des informations à jour,
              vous
              permettant d’accélérer les cycles d’apprentissages des différentes
              technologies proposées en formation. Nos conseils ont étés testés,
              discutés et éprouvés en environnement de production.
            </p>
          </SmoothTouch>
        </SmoothTouches>
      </Wrapper>
    </Content>
    <Footer />
  </PageContainer>
