import React from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import { gql, graphql } from 'react-apollo'
import classNames from 'classnames'
import theme from 'style/theme'
import PageContainer from 'client/PageContainer'
import Header from 'client/Header'
import Footer from 'client/Footer'
import MainTitle from 'modules/components/MainTitle'
import { clUrl } from 'modules/cloudinary'

const Container = styled.div`
  flex: 1;
  margin: 20px auto;
  max-width: 1000px;
  width: 100%;
  text-align: center;
`

const Intro = styled.div`
  font-size: 20px;
  font-weight: 300;
  line-height: 24px;
  letter-spacing: 0.2px;
`

const TestimonialsList = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  text-align: left;
  align-items: center;

  @media (min-width: ${theme.medias.phablet}) {
    flex-direction: row;
  }
`

const CompanyLogo = styled.div`
  height: 90px;
  width: 90px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  background-image: url(${props => props.bgImage});
  flex-shrink: 0;
  margin-right: 20px;

  @media (min-width: ${theme.medias.phablet}) {
    height: 160px;
    width: 160px;
    margin-right: 50px;
  }
`

const Text = styled.div`
  font-size: 18px;
  line-height: 24px;
  font-weight: 300;
  text-align: center;
  padding: 20px;

  @media (min-width: ${theme.medias.phablet}) {
    font-size: 20px;
    line-height: 26px;
  }
`

const TestimonialContainer = styled.div`
  flex: 0 0 auto;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  color: #fff;
  padding: 10px;
  flex-direction: row;
  border-radius: 4px;
  height: 250px;
  background-color: ${props => props.bgColor};
  background-blend-mode: overlay;
  background-image: linear-gradient(
    -225deg,
    rgba(0, 0, 0, 0.68) 0%,
    rgba(0, 0, 0, 0.15) 100%
  );
  margin: 20px;

  &.featured {
    color: ${theme.colors.grayDark};
    padding: 0;
    flex-direction: column;
    border-radius: 0;
    height: auto;
    background-color: transparent;
    background-image: none;

    ${CompanyLogo} {
      height: 50px;
      width: 100%;
      margin-right: 0;
    }

    ${Text} {
      font-size: 25px;
      line-height: 30px;
    }
  }

  @media (min-width: ${theme.medias.phablet}) {
    flex: 0 0 calc(50% - 40px);
  }
`

const TextAndAuthor = styled.div`
  display: flex;
  flex-direction: column;
`

const Author = styled.div`
  display: flex;
  align-self: center;
`

const AuthorImage = styled.img`
  border-radius: 50%;
  height: 50px;
  width: 50px;
  margin-right: 10px;
  text-align: center;
`

const AuthorInfos = styled.div`
  font-size: 14px;
  line-height: 20px;

  &.noAvatar {
    text-align: center;
  }
`

const AuthorName = styled.div`font-weight: 600;`

const AuthorTitle = styled.div``

const Shadow = styled.div`
  position: absolute;
  left: 0;
  top: -100px;
  width: 130px;
  height: 700px;
  mix-blend-mode: overlay;
  transform: rotate(-5deg);
  background-image: linear-gradient(
    -225deg,
    rgba(255, 255, 255, 0.24) 0%,
    rgba(255, 255, 255, 0.15) 90%
  );
  background-blend-mode: overlay;

  @media (min-width: ${theme.medias.phablet}) {
    width: 230px;
    transform: rotate(-15deg);
  }
`

const Testimonial = ({ testimonial }) => (
  <TestimonialContainer
    className={classNames({ featured: testimonial.featured })}
    bgColor={testimonial.company.color}
  >
    {!testimonial.featured ? <Shadow /> : null}
    <CompanyLogo
      bgImage={clUrl(testimonial.company.logo, 'dpr_2', null, 'q_auto')}
    />
    <TextAndAuthor>
      <Text>{`«\xa0${testimonial.text}\xa0»`}</Text>
      <Author>
        {testimonial.avatar ? (
          <AuthorImage
            alt={testimonial.name}
            src={clUrl(testimonial.avatar, 'c_fill,g_face,w_50,h_50,dpr_2')}
          />
        ) : null}
        <AuthorInfos className={classNames({ noAvatar: !testimonial.avatar })}>
          <AuthorName>{testimonial.name}</AuthorName>
          <AuthorTitle>{testimonial.title}</AuthorTitle>
        </AuthorInfos>
      </Author>
    </TextAndAuthor>
  </TestimonialContainer>
)

const withTestimonials = graphql(
  gql`
    query testimonials {
      testimonials {
        id
        name
        title
        avatar
        text
        featured
        company {
          id
          color
          name
          logo
        }
      }
    }
  `,
)

const Testimonials = withTestimonials(({ data }) => (
  <PageContainer>
    <Helmet>
      <title>Nos références</title>
    </Helmet>
    <Header />
    <Container>
      <MainTitle>Nos références</MainTitle>
      <Intro>
        Nos clients nous recommandent et nous font confiance. Chaque jour ce
        sont eux qui nous font avancer et nous poussent à aller toujours plus
        loin.
      </Intro>
      {data &&
      data.testimonials && (
        <TestimonialsList>
          {data.testimonials.map(testimonial => (
            <Testimonial key={testimonial.id} testimonial={testimonial} />
          ))}
        </TestimonialsList>
      )}
    </Container>
    <Footer />
  </PageContainer>
))

export default Testimonials
