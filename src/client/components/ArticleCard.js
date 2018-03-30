import React from 'react'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { lighten } from 'polished'
import { Link } from 'react-router-dom'
import theme from 'client/style/legacyTheme'

export const articleCardFragment = gql`
  fragment ArticleCard on Article {
    id
    slug
    link
    title
    published_at
    feature_image {
      url
    }
    custom_excerpt
    author {
      slug
      name
      profile_image {
        url
      }
      link
    }
    tags {
      slug
      name
    }
  }
`

const Tag = styled.div`
  margin-bottom: 5px;
  color: ${lighten(0.2, theme.colors.grayDark)};
  font-size: 12px;
  line-height: 16px;
  font-weight: 400;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`

const ImageLink = styled(Link)`
  display: block;
  overflow: hidden;
  position: relative;
`

const Image = styled.div`
  width: auto;
  height: 200px;
  background: #fff no-repeat 50%;
  background-size: cover;
  background-image: url(${props => props.image});
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
`

const ContentLink = styled(Link)`
  display: block;
  padding: 25px 25px 0;
`

const ArticleHeader = styled.header``

const Title = styled.h2`
  font-size: 18px;
  line-height: 24px;
  font-weight: 400;
  margin: 0 0 10px;
`

const Excerpt = styled.section`
  p {
    font-size: 15px;
    line-height: 22px;
    font-weight: 300;
    margin: 0 0 20px;
  }
`

const Footer = styled.footer`padding: 0 25px 25px;`

const AuthorImage = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 5px;
  border-radius: 100%;
  object-fit: cover;
`

const AuthorLink = styled(Link)`
  display: flex;
  align-items: center;
  transition: color 200ms;

  &:hover {
    color: ${theme.colors.primary};
  }
`

const Author = styled.span`
  font-size: 14px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`

const Article = styled.article`
  display: flex;
  min-height: 300px;
  overflow: hidden;
  margin: 0 20px 5vw;
  border-radius: 3px;
  box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.08), 0 5px 20px 0 rgba(0, 0, 0, 0.06);
  transition: transform 300ms, box-shadow 300ms;
  will-change: transform, box-shadow;
  display: flex;
  flex: 1 1 300px;
  flex-direction: column;
  background-color: #fff;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.08), 0 0 10px 0 rgba(0, 0, 0, 0.06);
  }

  @media (min-width: ${theme.medias.phablet}) {
    &:nth-child(6n + 1) {
      margin: 0 20px 40px;
      flex: 1 1 100%;
      flex-direction: row;

      ${ImageLink} {
        flex: 1;
      }

      ${Footer} {
        padding: 0 40px 30px;
      }

      ${Excerpt} p {
        font-size: 17px;
        line-height: 24px;
      }

      ${Title} {
        font-size: 24px;
        line-height: 30px;
        margin: 0 0 20px;
      }

      ${ContentLink} {
        padding: 30px 40px 0;
      }

      ${Content} {
        flex: 0 1 350px;
      }

      ${Image} {
        position: absolute;
        width: 100%;
        height: 100%;
      }
    }

    ${props =>
      props.featuring
        ? `
      &:first-child {
        margin-top: -60px;
      }
    `
        : ''};
  }
`

const ArticleCard = ({ article, featuring }) => (
  <Article key={article.slug} featuring={featuring}>
    <ImageLink to={article.link}>
      <Image image={article.feature_image.url} />
    </ImageLink>
    <Content>
      <ContentLink to={article.link}>
        <ArticleHeader>
          <Tag>{article.tags[0].name}</Tag>
          <Title>{article.title}</Title>
        </ArticleHeader>
        <Excerpt>
          <p>{article.custom_excerpt}</p>
        </Excerpt>
      </ContentLink>
      <Footer>
        <AuthorLink to={article.author.link}>
          <AuthorImage
            src={article.author.profile_image.url}
            alt={article.author.name}
          />
          <Author>{article.author.name}</Author>
        </AuthorLink>
      </Footer>
    </Content>
  </Article>
)

export default ArticleCard
