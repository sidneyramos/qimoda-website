import React from "react"
import Link from "components/_ui/Link"
import styled from "@emotion/styled"
import colors from "styles/colors"
import dimensions from "styles/dimensions"
import Logo from "components/_ui/Logo"
import qimoda from "images/qimoda/5.png"

const HeaderContainer = styled("div")`
  padding-top: 3.75em;
  padding-bottom: 3em;
`

const HeaderContent = styled("div")`
  display: flex;
  justify-content: space-between;
`

const HeaderLinks = styled("div")`
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-gap: 7em;
  justify-content: flex-end;
  width: 100%;
  max-width: 200px;

  @media (max-width: ${dimensions.maxwidthTablet}px) {
    grid-gap: 5.5em;
  }

  @media (max-width: ${dimensions.maxwidthMobile}px) {
    grid-gap: 2.5em;
  }

  a {
    color: currentColor;
    text-decoration: none;
    border-bottom: 3px solid transparent;
    font-weight: 600;
    font-size: 0.95em;
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
    letter-spacing: 1px;
    overflow: visible;

    &:after {
      position: absolute;
      content: "";
      width: 100%;
      height: 12px;
      background: ${colors.qimodaLight};
      background-size: cover;
      bottom: 8px;
      left: 0;
      transform: translateX(-10px);
      transition: 0.25s;
      z-index: -1;
      opacity: 0;
      filter: brightness(150%);
    }

    &:hover {
      &:after {
        transform: translateX(0px);
        opacity: 0.25;
      }
    }

    &.Link--is-active {
      &:after {
        transition: 100ms;
        opacity: 0.25;
        transform: translateX(0);
      }
    }
  }
`

const Header = () => (
  <HeaderContainer>
    <HeaderContent>
      <Link to="/" className="logo-link">
        <Logo />
      </Link>
      <HeaderLinks>
        <Link activeClassName="Link--is-active" to="/work">
          WORK
        </Link>
        <Link activeClassName="Link--is-active" to="/blog">
          BLOG
        </Link>
      </HeaderLinks>
    </HeaderContent>
  </HeaderContainer>
)

export default Header
