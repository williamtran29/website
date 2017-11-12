/* eslint-disable react/no-danger */
import React from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import theme from 'style/theme'
import moment from 'modules/moment'
import Disqus from 'modules/components/Disqus'
import JsonLd from 'modules/components/JsonLd'
import Spinner from 'modules/components/Spinner'
import PageContainer from 'client/PageContainer'
import Header from 'client/Header'
import Footer from 'client/Footer'
import { clUrl } from 'modules/cloudinary'
import { completeUrl } from 'modules/urlUtil'
import compose from 'recompact/compose'
import SessionCard from 'modules/components/SessionCard'
import { articleCardFragment, sessionCardFragment } from 'modules/queries'
import { distinctSessions } from 'modules/sessionUtil'

const Container = styled.div`
  flex: 1;
  max-width: 1300px;
  width: 100%;
  margin: 0 auto;
  padding: 0 4vw;

  @media (min-width: ${theme.medias.phablet}) {
    padding: 0 3vw;
  }

  @media (min-width: ${theme.medias.desktop}) {
    padding: 0 10vw;
  }
`

const ArticleHeader = styled.header`
  max-width: 1040px;
  margin: 0 auto;
  padding: 6vw 3vw 3vw;
  text-align: center;
`

const Metadata = styled.section`
  font-size: 14px;
  line-height: 16px;
  text-transform: uppercase;
  text-align: center;
  margin: 0 30px 8px;
`

const CreatedDate = styled.time``

const Article = styled.article`
  position: relative;
  margin: 0;
  padding: 0;
`

const Title = styled.h1`
  font-size: 30px;
  line-height: 36px;
  font-weight: 600;
  margin: 0 30px;
  text-align: center;

  @media (min-width: ${theme.medias.phablet}) {
    font-size: 50px;
    line-height: 60px;
  }
`

const FullImage = styled.figure`
  height: 350px;
  margin: 0 -4vw 0;
  background: ${theme.colors.primary} 50%;
  background-size: cover;
  background-image: url(${props => props.image});

  @media (min-width: ${theme.medias.phablet}) {
    height: 650px;
    margin: 0 -10vw -165px;
    border-radius: 3px;
  }
`

const Content = styled.section`
  position: relative;
  min-height: 230px;
  margin: 0 auto;
  padding: 0;
  font-family: Georgia, serif;
  font-size: 18px;
  line-height: 26px;
  background: #fff;

  .kg-card-markdown {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 920px;
  }

  dl,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  ol,
  p,
  pre,
  ul {
    min-width: 100%;
  }

  h2 {
    font-family: ${theme.fontFamilies.primary};
    font-size: 30px;
    line-height: 34px;
    margin: 20px 0 10px;
  }

  h3 {
    font-family: ${theme.fontFamilies.primary};
    font-size: 26px;
    line-height: 30px;
    margin: 16px 0 8px;
  }

  h4 {
    font-family: ${theme.fontFamilies.primary};
    font-size: 22px;
    line-height: 26px;
    margin: 16px 0 8px;
  }

  img {
    width: 100%;
    display: block;
    max-width: 1040px;
    margin: 30px auto;
    vertical-align: middle;
  }

  pre {
    max-width: 100%;
    overflow-x: auto;
    margin: 10px 0 20px;
    padding: 20px;
    border: 1px solid #000;
    color: #e5eff5;
    font-size: 16px;
    line-height: 20px;
    background: #0e0f11;
    border-radius: 3px;

    code {
      padding: 0;
      font-size: inherit;
      line-height: inherit;
      background: transparent;
      border-radius: 3px;
    }
  }

  a {
    color: ${theme.colors.primary};

    &:hover {
      text-decoration: unerline;
    }
  }

  blockquote {
    margin: 30px;
    text-align: center;
    font-size: 28px;
    line-height: 38px;
    font-style: italic;
    quotes: '“' '”';
  }

  blockquote:before {
    color: #ccc;
    content: open-quote;
    font-size: 70px;
    line-height: 0;
    margin-left: -22px;
    vertical-align: -28px;
  }

  blockquote p {
    display: inline;
  }

  @media (min-width: ${theme.medias.phablet}) {
    padding: 30px 50px 0;
    font-size: 21px;
    line-height: 28px;

    img {
      width: auto;
    }
  }

  @media (min-width: ${theme.medias.desktop}) {
    padding: 70px 100px 0;
  }
`

const Loader = styled.div`
  margin: 200px auto;
  text-align: center;
`

const Comments = styled.section`
  margin: 50px 0 100px;
`

const ArticleFooter = styled.footer`
  @media (min-width: ${theme.medias.phablet}) {
    padding: 30px 50px 0;
  }

  @media (min-width: ${theme.medias.desktop}) {
    padding: 70px 100px 0;
  }
`

const AuthorCardLink = styled(Link)`
  display: flex;
  align-items: center;
`

const AuthorImage = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 15px;
  border-radius: 50%;
  flex-shrink: 0;
`

const AuthorCardContent = styled.section``

const AuthorName = styled.h4`
  font-size: 20px;
  line-height: 24px;
  font-weight: 600;
  margin: 0 0 5px;
`

const AuthorBio = styled.p`
  margin: 0;
  color: #738a94;
  font-size: 13px;
  line-height: 18px;
  font-weight: 300;

  @media (min-width: ${theme.medias.phablet}) {
    font-size: 18px;
    line-height: 22px;
  }
`

const Trainings = styled.section`
  margin: 50px 0;
`

const TrainingsTitle = styled.h3`
  font-size: 30px;
  line-height: 36px;
  font-weight: 300;
`

const SessionCards = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  max-width: 980px;

  > * {
    margin-bottom: 40px;
  }
`

