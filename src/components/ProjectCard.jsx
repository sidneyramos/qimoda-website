import React from "react"
import Link from "components/_ui/Link"
import RichText from "prismic-reactjs/src/Component"
import styled from "@emotion/styled"
import dimensions from "styles/dimensions"
import colors from "styles/colors"
import PropTypes from "prop-types"
import techHighlight from "images/qimoda/icons/tech-minimal-highlight.svg"
import uxHighlight from "images/qimoda/icons/ux-minimal-highlight.svg"
import communityHighlight from "images/qimoda/icons/community-minimal-highlight.svg"
import contentHighlight from "images/qimoda/icons/content-minimal-highlight.svg"
import tech from "images/qimoda/icons/tech-minimal-light.svg"
import ux from "images/qimoda/icons/ux-minimal-light.svg"
import community from "images/qimoda/icons/community-minimal-light.svg"
import content from "images/qimoda/icons/content-minimal-light.svg"

import Flex from "@chakra-ui/core/dist/Flex"
import PseudoBox from "@chakra-ui/core/dist/PseudoBox"
import Img from "gatsby-image"
import LazyLoad from "react-lazyload"

const ProjectCardContainer = styled(Link)`
  display: grid;
  grid-template-columns: 4fr 7fr;
  box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.06);
  margin-bottom: 4em;
  transition: all 150ms ease-in-out;
  text-decoration: none;
  color: currentColor;

  @media (max-width: 950px) {
    grid-template-columns: 4.5fr 7fr;
  }

  @media (max-width: ${dimensions.maxwidthTablet}px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: ${dimensions.maxwidthMobile}px) {
    margin-bottom: 2em;
  }

  &:hover {
    box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.1);
    transition: all 150ms ease-in-out;
    color: initial;

    .ProjectCardAction {
      transition: all 150ms ease-in-out;

      p {
        color: body;

        &:after {
          transform: translate(0);
          opacity: 0.25;
        }
      }

      span {
        transform: translateX(0px);
        opacity: 1;
        transition: transform 150ms ease-in-out;
      }
    }

    .ProjectCardContent::before {
      opacity: 0.02;
      transition: all 150ms ease-in-out;
    }

    .ProjectCardImageContainer::before {
      opacity: 0.2;
      transition: all 150ms ease-in-out;
    }
  }
`

const ProjectCardContent = styled("div")`
  background: white;
  padding: 3em 3em 2.25em 3em;
  position: relative;

  &:before {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: ${colors.teal300};
    mix-blend-mode: multiply;
    opacity: 0;
    transition: all 150ms ease-in-out;
  }

  @media (max-width: 950px) {
    padding: 3.25em 2.5em 2em 2.5em;
  }

  @media (max-width: ${dimensions.maxwidthTablet}px) {
    grid-row: 2;
  }
`

const ProjectCardCategory = styled(Flex)`
  color: ${colors.grey600};
  margin-bottom: 0.5em;
`

const ProjectCardTitle = styled("h3")`
  margin-bottom: 0.5em;
  margin-top: 0;
  font-size: 35px;
`

const ProjectCardBlurb = styled("div")`
  margin-top: 0.5em;
  margin-bottom: 1.5em;
  font-size: 14px;

  @media (max-width: ${dimensions.maxwidthTablet}px) {
    margin-bottom: 2.5em;
  }
`

const ProjectCardAction = styled("div")`
  font-weight: 600;
  text-decoration: none;
  color: currentColor;
  transition: all 150ms ease-in-out;
  position: relative;

  p {
    display: inline-block;
    position: relative;
    z-index: 1;

    &:after {
      z-index: -1;
      content: "";
      display: block;
      position: absolute;
      height: 50%;
      width: 100%;
      transform: translateX(-15px);
      opacity: 0;
      background-color: ${colors.qimodaLight};
      bottom: 0;
      right: 0;
      transition: 0.5s;
    }
  }

  span {
    margin-left: 1em;
    transform: translateX(-8px);
    display: inline-block;
    transition: transform 400ms ease-in-out;
  }
`

const ProjectCardImageContainer = styled("div")`
  background: ${colors.grey200};
  display: flex;
  justify-content: center;
  align-items: flex-end;
  overflow: hidden;
  position: relative;
  padding-left: 2em;
  padding-right: 2em;

  @media (max-width: ${dimensions.maxwidthTablet}px) {
    padding-top: 3em;
    max-height: 200px;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }

  &:before {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: ${colors.teal300};
    mix-blend-mode: multiply;
    opacity: 0;
    transition: all 150ms ease-in-out;
  }

  .gatsby-image-wrapper,
  img {
    max-width: 400px;
    width: 100%;
    box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.04);

    @media (max-width: ${dimensions.maxwidthTablet}px) {
      max-width: 300px;
    }
  }
`

