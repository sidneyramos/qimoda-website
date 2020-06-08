import React from "react"
import Logo from "components/_ui/Logo"
import styled from "@emotion/styled"
import dimensions from "styles/dimensions"
import colors from "styles/colors"
import RichText from "prismic-reactjs/src/Component"
import PropTypes from "prop-types"
import qimoda from "images/qimoda/5.svg"
import tech from "images/qimoda/icons/tech-minimal-light.svg"
import ux from "images/qimoda/icons/ux-minimal-light.svg"
import community from "images/qimoda/icons/community-minimal-light.svg"
import content from "images/qimoda/icons/content-minimal-light.svg"
import PostCard from "components/PostCard"
import Box from "@chakra-ui/core/dist/Box"

const AboutContainer = styled("div")`
  padding-top: 1em;
  display: grid;
  grid-template-columns: 9em 1fr 15em;
  grid-gap: 2em;

  @media (max-width: ${dimensions.maxwidthTablet}px) {
    grid-template-columns: 1fr 3fr 1fr;
  }

  @media (max-width: ${dimensions.maxwidthMobile}px) {
    display: block;
  }
`

const AboutLinkContainer = styled("div")`
  padding-top: 1em;
  display: flex;
  flex-direction: column;

  @media (max-width: ${dimensions.maxwidthMobile}px) {
    grid-row: 2;
  }
`

const AboutLink = styled("a")`
  margin-bottom: 1.5em;
  font-weight: 600;
  line-height: 1.9;
  text-decoration: none;
  color: currentColor;
  display: flex;
  align-items: center;
  text-transform: uppercase;

  span {
    margin-left: 1em;
    transform: translateX(-8px);
    display: inline-block;
    opacity: 0;
    transition: all 400ms ease-in-out;
    flex: 1;
  }

  p {
    margin: 0;
    position: relative;

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

  &:hover {
    color: currentColor;

    span {
      transform: translateX(0px);
      opacity: 1;
      transition: all 150ms ease-in-out;
    }

    p {
      &:after {
        opacity: 0.25;
        transform: translateX(0);
      }
    }
  }
`

const AboutBio = styled("div")`
  padding-bottom: 3em;
  max-width: 480px;

  @media (max-width: ${dimensions.maxwidthMobile}px) {
    grid-row: 2;
  }

  ul {
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;

    li {
      flex: 1 1 calc(50% - 10px);
      background-color: ${colors.teal200};
      margin: 5px;
      font-size: 14px;
      overflow: hidden;

      @media (max-width: ${dimensions.maxwidthTablet + 200}px) {
        flex: 1 1 100%;
      }

      &:before {
        background-color: ${colors.qimodaDark};
        background-image: initial;
        animation: none;
        height: 150px;
        width: 100%;
        margin: 0 auto;
        position: initial;
        margin-bottom: 10px;
        background-size: 140px 140px;
        background-position: 50% 20px;
        background-repeat: no-repeat;
      }

      &:after {
        content: "";
        position: absolute;
        display: block;
        top: 10px;
        bottom: initial;
        right: 10px;
        left: initial;
        width: 10px;
        height: 21px;
        background-image: url('${qimoda}');
        background-size: cover;
        animation-name: flash;
        animation-duration: 3s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
      }

      a,
      strong {
        text-transform: uppercase;
        
        &:first-of-type {
          width: 100%;
          padding: 0 20px;
          font-size: 12px;
          display: block;
          text-align: center;
          font-weight: 700;
          // font-family: "Rubik Mono One";
          margin: 0 auto;
          margin-bottom: 10px;
          color: ${colors.qimodaDarker}
        }
      }

      &:nth-of-type(1) {
        &:before {
          background-image: url(${tech});
        }
      }

      &:nth-of-type(2) {
        &:before {
          background-image: url(${ux});
        }
      }
      &:nth-of-type(3) {
        &:before {
          background-image: url(${community});
        }
      }

      &:nth-of-type(4) {
        &:before {
          background-image: url(${content});
        }
      }
    }
  }
`

const AboutActions = styled("div")`
  padding-top: 1em;
  // padding-bottom: 3em;

  @media (max-width: ${dimensions.maxwidthMobile}px) {
    padding: 0;
    grid-column: 1 / -1;
    grid-row: 1;
  }
`

const AboutTitle = styled(Box)`
  * {
    text-transform: uppercase;
    font-family: Rubik;
    display: inline-block;
    position: relative;

    &:after {
      z-index: -1;
      content: "";
      display: block;
      position: absolute;
      height: 50%;
      width: 100%;
      opacity: 0.25;
      background-color: ${colors.qimodaLight};
      bottom: 0;
      right: 0;

      @media (max-width: ${dimensions.maxwidthTablet}px) {
        height: calc(45%);
      }
    }
  }
`

const About = ({ title, bio, socialLinks, posts }) => (
  <>
    <AboutTitle>{RichText.render(title)}</AboutTitle>
    <AboutContainer>
      <AboutLinkContainer>
        {socialLinks.map((social, i) => (
          <AboutLink
            key={i}
            href={social.about_link[0].spans[0].data.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Logo hideHeading />
            <p>{social.about_link[0].text}</p>
            <span>&#8594;</span>
          </AboutLink>
        ))}
      </AboutLinkContainer>
      <AboutBio>{RichText.render(bio)}</AboutBio>
      <AboutActions>
        {posts.map((post, i) => (
          <PostCard
            isSmall
            key={i}
            author={post.node.post_author}
            category={post.node.post_category}
            title={post.node.post_title}
            date={post.node.post_date}
            description={post.node.post_preview_description}
            uid={post.node._meta.uid}
          />
        ))}
      </AboutActions>
    </AboutContainer>
  </>
)

export default About