const CARD_QUERY = gql`
  query ($slug: ID!) {
    article(slug: $slug) {
      ...ArticleCard
    }
  }

  ${articleCardFragment}
`

const COMPLETE_QUERY = gql`
  query ($slug: ID!) {
    article(slug: $slug) {
      id
      slug
      title
      link
      feature_image {
        url
        width
        height
      }
      custom_excerpt
      html
      published_at
      updated_at
      meta_title
      meta_description
      og_title
      og_description
      twitter_title
      twitter_description
      author {
        slug
        name
        bio
        profile_image {
          url
          width
          height
        }
        twitter
        link
      }
      tags {
        slug
        name
      }
    }

    sessions {
      ...SessionCard
    }
  }

  ${sessionCardFragment}
`

const options = ({ match }) => ({ variables: { slug: match.params.slug } })

export default compose(
  graphql(CARD_QUERY, {
    name: 'cardData',
    options,
  }),
  graphql(COMPLETE_QUERY, {
    name: 'completeData',
    options,
  }),
)(
  ({
    cardData: { article: articleCard },
    completeData: { article, sessions },
  }) => (
    <PageContainer>
      {article && (
        <Helmet>
          <title>{article.meta_title || article.title}</title>
          <meta name="description" content={article.meta_description} />
          <meta property="og:type" content="article" />
          <meta
            property="og:title"
            content={article.og_title || article.meta_title || article.title}
          />
          <meta
            property="og:description"
            content={
              article.description ||
              article.meta_description ||
              article.custom_excerpt
            }
          />
          <meta property="og:image" content={article.feature_image.url} />
          <meta
            property="og:image:width"
            content={article.feature_image.width}
          />
          <meta
            property="og:image:height"
            content={article.feature_image.height}
          />
          <meta
            property="article:published_time"
            content={article.published_at}
          />
          <meta property="article:modified_time" content={article.updated_at} />
          {article.tags.map(tag => (
            <meta key={tag.name} property="article:tag" content={tag.name} />
          ))}
          <meta
            property="article:publisher"
            content="https://www.facebook.com/smoothcodetraining"
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content={
              article.twitter_title ||
              article.og_title ||
              article.meta_title ||
              article.title
            }
          />
          <meta
            name="twitter:description"
            content={
              article.twitter_description ||
              article.og_description ||
              article.meta_description ||
              article.custom_excerpt
            }
          />
          <meta name="twitter:image" content={article.feature_image.url} />
          <meta name="twitter:site" content="@smooth_code" />
          <meta name="twitter:creator" content={article.author.twitter} />
          <script async defer src="/prism/prism.js" />
          <link rel="stylesheet" href="/prism/prism.css" />
        </Helmet>
      )}
      <Header />
      <Container>
        <Article>
          {articleCard && (
            <ArticleHeader>
              <Metadata>
                <CreatedDate
                  datetime={moment(articleCard.published_at).format(
                    'YYYY-MM-DD',
                  )}
                >
                  {moment(articleCard.published_at).format('DD MMMM YYYY')} /{' '}
                  {articleCard.tags[0].name}
                </CreatedDate>
              </Metadata>
              <Title>{articleCard.title}</Title>
            </ArticleHeader>
          )}
          {articleCard && <FullImage image={articleCard.feature_image.url} />}
          {article ? (
            <Content dangerouslySetInnerHTML={{ __html: article.html }} />
          ) : (
            <Loader>
              <Spinner className="la-dark" />
            </Loader>
          )}
          {article && (
            <ArticleFooter>
              <AuthorCardLink to={article.author.link}>
                <AuthorImage src={article.author.profile_image.url} />
                <AuthorCardContent>
                  <AuthorName>{article.author.name}</AuthorName>
                  <AuthorBio>{article.author.bio}</AuthorBio>
                </AuthorCardContent>
              </AuthorCardLink>
            </ArticleFooter>
          )}
        </Article>
        {sessions && (
          <Trainings>
            <TrainingsTitle>Découvrez nos formations</TrainingsTitle>
            <SessionCards>
              {sessions &&
                distinctSessions(sessions)
                  .slice(0, 4)
                  .map(session => (
                    <SessionCard key={session.id} session={session} />
                  ))}
            </SessionCards>
          </Trainings>
        )}
        {articleCard && (
          <Comments>
            <Disqus
              url={completeUrl(articleCard.link)}
              pageIdentifier={`ghost-${articleCard.id}`}
            />
          </Comments>
        )}
      </Container>
      <Footer />
      {article && (
        <JsonLd>
          {{
            '@context': 'https://schema.org',
            '@type': 'Article',
            publisher: {
              '@type': 'Organization',
              name: 'Smooth Code',
              logo: {
                '@type': 'ImageObject',
                url: clUrl('bukcynjufd4tepjtpsgp', 'c_scale,w_473,h_60'),
                width: 473,
                height: 60,
              },
            },
            author: {
              '@type': 'Person',
              name: article.author.name,
              image: {
                '@type': 'ImageObject',
                url: article.author.profile_image.url,
                width: article.author.profile_image.width,
                height: article.author.profile_image.height,
              },
              url: completeUrl(article.author.link),
              sameAs: [
                `https://twitter.com/${article.author.twitter.replace(
                  /^@/,
                  '',
                )}`,
              ],
            },
            headline: article.meta_title || article.title,
            url: completeUrl(article.link),
            datePublished: article.published_at,
            dateModified: article.updated_at,
            image: {
              '@type': 'ImageObject',
              url: article.feature_image.url,
              width: article.feature_image.width,
              height: article.feature_image.height,
            },
            keywords: article.tags.map(({ name }) => name).join(', '),
            description: article.meta_description || article.custom_excerpt,
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://www.smooth-code.com/',
            },
          }}
        </JsonLd>
      )}
    </PageContainer>
  ),
)
