import React from "react"
import Moment from "react-moment"
import Link from "components/_ui/Link"
import RichText from "prismic-reactjs/src/Component"
import styled from "@emotion/styled"
import colors from "styles/colors"
import PropTypes from "prop-types"
import Box from "@chakra-ui/core/dist/Box"

var classNames = require("classnames")

const PostCardContainer = styled(Link)`
  border: 1px solid ${colors.grey200};
  // padding: 3em 2.5em 2.25em 2.5em;
  border-radius: 3px;
  text-decoration: none;
  color: currentColor;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.06);
  transition: all 150ms ease-in-out;

  &:hover {
    box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.1);
    transition: all 150ms ease-in-out;
    cursor: pointer;
    color: initial;

    .PostCardAction {
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
  }

  .PostContentContainer {
    padding: 1.5rem;
    padding-top: 0.5rem;
    height: 100%;
    justify-content: space-between;
    display: flex;
    flex-direction: column;
  }
`

const PostCategory = styled("h6")`
  font-weight: 500;
  color: ${colors.teal500};
  padding: 1.5rem;
  padding-bottom: 0;
  background-color: ${colors.white};
  text-transform: uppercase;
  font-size: 15px;
`

const PostTitle = styled("h3")`
  margin: 0;
  margin-top: 0.5em;
`

const PostMetas = styled("div")`
  display: flex;
  align-items: center;
  margin-top: 1.5em;
  justify-content: space-between;
  font-size: 0.85em;
  color: ${colors.grey600};

  &.isSmall {
    font-size: 12px;
  }
`

const PostAuthor = styled("div")`
  margin: 0;
`

const PostDate = styled("div")`
  margin: 0;
`

const PostDescription = styled("div")`
  margin-top: 2em;
  margin-bottom: 4em;

  p:last-of-type {
    margin: 0;
  }

  &.isSmall {
    font-size: 14px;
    margin: 1em 0;
    margin-bottom: 1.5em;
  }
`

const PostContentContainer = styled(Box)``

const PostCardAction = styled("div")`
  font-weight: 600;
  text-decoration: none;
  color: currentColor;
  transition: all 150ms ease-in-out;
  position: relative;
  margin-top: auto;

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

  &.isSmall {
    font-size: 14px;
  }
`

const PostCard = ({
  author,
  category,
  date,
  title,
  description,
  uid,
  isSmall,
}) => (
  <PostCardContainer
    className={classNames(["BlogPostCard", { isSmall: isSmall }])}
    to={`/blog/${uid}`}
  >
    <PostCategory className={classNames({ isSmall: isSmall })}>
      {category[0].text}
    </PostCategory>
    <PostContentContainer className={"PostContentContainer"}>
      <PostTitle className={classNames({ isSmall: isSmall })}>
        {title[0].text}
      </PostTitle>
      <PostDescription className={classNames({ isSmall: isSmall })}>
        {RichText.render(description)}
      </PostDescription>
      <PostCardAction
        className={classNames(["PostCardAction", { isSmall: isSmall }])}
      >
        <p>READ MORE</p> <span>&#8594;</span>
      </PostCardAction>
      <PostMetas className={classNames({ isSmall: isSmall })}>
        <PostAuthor className={classNames({ isSmall: isSmall })}>
          {author}
        </PostAuthor>
        <PostDate className={classNames({ isSmall: isSmall })}>
          <Moment format="MMMM D, YYYY">{date}</Moment>
        </PostDate>
      </PostMetas>
    </PostContentContainer>
  </PostCardContainer>
)

export default PostCard

PostCard.propTypes = {
  author: PropTypes.string.isRequired,
  category: PropTypes.array.isRequired,
  date: PropTypes.string.isRequired,
  title: PropTypes.array.isRequired,
  description: PropTypes.array.isRequired,
  uid: PropTypes.string.isRequired,
}
