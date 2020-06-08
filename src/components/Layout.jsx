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

import ThemeProvider from "@chakra-ui/core/dist/ThemeProvider"
import theme from "styles/theme"

const LayoutContainer = styled(Box)`
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
          <LayoutContainer backgroundImage={`url('${bg}')`} className="div">
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

export default Layout
