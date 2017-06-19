import React from 'react'
import styled from 'styled-components'
import { transparentize } from 'polished'
import { Helmet } from 'react-helmet'
import { gql, graphql } from 'react-apollo'
import { Link } from 'react-router-dom'
import theme from 'style/theme'
import { clUrl } from 'modules/cloudinary'
import Card3D from 'modules/components/Card3D'
import Header from 'client/Header'
import Footer from 'client/Footer'
import PageContainer from 'client/PageContainer'

const TrainingList = styled.ul`
  flex: 1;
  display: flex;
  justify-content: center;
  max-width: ${theme.medias.xl};
  flex-wrap: wrap;
  list-style-type: none;
  margin: 40px auto 100px;
  padding: 0;
`

const Training = styled.li`
  margin: 10px 20px;
`

const TrainingContent = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
`

const TrainingTitle = styled.h3`
  color: white;
  margin: 0;
  background: linear-gradient(30deg, ${transparentize(
    0.2,
    theme.colors.primary,
  )}, ${transparentize(0.4, theme.colors.primary)});
  font-weight: 400;
  letter-spacing: 0.1em;
  padding: 5px;
  text-align: center;
  text-transform: uppercase;
  font-size: 14px;
`

const TrainingDuration = styled.div`
  color: white;
  margin: 0;
  background: linear-gradient(60deg, ${transparentize(
    0.2,
    theme.colors.primary,
  )}, ${transparentize(0.4, theme.colors.primary)});
  font-weight: 400;
  letter-spacing: 0.2em;
  padding: 3px;
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
`

export default graphql(gql`
  query Trainings {
    trainings {
      cloudinary_id
      name
      duration
      slug
    }
  }
`)(({ data }) =>
  <PageContainer>
    <Helmet>
      <title>Nos formations JavaScript</title>
    </Helmet>
    <Header />
    <TrainingList>
      {data.trainings &&
        data.trainings.map(training =>
          <Training key={training.slug}>
            <Link to={`/trainings/${training.slug}`}>
              <Card3D
                height={300}
                width={250}
                background={clUrl(training.cloudinary_id)}
              >
                <TrainingContent>
                  <TrainingTitle>{training.name}</TrainingTitle>
                  <TrainingDuration>{training.duration} jours</TrainingDuration>
                </TrainingContent>
              </Card3D>
            </Link>
          </Training>,
        )}
    </TrainingList>
    <Footer />
  </PageContainer>,
)
