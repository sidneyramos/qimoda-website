import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { RichText } from "prismic-reactjs"
import { graphql } from "gatsby"
import styled from "@emotion/styled"
import colors from "styles/colors"
import dimensions from "styles/dimensions"
import Button from "components/_ui/Button"
import About from "components/About"
import Layout from "components/Layout"
import Link from "components/_ui/Link"
import ProjectCard from "components/ProjectCard"
import qimoda from "images/qimoda/5.svg"

const Hero = styled("div")`
  padding-top: 2.5em;
  padding-bottom: 3em;
  margin: 0 auto;
  margin-bottom: 6em;
  text-align: right;

  @media (max-width: ${dimensions.maxwidthMobile}px) {
    margin-bottom: 3em;
  }

  h1 {
    margin: 0;
    font-weight: 400;
    font-family: "Rubik Mono One", -apple-system, BlinkMacSystemFont, Helvetica,
      sans-serif;
    font-size: 4rem;
    line-height: 1.1;
    color: ${colors.qimodaDarker};

    em {
      text-decoration: line-through;
      color: ${colors.red500};

      &:hover {
        cursor: pointer;
        transition: all 100ms ease-in-out;
        color: ${colors.red600};
        background-color: ${colors.red200};
      }
    }

    &:last-of-type {
      margin-top: 0.25em;
      margin-bottom: 1.25em;

      @media (max-width: ${dimensions.maxwidthMobile}px) {
        margin-top: 1em;
        margin-bottom: 1em;
      }
    }

    a,
    strong {
      text-decoration: none;
      transition: all 100ms ease-in-out;
      font-weight: 500;
    }

    &:nth-of-type(1) {
      text-align: left;

      @media (max-width: ${dimensions.maxwidthTablet}px) {
        font-size: 1.9rem;
        margin-bottom: 1.5em;
      }

      a,
      strong {
        white-space: pre;
        color: ${colors.qimodaLight};
        position: relative;

        &:after {
          z-index: -1;
          content: "";
          display: block;
          position: absolute;
          height: calc(50% - 10px);
          width: calc(100%);
          opacity: 0.25;
          background-color: ${colors.qimodaLight};
          bottom: 10px;
          right: 0;

          @media (max-width: ${dimensions.maxwidthTablet}px) {
            height: calc(70% - 10px);
            bottom: 5px;
          }
        }
      }
    }

    &:nth-of-type(2) {
      text-align: right;

      @media (max-width: ${dimensions.maxwidthTablet}px) {
        font-size: 1.9rem;
      }

      a,
      strong {
        white-space: pre;
        color: ${colors.qimodaLight};
        position: relative;

        &:after {
          z-index: -1;
          content: "";
          display: block;
          position: absolute;
          height: calc(50% - 10px);
          width: calc(100%);
          opacity: 0.25;
          background-color: ${colors.qimodaLight};
          bottom: 10px;
          right: 0;

          @media (max-width: ${dimensions.maxwidthTablet}px) {
            height: calc(70% - 10px);
            bottom: 5px;
          }
        }
      }
    }

    &:nth-of-type(3) {
      text-align: right;

      @media (max-width: ${dimensions.maxwidthTablet}px) {
        font-size: 1.9rem;
      }

      a,
      strong {
        white-space: pre;
        color: ${colors.qimodaLight};
      }
    }

    &:nth-of-type(4) {
      text-align: right;
      position: relative;

      @media (max-width: ${dimensions.maxwidthTablet}px) {
        font-size: 1.9rem;
      }

      a,
      strong {
        white-space: pre;
        color: ${colors.qimodaLight};
        // animation-name: flash;
        // animation-duration: 3s;
        // animation-iteration-count: infinite;
        // animation-timing-function: linear;
        position: relative;

        &:after {
          z-index: -1;
          content: "";
          display: block;
          position: absolute;
          height: calc(50% - 10px);
          width: calc(100%);
          opacity: 0.25;
          background-color: ${colors.qimodaLight};
          bottom: 10px;
          right: 0;

          @media (max-width: ${dimensions.maxwidthTablet}px) {
            height: calc(70% - 10px);
            bottom: 5px;
          }
        }
      }

      &:before {
          content: "";
          width: 10px;
          height: 21px;
          position: absolute;
          bottom: calc(-0.25em + 5px);
          right: 0;

          background-image: url('${qimoda}');
          background-size: cover;
          animation-name: flash;
          animation-duration: 3s;
          animation-iteration-count: infinite;
          animation-timing-function: linear;

          @media (max-width: ${dimensions.maxwidthTablet}px) {
            bottom: calc(-0.25em - 2px);
          }
        }

        &:after {
          content: "";
          display: block;
          height: 5px;
          width: calc(100% - 20px);
          background-color: black;
          margin-top: 0.25em;
          margin-bottom: 0.25em;
        }
    }

    &:last-of-type {
      font-family: "Rubik", -apple-system, BlinkMacSystemFont, Helvetica,
        sans-serif;
      font-size: 24px;
      text-align: right;
      color: ${colors.qimodaGray};

      @media (max-width: ${dimensions.maxwidthTablet}px) {
        font-size: 1.15rem;
      }
    }
  }
`

const Section = styled("div")`
  margin-bottom: 6em;
  display: flex;
  flex-direction: column;

  @media (max-width: ${dimensions.maxwidthTablet}px) {
    margin-bottom: 4em;
  }

  &:last-of-type {
    margin-bottom: 0;
  }
`

const WorkAction = styled(Link)`
  font-weight: 600;
  text-decoration: none;
  color: currentColor;
  transition: all 150ms ease-in-out;
  margin-left: auto;

  @media (max-width: ${dimensions.maxwidthTablet}px) {
    margin: 0 auto;
  }

  span {
    margin-left: 1em;
    transform: translateX(-8px);
    display: inline-block;
    transition: transform 400ms ease-in-out;
  }

  &:hover {
    color: ${colors.teal600};
    transition: all 150ms ease-in-out;

    span {
      transform: translateX(0px);
      opacity: 1;
      transition: transform 150ms ease-in-out;
    }
  }
`

const RenderBody = ({ home, projects, meta, posts }) => (
  <>
    <Helmet
      title={meta.title}
      titleTemplate={`%s`}
      meta={[
        {
          name: `description`,
          content: meta.description,
        },
        {
          property: `og:title`,
          content: meta.title,
        },
        {
          property: `og:description`,
          content: meta.description,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: meta.author,
        },
        {
          name: `twitter:title`,
          content: meta.title,
        },
        {
          name: `twitter:description`,
          content: meta.description,
        },
      ].concat(meta)}
    />
    <Hero>
      <>{RichText.render(home.hero_title)}</>
      <a
        href={home.hero_button_link.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button>{RichText.render(home.hero_button_text)}</Button>
      </a>
    </Hero>
    <Section>
      {projects.map((project, i) => (
        <ProjectCard
          key={i}
          category={project.node.project_category}
          title={project.node.project_title}
          description={project.node.project_preview_description}
          thumbnail={project.node.project_preview_thumbnail}
          uid={project.node._meta.uid}
        />
      ))}
      <WorkAction to={"/work"}>
        See more work <span>&#8594;</span>
      </WorkAction>
    </Section>
    <Section>
      <About
        title={home.about_title}
        bio={home.about_bio}
        socialLinks={home.about_links}
        posts={posts}
      />
    </Section>
  </>
)

export default ({ data }) => {
  //Required check for no data being returned
  const doc = data.prismic.allHomepages.edges.slice(0, 1).pop()
  const projects = data.prismic.allProjects.edges
  const meta = data.site.siteMetadata
  const posts = data.prismic.allPosts.edges

  if (!doc || !projects) return null

  return (
    <Layout>
      <RenderBody
        home={doc.node}
        projects={projects}
        meta={meta}
        posts={posts}
      />
    </Layout>
  )
}

RenderBody.propTypes = {
  home: PropTypes.object.isRequired,
  projects: PropTypes.array.isRequired,
  posts: PropTypes.array.isRequired,
  meta: PropTypes.object.isRequired,
}

export const query = graphql`
  {
    prismic {
      allHomepages {
        edges {
          node {
            hero_title
            hero_button_text
            hero_button_link {
              ... on PRISMIC__ExternalLink {
                _linkType
                url
              }
            }
            content
            about_title
            about_bio
            about_links {
              about_link
            }
          }
        }
      }
      allProjects {
        edges {
          node {
            project_title
            project_preview_description
            project_preview_thumbnail
            project_category
            project_post_date
            _meta {
              uid
            }
          }
        }
      }
      allPosts(sortBy: post_date_DESC, first: 1) {
        edges {
          node {
            post_title
            post_date
            post_category
            post_preview_description
            post_author
            _meta {
              uid
            }
          }
        }
      }
    }
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`
