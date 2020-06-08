import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import styled from "@emotion/styled"
import colors from "styles/colors"
import Link from "components/_ui/Link"
import { graphql } from "gatsby"
import RichText from "prismic-reactjs/src/Component"
import Button from "components/_ui/Button"
import Layout from "components/Layout"
import Logo from "components/_ui/Logo"
import Img from "gatsby-image"

const ProjectHeroContainer = styled("div")`
  background: ${colors.grey200};
  display: flex;
  justify-content: center;
  align-items: flex-end;
  overflow: hidden;
  position: relative;
  padding-top: 2.25em;
  margin-bottom: 3.5em;

  .gatsby-image-wrapper {
    width: 60%;
    max-width: 600px;
  }
`

const ProjectTitle = styled("div")`
  max-width: 550px;
  margin: 0 auto;
  text-align: center;
`

const ProjectBody = styled("div")`
  max-width: 550px;
  margin: 0 auto;

  .block-img {
    margin-top: 3.5em;
    margin-bottom: 0.5em;

    img {
      width: 100%;
    }
  }
`

const WorkLink = styled(Link)`
  margin-top: 3em;
  display: block;
  text-align: center;
  text-decoration: none;
`

const Project = ({ project, meta }) => {
  return (
    <>
      <Helmet
        title={`${project.project_title[0].text} | Qimoda`}
        titleTemplate={`%s`}
        meta={[
          {
            name: `description`,
            content: meta.description,
          },
          {
            property: `og:title`,
            content: `${project.project_title[0].text} | Qimoda`,
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
      <Layout>
        <ProjectTitle>{RichText.render(project.project_title)}</ProjectTitle>
        {project.project_hero_image && (
          <ProjectHeroContainer>
            <Img
              fluid={project.project_hero_imageSharp.childImageSharp.fluid}
              alt={project.project_hero_image.alt}
            />
          </ProjectHeroContainer>
        )}
        <ProjectBody>
          {RichText.render(project.project_description)}
          <Logo hideHeading />
          <WorkLink to={"/work"}>
            <Button className="Button--secondary">See other work</Button>
          </WorkLink>
        </ProjectBody>
      </Layout>
    </>
  )
}

export default ({ data }) => {
  const projectContent = data.prismic.allProjects.edges[0].node
  const meta = data.site.siteMetadata

  return <Project project={projectContent} meta={meta} />
}

export const query = graphql`
  query ProjectQuery($uid: String) {
    prismic {
      allProjects(uid: $uid) {
        edges {
          node {
            project_title
            project_preview_description
            project_preview_thumbnail
            project_category
            project_post_date
            project_hero_image
            project_hero_imageSharp {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            project_description
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
