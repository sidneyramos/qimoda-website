import React from "react"
import Moment from "react-moment"
import Link from "components/_ui/Link"
import { RichText } from "prismic-reactjs"
import styled from "@emotion/styled"
import colors from "styles/colors"
import PropTypes from "prop-types"
var classNames = require("classnames")

const PostCardContainer = styled(Link)`
  border: 1px solid ${colors.grey200};
  padding: 3em 2.5em 2.25em 2.5em;
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
      color: ${colors.teal600};
      transition: all 150ms ease-in-out;

      span {
        transform: translateX(0px);
        opacity: 1;
        transition: transform 150ms ease-in-out;
      }
    }
  }

  &.isSmall {
    padding: 1.5em;
  }
`

const PostCategory = styled("h6")`
  font-weight: 600;
  color: ${colors.grey600};

  &.isSmall {
    font-size: 0.8em;
  }
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

const PostCardAction = styled("div")`
  font-weight: 600;
  text-decoration: none;
  color: currentColor;
  transition: all 150ms ease-in-out;

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
    <PostTitle className={classNames({ isSmall: isSmall })}>
      {title[0].text}
    </PostTitle>
    <PostDescription className={classNames({ isSmall: isSmall })}>
      {RichText.render(description)}
    </PostDescription>
    <PostCardAction
      className={classNames(["PostCardAction", { isSmall: isSmall }])}
    >
      Read more <span>&#8594;</span>
    </PostCardAction>
    <PostMetas className={classNames({ isSmall: isSmall })}>
      <PostAuthor className={classNames({ isSmall: isSmall })}>
        {author}
      </PostAuthor>
      <PostDate className={classNames({ isSmall: isSmall })}>
        <Moment format="MMMM D, YYYY">{date}</Moment>
      </PostDate>
    </PostMetas>
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
