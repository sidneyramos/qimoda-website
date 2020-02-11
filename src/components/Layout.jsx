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
import ThemeProvider from "@chakra-ui/core/dist/ThemeProvider"
import theme from "@chakra-ui/core/dist/theme"

const LayoutContainer = styled.div`
  max-width: ${dimensions.maxwidthDesktop}px;
  padding-left: ${dimensions.paddingHorizontalDesktop}em;
  padding-right: ${dimensions.paddingHorizontalDesktop}em;
  margin: 0 auto;

  @media (max-width: ${dimensions.maxwidthTablet}px) {
    padding-left: ${dimensions.paddingHorizontalTablet}em;
    padding-right: ${dimensions.paddingHorizontalTablet}em;
  }

  @media (max-width: ${dimensions.maxwidthMobile}px) {
    padding-left: ${dimensions.paddingHorizontalMobile}em;
    padding-right: ${dimensions.paddingHorizontalMobile}em;
  }

  .Layout__content {
    padding-bottom: 5em;
  }
`

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
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
          <LayoutContainer className="div">
            <Global
              styles={[globalStyles, typeStyles, logoStyles, listStyles]}
            />
            <div className="Layout">
              <Header />
              <main className="Layout__content">{children}</main>
              <Footer />
            </div>
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
