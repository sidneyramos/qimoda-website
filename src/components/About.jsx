import React from "react"
import Button from "components/_ui/Button"
import Logo from "components/_ui/Logo"
import styled from "@emotion/styled"
import dimensions from "styles/dimensions"
import colors from "styles/colors"
import { RichText } from "prismic-reactjs"
import PropTypes from "prop-types"
import qimoda from "images/qimoda/5.svg"
import tech from "images/qimoda/icons/tech.svg"
import ux from "images/qimoda/icons/ux.svg"
import community from "images/qimoda/icons/community.svg"
import content from "images/qimoda/icons/content.svg"
import PostCard from "components/PostCard"

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
  }

  &:hover {
    span {
      transform: translateX(0px);
      opacity: 1;
      transition: all 150ms ease-in-out;
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

    li {
      margin-bottom: 15px;
      text-align: justify;

      font-size: 14px;
      border: 1px solid ${colors.grey200};
      padding: 2.25em 2.5em 2.25em 11em;
      border-radius: 5px;
      box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.06);
      overflow: hidden;

      &:before {
        background-image: initial;
        animation: none;
        left: 27px;
        top: 50%;
        transform: translateY(-50%);
        height: 100px;
        width: 100px;
      }

      &:after {
        content: "";
        position: absolute;
        display: block;
        top: initial;
        bottom: 15px;
        right: 15px;
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

      &:hover {
        box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.1);
        transition: all 150ms ease-in-out;
        cursor: pointer;
      }

      a,
      strong {
        &:first-of-type {
          font-size: 18px;
          transform: translateX(-5px);
          text-align: left;
          padding-left: 5px;
          padding-right: 5px;
          margin-bottom: 10px;
          display: inline-block;
          // border-bottom: 1px solid;
          // width: 100%;
        }
      }

      &:nth-of-type(1) {
        &:before {
          background-image: url(${tech});
        }

        a,
        strong {
          transition: all 100ms ease-in-out;

          &:first-of-type {
            color: ${colors.teal600};
          }
        }

        &:hover {
          a,
          strong {
            &:first-of-type {
              color: ${colors.teal600};
              background-color: ${colors.teal200};
            }
          }
        }
      }

      &:nth-of-type(2) {
        &:before {
          background-image: url(${ux});
        }

        a,
        strong {
          transition: all 100ms ease-in-out;

          &:first-of-type {
            color: ${colors.blue600};
          }
        }

        &:hover {
          a,
          strong {
            &:first-of-type {
              color: ${colors.blue600};
              background-color: ${colors.blue200};
            }
          }
        }
      }
      &:nth-of-type(3) {
        &:before {
          background-image: url(${community});
        }

        a,
        strong {
          transition: all 100ms ease-in-out;

          &:first-of-type {
            color: ${colors.gold600};
          }
        }

        &:hover {
          a,
          strong {
            &:first-of-type {
              color: ${colors.gold600};
              background-color: ${colors.gold200};
            }
          }
        }
      }

      &:nth-of-type(4) {
        &:before {
          background-image: url(${content});
        }
        
        a,
        strong {
          transition: all 100ms ease-in-out;

          &:first-of-type {
            color: ${colors.red600};
          }
        }

        &:hover {
          a,
          strong {
            &:first-of-type {
              color: ${colors.red600};
              background-color: ${colors.red200};
            }
          }
        }
      }

      &:nth-of-type(5) {
        a,
        strong {
          transition: all 100ms ease-in-out;

          &:first-of-type {
            color: ${colors.green600};
          }
        }

        &:hover {
          a,
          strong {
            &:first-of-type {
              color: ${colors.green600};
              background-color: ${colors.green200};
            }
          }
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

const About = ({ bio, socialLinks, posts }) => (
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
)

export default About

About.propTypes = {
  bio: PropTypes.array.isRequired,
  socialLinks: PropTypes.array.isRequired,
}
