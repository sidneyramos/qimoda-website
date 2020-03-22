import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import styled from "@emotion/styled"
import { Global } from "@emotion/core"
import globalStyles from "styles/global"
import typeStyles from "styles/typography"
import logoStyles from "styles/logo"
import listStyles from "styles/list"
import dimensions from "styles/dimensions"
import Footer from "components/Footer"
import Header from "components/Header"
import Helmet from "react-helmet"
import "styles/fonts.scss"
import preview from "../images/preview.png"
import bg from "../images/bg-min.png"
import Box from "@chakra-ui/core/dist/Box"
import colors from "styles/colors"
import FadeIn from "react-fade-in"
import { Link } from "gatsby"

import ThemeProvider from "@chakra-ui/core/dist/ThemeProvider"
import theme from "styles/theme"
import {
  TiHome,
  TiUser,
  TiPlus,
  TiCog,
  TiCalendar,
  TiChartPie,
  TiPower,
} from "react-icons/ti"
import IconButton from "@chakra-ui/core/dist/IconButton"

import Masonry from "react-masonry-css"

const LayoutContainer = styled.div`
  background-image: url('${bg}');
  display: flex;
  background-color: rgba(227,244,246,0.25);
`

const LayoutOuter = styled.div`
  height: 100%;
  flex: 1;
  height: 100vh;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
`

const LayoutMain = styled.main`
  margin-bottom: auto;
`

const LayoutFooter = styled(Footer)`
  margin-top: auto;
`

const LayoutAside = styled.aside`
  display: flex;
  @media (min-width: ${dimensions.maxwidthMobile}px) {
    height: 100%;
    min-height: 100vh;
  }
  div {
    display: flex;
    justify-content: center;
    background-color: white;
    width: 100%;
    z-index: 2;

    @media (min-width: ${dimensions.maxwidthMobile}px) {
      position: initial;
      background-color: initial;
      width: auto;
      flex-direction: column;
    }
  }

  & > div {
    position: fixed;
    box-shadow: 0px 20px 30px 0px rgba(0, 0, 0, 0.75);
    bottom: 0;

    @media (min-width: ${dimensions.maxwidthMobile}px) {
      box-shadow: initial;
      position: initial;
      background-color: initial;
      margin-top: 4rem;
      margin-bottom: 4rem;
      border-right: 1px solid #dbe8e8;
      justify-content: space-between;
    }
  }

  button {
    &:focus {
      box-shadow: none;
      background-color: #e6fffa;
      color: #1d4e4e;
    }
  }
`

const DefaultLink = styled(Link)`
  cursor: default;
`

const DashButton = styled(({ linkUrl, ...props }) =>
  linkUrl ? (
    <DefaultLink to={linkUrl}>
      <IconButton
        variant="ghost"
        variantColor="teal"
        aria-label="Call Sage"
        height="auto"
        padding={{ xs: "1rem", md: "0.5rem" }}
        margin={{ md: "0.25rem 0.5rem" }}
        fontSize={{ xs: "30px", md: "30px" }}
        color={colors.qimodaDashboardButton}
        border="none"
        borderRadius="10px"
        {...props}
      />
    </DefaultLink>
  ) : (
    <IconButton
      variant="ghost"
      variantColor="teal"
      aria-label="Call Sage"
      height="auto"
      padding={{ xs: "1rem", md: "0.5rem" }}
      margin={{ md: "0.25rem 0.5rem" }}
      fontSize={{ xs: "30px", md: "30px" }}
      color={colors.qimodaDashboardButton}
      border="none"
      borderRadius="10px"
      {...props}
    />
  )
)`
  cursor: pointer;
  &:hover {
    background-color: ${colors.teal100};
  }
`

const MainMasonry = styled(Masonry)`
  display: flex;
  flex-direction: row-reverse;
  margin-left: -15px;
  width: auto;
  padding: 1rem;

  @media (min-width: ${dimensions.maxwidthMobile}px) {
    padding: 2rem;
  }

  .masonry-column {
    padding-left: 15px;
    background-clip: padding-box;

    @media (max-width: ${dimensions.maxwidthMobile}px) {
      display: flex;
      flex-direction: column;
    }

    & > div {
      margin-bottom: 15px;
    }
  }
`

const Layout = ({ setLoggedIn, children }) => (
  <StaticQuery
    query={graphql`
      query DashboardSiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <ThemeProvider theme={theme}>
          <Helmet
            meta={[
              {
                property: `og:image`,
                content: `https://qimoda.com${preview}`,
              },
            ]}
          />
          <LayoutContainer>
            <Global
              styles={[globalStyles, typeStyles, logoStyles, listStyles]}
            />
            <LayoutAside>
              <div>
                <div>
                  <DashButton icon={TiHome} linkUrl="/dashboard" />
                </div>
                <div>
                  <DashButton icon={TiPlus} linkUrl="/dashboard" />
                  <DashButton icon={TiChartPie} linkUrl="/dashboard/projects" />
                  {/* <DashButton icon={TiUser} />
                  <DashButton icon={TiCog} /> */}
                  <DashButton icon={TiCog} linkUrl="/dashboard" />
                </div>
                <div>
                  <DashButton icon={TiUser} linkUrl="/dashboard" />
                  <DashButton
                    icon={TiPower}
                    onClick={() => {
                      sessionStorage.removeItem("user")
                      setLoggedIn(false)
                    }}
                  />
                </div>
              </div>
            </LayoutAside>
            <LayoutOuter>
              <LayoutMain>
                <FadeIn transitionDuration={500}>
                  <MainMasonry
                    breakpointCols={{
                      default: 3,
                      768: 1,
                    }}
                    className="main-masonry"
                    columnClassName="masonry-column"
                  >
                    {children}
                  </MainMasonry>
                </FadeIn>
                {/* <Box bg="black" height="1000px" /> */}
              </LayoutMain>
              <LayoutFooter />
            </LayoutOuter>
          </LayoutContainer>
        </ThemeProvider>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout