import React from 'react'
import Helmet from 'react-helmet-async'
import MainTitle from 'client/components/MainTitle'
import PageContainer from 'client/components/PageContainer'
import Header from 'client/components/Header'
import Footer from 'client/components/Footer'
import Wrapper from 'client/components/Wrapper'
import StaticPage from 'client/components/StaticPage'

export default () => (
  <PageContainer>
    <Helmet>
      <title>Mentions légales</title>
    </Helmet>
    <Header />
    <Wrapper>
      <StaticPage>
        <header>
          <MainTitle>Mentions légales</MainTitle>
          <p>
            Mentions légales relatives à l’utilitation du présent site web et
            informations administratives de Smooth Code SAS
          </p>
        </header>
        <h2>Edition du Site Web</h2>
        <p>
          Le site internet www.smooth-code.com est la propriété de la société :
          Smooth Code SAS
        </p>
        <ul>
          <li>Créateur et Webmaster : Greg Bergé – greg@smooth-code.com</li>
          <li>Responsable publication : Smooth Code SAS</li>
          <li>
            Hébergeur : HEROKU Inc. – 650 7th Street San Francisco, CA USA
          </li>
        </ul>

        <h2>Informations pratiques</h2>
        <table>
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
            <td>+(33)9 87 02 24 12</td>
          </tr>
          <tr>
            <td>Email de contact</td>
            <td>contact@smooth-code.com</td>
          </tr>
        </table>

        <h2>Données personnelles et Cookies</h2>
        <p>
          Le site www.smooth-code.com ne fait l’objet d’auncune déclaration à la
          CNIL car aucune information personnelle n’est collectée. Aucun cookie
          n’est généré en plus de ceux utilisé par Google Analytics a des fins
          d’analyse du traffic.
        </p>
      </StaticPage>
    </Wrapper>
    <Footer />
  </PageContainer>
)