const ProjectCategoryIcon = styled(PseudoBox)`
  // height: 50px;
  // width: 50px;
  background-repeat: no-repeat;
  background-size: 50px 45px;
  background-position: 50% 0;

  position: relative;
  width: 60px;
  height: 34.64px;
  margin: 17.32px 0;

  &:before,
  &:after {
    content: "";
    position: absolute;
    width: 0;
    border-left: 30px solid transparent;
    border-right: 30px solid transparent;
  }

  &:before {
    bottom: 100%;
  }

  &:after {
    top: 100%;
    width: 0;
  }
`

const ProjectCard = ({ category, title, description, thumbnailSharp, uid }) => (
  <ProjectCardContainer to={`/work/${uid}`}>
    <ProjectCardContent className="ProjectCardContent">
      <ProjectCardTitle>{title[0].text}</ProjectCardTitle>
      <ProjectCardBlurb>{RichText.render(description)}</ProjectCardBlurb>
      <ProjectCardCategory justifyContent="space-between">
        <ProjectCategoryIcon
          backgroundColor={
            category[0].text.toLowerCase().includes("tech")
              ? colors.qimodaDark
              : colors.qimodaLightGray
          }
          backgroundImage={`url(${tech})`}
          _before={{
            borderBottom: category[0].text.toLowerCase().includes("tech")
              ? `17.32px solid ${colors.qimodaDark}`
              : `17.32px solid ${colors.qimodaLightGray}`,
          }}
          _after={{
            borderTop: category[0].text.toLowerCase().includes("tech")
              ? `17.32px solid ${colors.qimodaDark}`
              : `17.32px solid ${colors.qimodaLightGray}`,
          }}
          alt="Tech"
        />
        <ProjectCategoryIcon
          backgroundColor={
            category[0].text.toLowerCase().includes("ux")
              ? colors.qimodaDark
              : colors.qimodaLightGray
          }
          backgroundImage={`url(${ux})`}
          _before={{
            borderBottom: category[0].text.toLowerCase().includes("ux")
              ? `17.32px solid ${colors.qimodaDark}`
              : `17.32px solid ${colors.qimodaLightGray}`,
          }}
          _after={{
            borderTop: category[0].text.toLowerCase().includes("ux")
              ? `17.32px solid ${colors.qimodaDark}`
              : `17.32px solid ${colors.qimodaLightGray}`,
          }}
          alt="UX"
        />
        <ProjectCategoryIcon
          backgroundColor={
            category[0].text.toLowerCase().includes("community")
              ? colors.qimodaDark
              : colors.qimodaLightGray
          }
          backgroundImage={`url(${community})`}
          _before={{
            borderBottom: category[0].text.toLowerCase().includes("community")
              ? `17.32px solid ${colors.qimodaDark}`
              : `17.32px solid ${colors.qimodaLightGray}`,
          }}
          _after={{
            borderTop: category[0].text.toLowerCase().includes("community")
              ? `17.32px solid ${colors.qimodaDark}`
              : `17.32px solid ${colors.qimodaLightGray}`,
          }}
          alt="Community"
        />
        <ProjectCategoryIcon
          backgroundColor={
            category[0].text.toLowerCase().includes("content")
              ? colors.qimodaDark
              : colors.qimodaLightGray
          }
          backgroundImage={`url(${content})`}
          _before={{
            borderBottom: category[0].text.toLowerCase().includes("content")
              ? `17.32px solid ${colors.qimodaDark}`
              : `17.32px solid ${colors.qimodaLightGray}`,
          }}
          _after={{
            borderTop: category[0].text.toLowerCase().includes("content")
              ? `17.32px solid ${colors.qimodaDark}`
              : `17.32px solid ${colors.qimodaLightGray}`,
          }}
          fill="blue"
          alt="Content"
        />
      </ProjectCardCategory>
      <ProjectCardAction className="ProjectCardAction">
        <p>DETAILS</p> <span>&#8594;</span>
      </ProjectCardAction>
    </ProjectCardContent>
    <ProjectCardImageContainer className="ProjectCardImageContainer">
      <LazyLoad once offset={50}>
        <Img fluid={thumbnailSharp.childImageSharp.fluid} alt={title[0].text} />
      </LazyLoad>
    </ProjectCardImageContainer>
  </ProjectCardContainer>
)

export default ProjectCard

ProjectCard.propTypes = {
  category: PropTypes.array.isRequired,
  thumbnailSharp: PropTypes.object.isRequired,
  title: PropTypes.array.isRequired,
  description: PropTypes.array.isRequired,
  uid: PropTypes.string.isRequired,
}
