import React from 'react'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'
import MainTitle from 'modules/components/MainTitle'
import SecondaryTitle from 'modules/components/SecondaryTitle'
import Paragraph from 'modules/components/Paragraph'
import Link from 'modules/components/Link'
import PageContainer from 'client/PageContainer'
import Header from 'client/Header'
import Footer from 'client/Footer'
import List from 'modules/components/List'
import Table from 'modules/components/Table'
import theme from 'style/theme'

const Content = styled.div`
  flex: 1;
  margin-bottom: 100px;
`

const SmallSecondaryTitle = styled(SecondaryTitle)`
  font-size: 26px;
  margin-top: 40px;
  padding-bottom: 5px;
  border-bottom: solid 1px ${theme.colors.grayLight};
  text-transform: uppercase;
`

const SmallParagraph = styled(Paragraph)`font-size: 18px;`

const Wrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
`

const Introduction = styled.section`
  text-align: center;
  margin: 40px 0 20px;

  ${Paragraph} {
    font-size: 20px;
    max-width: 700px;
    margin: 0 auto;
  }
`

export default () => (
  <PageContainer>
    <Helmet>
      <title>Mentions légales</title>
    </Helmet>
    <Header />
    <Content>
      <Wrapper>
        <Introduction>
          <MainTitle>Mentions légales</MainTitle>
          <Paragraph>
            Mentions légales relatives à l’utilitation du présent site web et
            informations administratives de Smooth Code SAS
          </Paragraph>
        </Introduction>
      </Wrapper>
      <Wrapper>
        <SmallSecondaryTitle>Edition du Site Web</SmallSecondaryTitle>
        <SmallParagraph>
          Le site internet <Link to="/">www.smooth-code.com</Link> est la
          propriété de la société : Smooth Code SAS
        </SmallParagraph>
        <List>
          <li>Créateur et Webmaster : Greg Bergé – greg@smooth-code.com</li>
          <li>Responsable publication : Smooth Code SAS</li>
          <li>
            Hébergeur : HEROKU Inc. – 650 7th Street San Francisco, CA USA
          </li>
        </List>

        <SmallSecondaryTitle>Informations pratiques</SmallSecondaryTitle>
        <Table>
          <tr>
            <th>Société</th>
            <th>Smooth Code</th>
          </tr>
          <tr>
            <td>Représentant légal et Président</td>
            <td>Greg Bergé</td>
          </tr>
          <tr>
            <td>Adresse du siège</td>
            <td>41 rue Réaumur - 75003 Paris</td>
          </tr>
          <tr>
            <td>SIREN</td>
            <td>830511788</td>
          </tr>
          <tr>
            <td>SIRET</td>
            <td>830511788 00010</td>
          </tr>
          <tr>
            <td>RCS</td>
            <td>830 511 788 R.C.S. Paris</td>
          </tr>
          <tr>
            <td>NAF/APE</td>
            <td>8559B - Autres enseignements</td>
          </tr>
          <tr>
            <td>Forme Juridique</td>
            <td>SAS (Société par Actions Simplifiées)</td>
          </tr>
          <tr>
            <td>Capital Social</td>
            <td>1000 €</td>
          </tr>
          <tr>
            <td>Numéro de déclaration d’activité</td>
            <td>11 75 56363 75</td>
          </tr>
          <tr>
            <td>Numéro de TVA intracommunautaire</td>
            <td>FR69 830 511 788</td>
          </tr>
          <tr>
            <td>Téléphone</td>
            <td>+(33)6 50 58 80 79</td>
          </tr>
          <tr>
            <td>Email de contact</td>
            <td>contact@smooth-code.com</td>
          </tr>
        </Table>

        <SmallSecondaryTitle>
          Données personnelles et Cookies
        </SmallSecondaryTitle>
        <SmallParagraph>
          Le site <Link to="/">smooth-code.com</Link> ne fait l’objet d’auncune
          déclaration à la CNIL car aucune information personnelle n’est
          collectée. Aucun cookie n’est généré en plus de ceux utilisé par
          Google Analytics a des fins d’analyse du traffic.
        </SmallParagraph>
      </Wrapper>
    </Content>
    <Footer />
  </PageContainer>
)
