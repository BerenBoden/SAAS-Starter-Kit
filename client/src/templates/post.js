import React from 'react';
import { graphql } from 'gatsby';
import styled, { keyframes } from 'styled-components';
import moment from 'moment';
import { colors, breakpoints } from '../styles/theme';
import SliceZone from './sliceZone';
import Disqus from '../services/disqus';
import { BaseCard } from '../screens/Marketing/Blog/cards';
import RelatedArticles from '../screens/Marketing/Blog/relatedArticles';
import TagsSection from '../screens/Marketing/Blog/tagsSection';

const Wrapper1 = styled.div`
  background-color: ${colors.alabaster2};
  padding: 2rem 0 4rem;
`;

const Wrapper2 = styled.div`
  max-width: ${breakpoints.large};
  margin-left: auto;
  margin-right: auto;
  padding: 2rem;
`;

const fadeInDown = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(0,-20%,0);
  }
  100% {
    opacity: 1;
    transform: translateZ(0);
  }
`;

const TitleWrapper = styled.div`
  padding: 0 0.6rem;

  animation-name: ${fadeInDown};
  animation-duration: 1000ms;
  animation-delay: 0ms;
  animation-iteration-count: 1;
  opacity: 1;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: ${colors.gray800};
  line-height: 1.3;
  font-weight: 900;
`;

const Subtitle = styled.div`
  color: ${colors.slateGray};
  font-size: 1rem;
  font-weight: normal;
  padding-bottom: 2rem;
`;

const Bold = styled.span`
  font-weight: bold;
`;

const CardContentWrapper = styled.div`
  padding: 2rem;
`;

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(0,20%,0);
  }

  100% {
    opacity: 1;
    transform: translateZ(0);
  }
`;

const ContentWrapper = styled.div`
  display: flex;

  animation-name: ${fadeInUp};
  animation-duration: 1000ms;
  animation-delay: 0ms;
  animation-iteration-count: 1;
  opacity: 1;
`;

const FirstColumn = styled.div`
  flex-basis: 66%;
  @media (max-width: ${breakpoints.medium}) {
    flex-basis: 100%;
  }
`;

const SecondColumn = styled.div`
  padding-left: 3rem;
  flex-basis: 33%;
  @media (max-width: ${breakpoints.medium}) {
    display: none;
  }
`;

const Post = ({ data }) => {
  const author = data.prismicPost.data.author.text;
  const date = moment(data.prismicPost.data.date).format('MMM Do YY');
  const title = data.prismicPost.data.title.text;
  const hero_image = data.prismicPost.data.hero_image;
  const body = data.prismicPost.data.body;

  const pageUid = data.prismicPost.uid;
  const siteUrl = data.site.siteMetadata.siteUrl;

  const tags = data.prismicPost.tags;
  const related_article1 = data.prismicPost.data.related_article1;
  const related_article2 = data.prismicPost.data.related_article2;
  const related_articles = [related_article1, related_article2];

  return (
    <Wrapper1>
      <Wrapper2>
        <TitleWrapper>
          <Title>{title}</Title>
          <Subtitle>
            By <Bold>{author}</Bold> ・ {date}
          </Subtitle>
        </TitleWrapper>
        <ContentWrapper>
          <FirstColumn>
            <BaseCard>
              <img src={hero_image.thumbnails.desktop.url} />
              <CardContentWrapper>
                <SliceZone body={body} />
                <Disqus url={`${siteUrl + '/' + pageUid}`} identifier={pageUid} title={title} />
              </CardContentWrapper>
            </BaseCard>
          </FirstColumn>
          <SecondColumn>
            <RelatedArticles articles={related_articles} />
            <TagsSection tags={tags} />
          </SecondColumn>
        </ContentWrapper>
      </Wrapper2>
    </Wrapper1>
  );
};

export default Post;

export const pageQuery = graphql`
  query PostBySlug($uid: String!) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    prismicPost(uid: { eq: $uid }) {
      uid
      tags
      data {
        title {
          text
        }
        date
        author {
          text
        }
        hero_image {
          thumbnails {
            Table {
              alt
              url
            }
            desktop {
              alt
              url
            }
            mobile {
              alt
              url
            }
            thumbnail {
              alt
              url
            }
          }
        }
        related_article1 {
          document {
            ... on PrismicPost {
              id
              data {
                hero_image {
                  alt
                  url
                }
                title {
                  text
                }
                date
              }
            }
          }
          tags
        }
        related_article2 {
          document {
            ... on PrismicPost {
              id
              data {
                hero_image {
                  alt
                  url
                }
                title {
                  text
                }
                date
              }
            }
          }
          tags
        }
        body {
          ... on PrismicPostBodyCode {
            id
            slice_type
            primary {
              code {
                text
              }
            }
          }
          ... on PrismicPostBodyContent {
            id
            primary {
              content {
                html
              }
            }
            slice_type
          }
          ... on PrismicPostBodyQuote {
            id
            primary {
              quote {
                text
              }
            }
            slice_type
          }
          ... on PrismicPostBodyFullwidthimage {
            id
            primary {
              image {
                thumbnails {
                  desktop {
                    url
                    alt
                  }
                  mobile {
                    alt
                    url
                  }
                }
              }
            }
            slice_type
          }
        }
      }
    }
  }
`;
