import React from 'react'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'
import MainTitle from 'modules/components/MainTitle'
import SecondaryTitle from 'modules/components/SecondaryTitle'
import ThirdTitle from 'modules/components/ThirdTitle'
import Paragraph from 'modules/components/Paragraph'
import PageContainer from 'client/PageContainer'
import Header from 'client/Header'
import Footer from 'client/Footer'
import List from 'modules/components/List'
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
`

const SmallThirdTitle = styled(ThirdTitle)`
  font-size: 20px;
  margin-top: 30px;
  font-weight: 400;
`

const Table = styled.table`
  width: 100%;
  border: solid 1px ${theme.colors.grayLight};
  border-collapse: collapse;

  tr:nth-child(odd) {
    background-color: ${theme.colors.grayLight};
  }

  th {
    color: white;
    background-color: ${theme.colors.primary};
    border: solid 1px ${theme.colors.grayLight};
    text-align: left;
    padding-left: 10px;
  }

  td {
    padding-left: 10px;
    border: solid 1px ${theme.colors.grayLight};
  }

  td:nth-child(even) {
    text-align: center;
  }
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
    width: 700px;
    margin: 0 auto;
  }
`

export default () => (
  <PageContainer>
    <Helmet>
      <title>Conditions générales de ventes</title>
    </Helmet>
    <Header />
    <Content>
      <Wrapper>
        <Introduction>
          <MainTitle>Conditions Générales de Ventes</MainTitle>
          <SmallParagraph>
            Vous trouverez ci-dessous les conditions générales de ventes
            applicables aux formations dispensées par Smooth Code.
          </SmallParagraph>
        </Introduction>
      </Wrapper>
      <Wrapper>
        <SmallSecondaryTitle>Article 1 : PREAMBULE</SmallSecondaryTitle>
        <SmallParagraph>
          Le présent document, ci-après « Conditions Générales de Ventes » («
          CGV »), s’applique à toutes les offres de formation proposées par la
          société Smooth Code, dispensées en inter-entreprises ou en
          intra-entreprise.
        </SmallParagraph>
        <SmallParagraph>
          Le fait de s’inscrire à une formation implique adhésion entière et
          sans réserve du client aux présentes CGV, le client se portant fort de
          leur respect par l’ensemble de ses salariés, préposés et agents.
        </SmallParagraph>
        <SmallParagraph>
          Le client reconnaît à cet effet que, préalablement à la signature du
          formulaire d’inscription, il a bénéficié des informations et conseils
          suffisants, lui permettant de s’assurer de l’adéquation de l’offre de
          services à ses besoins.
        </SmallParagraph>
        <SmallParagraph>
          Smooth Code se réserve le droit de réviser les présentes conditions
          générales à tout moment, les nouvelles conditions s’appliquant à toute
          nouvelle commande, quelle que soit l’antériorité des relations entre
          la Société et le client.
        </SmallParagraph>

        <SmallSecondaryTitle>
          ARTICLE 2 : INSCRIPTION A UNE SESSION de formation
        </SmallSecondaryTitle>
        <SmallParagraph>
          Pour s’inscrire à une de ces formations, un postulant doit contacter
          la société Smooth Code en utilisant le formulaire mis à disposition
          sur le site internet, envoyer un mail à
          <a href="mailto:contact@smooth-code.com">contact@smooth-code.com</a>
          ou contacter Smooth Code par téléphone. Le client doit fournir les
          informations suivantes :
        </SmallParagraph>
        <List>
          <li>Date et sujet de la formation souhaitée ;</li>
          <li>Raison sociale ;</li>
          <li>Nom, prénom, niveau et qualité des participants ;</li>
          <li>Un numéro de téléphone de contact ;</li>
          <li>Une demande de subrogation éventuelle.</li>
        </List>

        <SmallThirdTitle>2.1 session inter-entreprises</SmallThirdTitle>
        <SmallParagraph>
          Les sessions de formation inter-entreprises dispensées par Smooth Code
          ont lieu à des dates fixes disponibles sur le site
          www.smooth-code.com.
        </SmallParagraph>
        <SmallParagraph>
          En fonction du nombre de place disponible, Smooth Code valide
          l’inscription du client dans les meilleurs délais. Smooth Code lui
          transmet ensuite : un bulletin d’inscription nominatif, faisant office
          de convention de formation, un exemplaire du programme de formation au
          format PDF et, si nécessaire, un devis formel.
        </SmallParagraph>
        <SmallParagraph>
          Afin de finaliser la réservation, le client doit retourner à Smooth
          Code le contrat d’inscription signé. L’inscription est considérée
          comme définitive à la réception du paiement par chèque ou virement.
        </SmallParagraph>

        <SmallThirdTitle>2.2 session intra-entreprise</SmallThirdTitle>
        <SmallParagraph>
          Les sessions de formation intra-entreprises sont dispensées par Smooth
          Code dans les locaux d’une société cliente.
        </SmallParagraph>
        <SmallParagraph>
          À la réception de la demande client, Smooth Code s’engage à contacter
          le client dans les meilleurs délais afin d’avoir toutes les
          informations nécessaires à l’établissement d’un devis. Le client doit
          alors faire savoir si des modifications du programme sont à prévoir.
          Smooth Code transmet ensuite un document reprenant le programme de la
          formation validé par les deux parties, une convention de formation
          ainsi qu’un devis.
        </SmallParagraph>

        <SmallSecondaryTitle>ARTICLE 3 : Tarifs</SmallSecondaryTitle>
        <SmallParagraph>
          L’inscription est effectuée au nom de la personne physique
          (participant) mais le client de la Smooth Code est l’entreprise ou
          l’institution (contractant) figurant sur le bulletin d’inscription et
          payant le montant de la formation.
        </SmallParagraph>
        <SmallParagraph>
          Les tarifs peuvent être révisés à tout moment, mais ceux figurant dans
          une convention reçue et signée par Smooth Code sont garantis contre
          toute évolution ultérieure.
        </SmallParagraph>
        <SmallParagraph>Tous les prix sont indiqués en euros.</SmallParagraph>
        <SmallParagraph>
          Toute formation commencée est due en totalité à titre d’indemnité,
          même si le participant ne s’est pas présenté.
        </SmallParagraph>

        <SmallThirdTitle>3.1 session inter-entreprises</SmallThirdTitle>
        <SmallParagraph>
          Pour les formations inter-entreprises, le prix par participant est
          indiqué sur le site internet de Smooth Code.
        </SmallParagraph>
        <SmallParagraph>
          Le règlement se fera avant le début de la formation, dès réception de
          la facture correspondante.
        </SmallParagraph>

        <SmallThirdTitle>3.2 session intra-entreprise</SmallThirdTitle>
        <SmallParagraph>
          Pour les formations intra-entreprises, le prix par participant est
          indiqué sur le site internet de Smooth Code. Le prix d’une session de
          formation ne dépasse jamais le prix équivalent à l’inscription de sept
          participants.
        </SmallParagraph>
        <SmallParagraph>
          Le règlement se fera à la fin de chaque formation, dès réception de la
          facture correspondante.
        </SmallParagraph>
        <SmallParagraph>
          En cas de prise en charge du coût de la formation par un tiers,
          notamment un OPCA, le bénéficiaire devra nous faire parvenir tous les
          documents nécessaires à cette prise en charge, avant le début de la
          formation.
        </SmallParagraph>

        <SmallSecondaryTitle>
          Article 4 : Méthode pédagogique
        </SmallSecondaryTitle>
        <SmallParagraph>
          Afin de permettre le meilleur encadrement possible, nos formations
          sont organisées pour des groupes de 4 à 10 participants
        </SmallParagraph>
        <SmallParagraph>
          La formation est ponctuée de présentations et d’exercices pratiques.
          Les supports de cours sous forme d’une présentation sont mis à
          disposition des stagiaires et présentés sur un vidéoprojecteur. Les
          exercices sont disponibles en open-source sur Git. La procédure pour
          récupérer les fichiers vous est transmise pendant la formation.
        </SmallParagraph>
        <SmallParagraph />
        <SmallParagraph>
          Dans le cas d’une formation intra-entreprise, le client s’engage à
          nous fournir :
        </SmallParagraph>
        <List>
          <li>Une salle dédiée, sans interférence d’autres personnels ;</li>
          <li>
            Des tables et chaises pour tous les participants (formateur
            compris) ;
          </li>
          <li>Un vidéoprojecteur ou un téléviseur grand écran ;</li>
          <li>Des prises électriques en nombre suffisant ;</li>
          <li>
            Un accès internet haut débit pour les participants et le formateur.
          </li>
        </List>

        <SmallSecondaryTitle>
          ARTICLE 5 : RÈGLEMENT DE LA PRESTATION
        </SmallSecondaryTitle>
        <SmallParagraph>
          Les modalités de règlement dépendent de la nature de la prise en
          charge.
        </SmallParagraph>
        <SmallThirdTitle>5.1. Paiement par le client</SmallThirdTitle>
        <SmallParagraph>
          Après validation du devis ou signature de la convention de formation,
          le client reçoit une facture par e-mail.
        </SmallParagraph>
        <SmallParagraph>
          Les factures sont à régler au plus tard 30 (trente) jours calendaires
          après la date de la facture. Une fois le règlçement encaissé, Smooth
          Code peut fournir au client, sur simple demande, une facture acquittée
          attestant du règlement.
        </SmallParagraph>
        <SmallThirdTitle>5.2. Financement par OPCA</SmallThirdTitle>
        <SmallParagraph>
          Les démarches de prise en charge OPCA sont à la charge du client.
          Toutes les informations nécessaires à la constitution d’un dossier
          sont inscrites dans la convention de formation fournie au client.
        </SmallParagraph>
        <SmallParagraph>
          Le client s’engage à effectuer ses démarches de prise en charge avec
          toute la diligence nécessaire afin que Smooth Code reçoive l’accord de
          prise en charge au plus tard le premier jour de la prestation. A
          défaut, nous nous réservons le droit de facturer le client
          directement. En cas de refus du client, Smooth Code ne pourra assurer
          la prestation de formation.
        </SmallParagraph>
        <SmallParagraph>
          Si la demande de subrogation est refusée, ou partielle, le client est
          automatiquement redevable du solde en paiement direct.
        </SmallParagraph>
        <SmallParagraph>
          À l’issue d’une session de formation, le client reçoit une copie de la
          feuille de présence signée par demi-journée. Ce document vaut
          attestation de présence et preuve d’exécution de la prestation.
        </SmallParagraph>
        <SmallThirdTitle>5.3. Pénalités sur retard de paiement</SmallThirdTitle>
        <SmallParagraph>
          En cas de défaut d’encaissement à l’échéance prévue par la convention
          signée, Smooth Code se réserve le droit d’exiger l’indemnité de
          recouvrement forfaitaire prévue par la loi (40 € HT), et de déclencher
          le comptage des pénalités de retard (à un taux de 10,75 %), ces deux
          mesures étant explicitées dans la facture d’origine de la prestation.
          Les pénalités cessent de courir à l’encaissement du principal, et une
          facture de solde est alors émise.
        </SmallParagraph>
        <SmallParagraph>
          En cas d’incidents de paiement répétés, Smooth Code se réserve le
          droit de refuser au client toute prestation pour une durée
          discrétionnaire.
        </SmallParagraph>

        <SmallSecondaryTitle>
          ARTICLE 6 : INEXÉCUTION DE LA CONVENTION
        </SmallSecondaryTitle>
        <SmallParagraph>
          En cas d’inexécution de la convention par Smooth Code, ce-dernier
          s’engage à rembourser au client les sommes qui, n’ont pas été
          effectivement dépensées ou engagées.
        </SmallParagraph>
        <SmallParagraph>
          En cas d’exécution partielle de la convention du fait de Smooth Code,
          la facturation sera émise au prorata temporis. Smooth Code pourra
          proposer aux clients des dates complémentaires dédiées pour finaliser
          l’exécution de la prestation, qui feraient l’objet de leur propre
          facturation prorata temporis à conclusion.
        </SmallParagraph>
        <SmallParagraph>
          Une exécution partielle du fait du client (maladie, absence autre,
          etc.) ne saurait en aucun cas constituer un motif de réduction au
          tarif prévu par la convention signée ; Smooth Code pourra toutefois, à
          sa seule discrétion, proposer aux apprenants concernés une session de
          rattrapage à tarif préférentiel, et ce uniquement en cas d’absences
          pour cause de maladie ou de force majeure.
        </SmallParagraph>

        <SmallSecondaryTitle>
          ARTICLE 7 : ANNULATION PAR LE CLIENT
        </SmallSecondaryTitle>
        <SmallParagraph>
          Toute annulation d’une session du fait de Smooth Code entraîne de
          plein droit le remboursement intégral des sommes éventuellement déjà
          versées par les clients. En particulier, Smooth Code ne garantit pas
          la tenue de formations inter-entreprises qui n’auraient pas quatre
          inscrits payants au moins 7 jours calendaires avant la prestation.
        </SmallParagraph>
        <SmallParagraph>
          Toute annulation d’inscription du fait du client, y compris dans le
          cadre de son droit de rétractation (par LRAR conformément à l’article
          L6353-6 du Code du Travail) entraîne des frais d’annulation suivant le
          barème ci-après. Selon qu’un acompte a été versé ou non, celui-ci peut
          faire l’objet d’un remboursement partiel, ou au contraire appeler une
          facturation complémentaire :
        </SmallParagraph>
        <Table>
          <tr>
            <th>Délai avant la prestation en jours calendaires</th>
            <th>
              Frais d’annulation en pourcentage du tarif fixé par la convention
            </th>
          </tr>
          <tr>
            <td>Plus de 30 jours</td>
            <td>0%</td>
          </tr>
          <tr>
            <td>De 20 à 30 jours</td>
            <td>15%</td>
          </tr>
          <tr>
            <td>De 10 à 19 jours</td>
            <td>30%</td>
          </tr>
          <tr>
            <td>De 7 à 9 jours</td>
            <td>50%</td>
          </tr>
          <tr>
            <td>Moins de 7 jours</td>
            <td>75%</td>
          </tr>
        </Table>
        <SmallParagraph>
          Smooth Code ne peut par ailleurs pas être tenu responsable des frais
          engagés par le client ou ses apprenants pour leur déplacement :
          transport, hébergement, restauration, etc.
        </SmallParagraph>

        <SmallSecondaryTitle>
          ARTICLE 8 : DIFFÉRENDS ÉVENTUELS
        </SmallSecondaryTitle>
        <SmallParagraph>
          Si une contestation ou un différend ne peuvent être réglés à
          l’amiable, le Tribunal de Paris sera seul compétent pour régler le
          litige.
        </SmallParagraph>
      </Wrapper>
    </Content>
    <Footer />
  </PageContainer>
)
