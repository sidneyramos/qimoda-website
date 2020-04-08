import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import styled from "@emotion/styled"
import { Global } from "@emotion/core"
import globalStyles from "styles/global"
import typeStyles from "styles/typography"
import logoStyles from "styles/logo"
import listStyles from "styles/list"
import dimensions from "styles/dimensions"
import colors from "styles/colors"
import Helmet from "react-helmet"
import "styles/fonts.scss"
import preview from "../images/preview.png"
import bg from "../images/bg-min.png"
import Box from "@chakra-ui/core/dist/Box"
import Flex from "@chakra-ui/core/dist/Flex"
import FadeIn from "react-fade-in"
import illus8 from "../images/DancingDoodle.svg"
import Loadable from "react-loadable"
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
import Masonry from "react-masonry-css"
import Text from "@chakra-ui/core/dist/Text"
import Button from "@chakra-ui/core/dist/Button"
import HooksLoginForm from "components/HooksLoginForm"
import HooksRegistrationForm from "components/HooksRegistrationForm"

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
  margin-top: auto;
  margin-bottom: auto;
`

const Heading = styled.h2`
  font-size: 1.75rem;
`

const Illustration = styled("img")`
  width: 75%;
  margin: 0 auto;
`

const LoginBox = styled.div`
  display: flex;
  width: 80%;
  margin: auto;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 1rem;

  @media (min-width: ${dimensions.maxwidthMobile}px) {
    width: 30%;
  }
`

const RegLink = styled(props => <Button variant="link" {...props} />)`
  border: initial;
  font-size: 12px;
  padding: 0;
  margin: 0;
  line-height: initial;
  width: auto;
  min-width: initial;
  height: auto;
  min-height: initial;
  vertical-align: initial;
  color: ${colors.qimodaLight};
  cursor: pointer;

  &:focus {
    box-shadow: initial;
  }
`

const Layout = ({ children, toast, setLoggedIn }) => {
  const [currentForm, setCurrentForm] = useState("login")
  const [windowLocation, setWindowLocation] = useState(null)

  const isLogin = currentForm === "login"

  useEffect(() => {
    if (!!typeof window) {
      setWindowLocation(window.location)
    }
  })

  return (
    <StaticQuery
      query={graphql`
        query LoginTitleQuery {
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
              <LayoutOuter>
                <LayoutMain>
                  <FadeIn transitionDuration={500}>
                    <LoginBox>
                      <Heading>
                        {isLogin ? "Welcome Back!" : "Glad to have you!"}
                      </Heading>
                      <Illustration
                        src={illus8}
                        alt="Start off with a template"
                      />
                      <Text fontSize="12px">
                        {isLogin ? `Don't h` : "H"}ave an account? Sign{" "}
                        {isLogin ? `up` : "in"}
                        {` `}
                        <RegLink
                          onClick={() => {
                            const setForm = isLogin ? "register" : "login"
                            setCurrentForm(setForm)
                          }}
                        >
                          here.
                        </RegLink>
                      </Text>
                      {isLogin ? (
                        <HooksLoginForm
                          toast={toast}
                          defaultURL={windowLocation && windowLocation.origin}
                          setLoggedIn={setLoggedIn}
                        />
                      ) : (
                        <HooksRegistrationForm
                          toast={toast}
                          defaultURL={windowLocation && windowLocation.origin}
                          setLoggedIn={setLoggedIn}
                        />
                      )}
                    </LoginBox>
                  </FadeIn>
                </LayoutMain>
              </LayoutOuter>
            </LayoutContainer>
          </ThemeProvider>
        </>
      )}
    />
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
