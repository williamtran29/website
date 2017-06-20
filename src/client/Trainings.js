import React from 'react'
import styled from 'styled-components'
import { lighten } from 'polished'
import { Helmet } from 'react-helmet'
import { gql, graphql } from 'react-apollo'
import { Link } from 'react-router-dom'
import { clUrl } from 'modules/cloudinary'
import Card3D from 'modules/components/Card3D'
import Header from 'client/Header'
import Footer from 'client/Footer'
import PageContainer from 'client/PageContainer'

const TrainingList = styled.ul`
  flex: 1;
  display: flex;
  justify-content: center;
  max-width: 1000px;
  width: 100%;
  flex-wrap: wrap;
  list-style-type: none;
  margin: 40px auto 100px;
  padding: 0;
`

const Training = styled.li`
  margin: 10px;
`

const TrainingContainer = styled.div`
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100%;
  color: white;
`

const TrainingTitle = styled.h3`
  margin: 0;
  font-weight: 300;
  padding-top: 10px;
  text-align: center;
  font-size: 22px;
  line-height: 30px;
  width: 100%;
`

const TrainingContent = styled.div`
  display: flex;
  padding: 0 20px 20px;
`

const TrainingDescription = styled.div`
  flex: 1;
  font-weight: 300;
  font-size: 15px;
  line-height: 1.4;
  margin-left: 20px;
`

const TrainingDuration = styled.div`
  font-weight: 300;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  font-size: 12px;
  line-height: 20px;
  text-align: center;
  margin-bottom: 10px;
`

export default graphql(gql`
  query trainings {
    trainings {
      cloudinary_id
      name
      abstract
      duration
      slug
      color
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
                height={180}
                width={300}
                background={`linear-gradient(180deg, ${training.color}, ${lighten(
                  0.2,
                  training.color,
                )})`}
              >
                <TrainingContainer>
                  <TrainingTitle>{training.name}</TrainingTitle>
                  <TrainingDuration>{training.duration} jours</TrainingDuration>
                  <TrainingContent>
                    <img
                      alt={training.name}
                      src={clUrl(
                        training.cloudinary_id,
                        'c_scale,w_100,h_100,dpr_2',
                      )}
                      width="100"
                      height="100"
                    />
                    <TrainingDescription>
                      {training.abstract}
                    </TrainingDescription>
                  </TrainingContent>
                </TrainingContainer>
              </Card3D>
            </Link>
          </Training>,
        )}
    </TrainingList>
    <Footer />
  </PageContainer>,
)
