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
import Footer from "components/Footer"
import Helmet from "react-helmet"
import "styles/fonts.scss"
import preview from "images/preview.png"
import bg from "images/bg-min.png"
import colors from "styles/colors"
import FadeIn from "react-fade-in"
import { Link } from "gatsby"
import useToast from "@chakra-ui/core/dist/Toast"
import ThemeProvider from "@chakra-ui/core/dist/ThemeProvider"
import theme from "styles/theme"
import {
  TiHome,
  TiUser,
  TiPlus,
  TiCog,
  TiChartPie,
  TiPower,
} from "react-icons/ti"
import IconButton from "@chakra-ui/core/dist/IconButton"
import AuthenticateLayout from "components/AuthenticateLayout"
import * as jwt from "jsonwebtoken"
import * as firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import Masonry from "react-masonry-css"
import {
  UserDataContext,
  TasksContext,
  DatabaseContext,
  LoadingContext,
} from "components/Context"

const CryptoJS = require("crypto-js")

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
  flex-direction: row;
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

const Layout = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState(null)
  const [database, setDatabase] = useState(null)
  const [isLoggedIn, setLoggedIn] = useState(null)
  const [tasks, setTasks] = useState([])
  const splitData = userData ? userData.split("%") : null
  const parsedData = splitData
    ? jwt.verify(splitData[0], splitData[1], function(err, decoded) {
        return decoded
      })
    : null

  useEffect(() => {
    if (!!typeof window) {
      const hasUser = sessionStorage.getItem("user")
      const settings = sessionStorage.getItem("set")
      // const sessionToken = sessionStorage.getItem("tok")

      if (settings && hasUser) {
        if (firebase.apps.length === 0) {
          const key = hasUser.split("%")[1]
          const parsedSettings = JSON.parse(
            CryptoJS.AES.decrypt(settings, key).toString(CryptoJS.enc.Utf8)
          )
          firebase.initializeApp(parsedSettings)
        }

        setDatabase(firebase.firestore())
      }
      setUserData(hasUser)
      setLoggedIn(!!hasUser)
    }
  }, [isLoggedIn])

  if (isLoggedIn) {
    if (database && splitData) {
      const docRef = database.collection("tasks").doc(splitData[1])

      docRef
        .get()
        .then(function(doc) {
          if (doc.exists) {
            const data = doc.data()
            if (JSON.stringify(tasks) !== JSON.stringify(data.taskArray)) {
              setTasks(data.taskArray)
              setLoading(false)
            }
          } else {
            console.log("No such document!")
            setLoading(false)
          }
        })
        .catch(function(error) {
          setLoading(false)
          console.log("Error getting document:", error)
        })
    } else {
      setLoading(false)
    }
  }

  return (
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
            {!isLoggedIn ? (
              <AuthenticateLayout toast={useToast} setLoggedIn={setLoggedIn} />
            ) : (
              <LoadingContext.Provider value={loading}>
                <DatabaseContext.Provider
                  value={{ db: database, uid: splitData ? splitData[1] : null }}
                >
                  <UserDataContext.Provider value={parsedData}>
                    <TasksContext.Provider value={tasks}>
                      <LayoutContainer>
                        <Global
                          styles={[
                            globalStyles,
                            typeStyles,
                            logoStyles,
                            listStyles,
                          ]}
                        />
                        <LayoutAside>
                          <div>
                            <div>
                              <DashButton icon={TiHome} linkUrl="/dashboard" />
                            </div>
                            <div>
                              <DashButton
                                icon={TiPlus}
                                linkUrl="/dashboard/create"
                              />
                              <DashButton
                                icon={TiChartPie}
                                linkUrl="/dashboard/projects"
                              />
                              {/* <DashButton icon={TiUser} />
                          <DashButton icon={TiCog} /> */}
                              <DashButton icon={TiCog} linkUrl="/dashboard" />
                            </div>
                            <div>
                              <DashButton icon={TiUser} linkUrl="/dashboard" />
                              <DashButton
                                icon={TiPower}
                                onClick={async () => {
                                  if (firebase.auth().currentUser) {
                                    try {
                                      await firebase.auth().signOut()
                                    } catch (error) {
                                      // An error happened.
                                      console.log(error)
                                    }
                                  }

                                  sessionStorage.removeItem("user")
                                  sessionStorage.removeItem("set")

                                  setTasks([])
                                  setLoggedIn(false)
                                  setDatabase(null)
                                  setUserData(null)
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
                                  1024: 2,
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
                    </TasksContext.Provider>
                  </UserDataContext.Provider>
                </DatabaseContext.Provider>
              </LoadingContext.Provider>
            )}
          </ThemeProvider>
        </>
      )}
    />
  )
}

export default Layout
