import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { graphql } from "gatsby"
import styled from "@emotion/styled"
import dimensions from "styles/dimensions"
import DashboardLayout from "components/DashboardLayout"
import AuthenticateLayout from "components/AuthenticateLayout"
import DashboardCard from "components/_ui/DashboardCard"
import useCollapse from "react-collapsed"
import Loadable from "react-loadable"
import ContentLoader from "react-content-loader"
import useToast from "@chakra-ui/core/dist/Toast"
import colors from "styles/colors"
import {
  TiBrush,
  TiDocumentText,
  TiDeviceLaptop,
  TiDevicePhone,
  TiLinkOutline,
  TiChevronRight,
  TiFlagOutline,
  TiThumbsUp,
  TiThumbsOk,
  TiThumbsDown,
} from "react-icons/ti"
import Box from "@chakra-ui/core/dist/Box"
import Flex from "@chakra-ui/core/dist/Flex"
import FadeIn from "react-fade-in"
import Heading from "@chakra-ui/core/dist/Heading"
import * as jwt from "jsonwebtoken"
import * as firebase from "firebase/app"
import "firebase/firestore"

const CryptoJS = require("crypto-js")

// import ReactFrappeChart from "react-frappe-charts"
// import PieChart from "react-minimal-pie-chart"

const dayjs = require("dayjs")
const relativeTime = require("dayjs/plugin/relativeTime")
var customParseFormat = require("dayjs/plugin/customParseFormat")
dayjs.extend(customParseFormat).extend(relativeTime)

const PieChart = Loadable({
  loader: () => import("react-minimal-pie-chart"),
  loading: () => null,
})

const ReactFrappeChart = Loadable({
  loader: () => import("react-frappe-charts"),
  loading: () => (
    <Box mt="1rem">
      <ContentLoader viewBox="0 0 380 200" foregroundOpacity={0.06}>
        <rect x="0" y="0" rx="5" ry="5" width="380" height="200" />
      </ContentLoader>
    </Box>
  ),
})

const ProjectList = styled.ul`
  padding: 0;
  list-style: none;
  margin-bottom: 0;

  & > div > div {
    li {
      border-bottom: 1px solid #dbe8e8;
    }

    &:last-child {
      li {
        border-bottom: initial;
      }
    }
  }
`

const ProjectLogo = styled(({ icon, props }) => (
  <Flex
    justifyContent="center"
    alignItems="center"
    padding="0.5rem"
    background="linear-gradient(180deg, rgba(192,228,228,1) 0%, rgba(177,212,252,0.35) 100%)"
    borderRadius="10px"
    marginRight="10px"
    {...props}
  >
    <Box as={icon} size="20px" color={colors.qimodaDark} />
  </Flex>
))``

const UpdateList = styled.ul`
  padding: 0;
  list-style: none;
  margin-bottom: 0;

  & > div > div {
    li {
      border-bottom: 1px solid #dbe8e8;
    }

    &:last-child {
      li {
        border-bottom: initial;
      }
    }
  }
`

const Update = styled.li`
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
  margin: 0;

  &:before {
    display: none;
  }
`

const UpdateTitle = styled.h1`
  font-family: Rubik;
  font-weight: 400;
  margin: 0;
  font-size: 0.75rem;
  color: ${colors.qimodaDashboardCardTitle};
`

const UpdateLogo = styled(({ icon, logoText, ...props }) => (
  <Flex
    justifyContent="center"
    alignItems="center"
    padding="0.5rem"
    borderRadius="10px"
    marginRight="10px"
    {...props}
  >
    {icon ? (
      <Box as={icon} size="20px" color={colors.qimodaDark} />
    ) : (
      <p>{logoText}</p>
    )}
  </Flex>
))`
  background: ${props =>
    props.variant === "red"
      ? "linear-gradient(180deg,rgba(228, 192, 192, 1) 0%,rgba(252, 177, 222, 0.35) 100%)"
      : props.variant === "yellow"
      ? "linear-gradient(180deg, rgba(227,228,192,1) 0%, rgba(252,235,177,0.35) 100%)"
      : "linear-gradient(180deg, rgba(192, 228, 228, 1) 0%, rgba(177, 212, 252, 0.35) 100%)"};

  &.variant-yellow {
  }
  &.variant-red {
    background: linear-gradient(
      180deg,
      rgba(228, 192, 192, 1) 0%,
      rgba(252, 177, 222, 0.24833683473389356) 100%
    );
  }
  p {
    height: 20px;
    width: 20px;
    text-align: center;
    margin: 0;
    line-height: 1.3;
    font-size: 16px;
  }
`
const Project = styled.li`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 0;

  &:before {
    display: none;
  }

  &:hover {
    // background: rgba(0, 0, 0, 0.02);
    button {
      & > div {
        &:first-child {
          filter: brightness(0.85);
        }
      }
    }
  }
`

const Collapsible = styled.div`
  // margin: 0.5rem 0;
`

const ExpandButton = styled.button`
  cursor: pointer;
  border: none;
  width: 100%;
  background-color: initial;
  display: flex;
  align-items: center;
  font-family: Rubik, -apple-system, BlinkMacSystemFont, Helvetica, sans-serif;
  font-size: 16px;
  box-shadow: initial;
  outline: initial;
  padding: 0.5rem 0;

  & > div {
    &:first-child {
      transition: filter 0.3s;
    }
  }
`

const DonutCharts = styled.div`
  display: flex;
  padding-top: 0.5rem;
`

const ChartTitle = styled.span`
  display: block;
  width: 100%;
  text-align: center;
  font-size: 11px;
  text-transform: uppercase;
  word-break: break-all;
`

const StatDonutChart = styled(({ title, percent, ...props }) => (
  <div>
    <PieChart rounded reveal={percent} {...props}>
      <p>{percent}%</p>
    </PieChart>
    {title && <ChartTitle>{title}</ChartTitle>}
  </div>
))`
  position: relative;
  padding: 0.5rem;
  svg {
    transform: rotate(270deg);
  }
  p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0;
    font-size: 1rem;
    font-weight: 700;
  }
`

const CollapsibleContent = styled.div`
  padding: 0.5rem;
`

const LaunchCardContainer = styled.div`
  border-radius: 5px;
  width: 100%;
  background: ${props =>
    [colors.red200, colors.teal200, colors.green200][props.status]};
  padding: 0.25rem;

  h2 {
    font-size: 0.75rem;
    margin: 0;
    text-transform: uppercase;
  }

  h3 {
    margin: 0;
    font-size: 1rem;
  }

  p {
    margin: 0.2rem 0;
    margin-left: 2px;
    line-height: 1;
    font-size: 11px;
  }
`

const LaunchCard = ({ date, status, ...props }) => {
  const fromDate = dayjs()
  const convertedDate = dayjs(date, "DD/MM/YYYY")
  const statusArr = [
    { icon: TiThumbsDown, text: "Delayed" },
    { icon: TiThumbsOk, text: "On Time" },
    { icon: TiThumbsUp, text: "Ahead" },
  ]

  return (
    <LaunchCardContainer status={status}>
      <Flex alignItems="center" my="0.5rem">
        <Box
          as={statusArr[status].icon}
          size="40px"
          padding="0.2rem"
          transition="transform 0.3s"
          color={[colors.red600, colors.qimodaLight, colors.green600][status]}
          mr="5px"
        />
        <div>
          <h3>{statusArr[status].text}</h3>
          <p>
            {fromDate.to(convertedDate, true)}
            {` - `}
            {convertedDate.format("D MMM, YYYY")}
          </p>
        </div>
      </Flex>
    </LaunchCardContainer>
  )
}

const ProjectListItem = ({
  title,
  logo,
  content,
  defaultOpen,
  status,
  ...props
}) => {
  const { getCollapseProps, getToggleProps, isOpen } = useCollapse({
    defaultOpen: defaultOpen,
  })
  return (
    <Project {...props}>
      <ExpandButton {...getToggleProps()}>
        <ProjectLogo icon={logo} />
        <Box>{title}</Box>
        <Box
          as={TiChevronRight}
          size="20px"
          ml="auto"
          transform={isOpen ? "rotate(270deg)" : "rotate(90deg)"}
          transition="transform 0.3s"
          color={colors.qimodaLight}
        />
      </ExpandButton>
      <Collapsible {...getCollapseProps()}>
        <LaunchCard status={status} date="09/01/2021" />
        <DonutCharts>
          <StatDonutChart
            data={[{ value: 1, key: 1, color: colors.qimodaLight }]}
            background="#bfbfbf"
            title="Planning"
            percent={10}
            lineWidth={20}
          />
          <StatDonutChart
            data={[{ value: 1, key: 1, color: colors.qimodaLight }]}
            background="#bfbfbf"
            title="Design"
            percent={20}
            lineWidth={20}
          />
          <StatDonutChart
            data={[{ value: 1, key: 1, color: colors.qimodaLight }]}
            background="#bfbfbf"
            title="Development"
            percent={25}
            lineWidth={20}
          />
          <StatDonutChart
            data={[{ value: 1, key: 1, color: colors.qimodaLight }]}
            background="#bfbfbf"
            title="Testing"
            percent={50}
            lineWidth={20}
          />
        </DonutCharts>
        <CollapsibleContent>{content}</CollapsibleContent>
      </Collapsible>
    </Project>
  )
}

const Dashboard = ({ meta, location }) => {
  const [userData, setUserData] = useState(null)
  const [database, setDatabase] = useState(null)
  const [isLoggedIn, setLoggedIn] = useState(null)
  useEffect(() => {
    if (!!typeof window) {
      const hasUser = sessionStorage.getItem("user")
      const settings = sessionStorage.getItem("set")

      if (firebase.apps.length === 0 && settings && hasUser) {
        const key = hasUser.split("%")[1]
        const parsedSettings = JSON.parse(
          CryptoJS.AES.decrypt(settings, key).toString(CryptoJS.enc.Utf8)
        )
        firebase.initializeApp(parsedSettings)
        setDatabase(firebase.firestore())
      }
      setUserData(hasUser)
      setLoggedIn(!!hasUser)
    }
  }, [isLoggedIn])
  const splitData = userData ? userData.split("%") : null
  const parsedData = splitData
    ? jwt.verify(splitData[0], splitData[1], function(err, decoded) {
        return decoded
      })
    : null

  console.log(database)

  const names = parsedData ? parsedData.fullName.split(" ") : null

  return (
    <>
      <Helmet
        title={`Dashboard | Qimoda`}
        titleTemplate={`%s`}
        meta={[
          {
            name: `description`,
            content: meta.description,
          },
          {
            property: `og:title`,
            content: `Work | Qimoda`,
          },
          {
            property: `og:description`,
            content: meta.description,
          },
          {
            property: `og:type`,
            content: `website`,
          },
          {
            name: `twitter:card`,
            content: `summary`,
          },
          {
            name: `twitter:creator`,
            content: meta.author,
          },
          {
            name: `twitter:title`,
            content: meta.title,
          },
          {
            name: `twitter:description`,
            content: meta.description,
          },
        ].concat(meta)}
      />
      {!isLoggedIn ? (
        <AuthenticateLayout
          defaultURL={location.origin}
          toast={useToast}
          setLoggedIn={setLoggedIn}
        />
      ) : (
        <DashboardLayout
          setLoggedIn={setLoggedIn}
          setDatabase={setDatabase}
          setUserData={setUserData}
        >
          <DashboardCard title="Latest Project Updates">
            <UpdateList>
              <FadeIn transitionDuration={500}>
                <Update>
                  <UpdateLogo icon={TiBrush} />
                  <Box>
                    <UpdateTitle>Design - Website Project</UpdateTitle>
                    Contact us page design
                  </Box>
                </Update>
                <Update>
                  <UpdateLogo icon={TiDocumentText} />
                  <Box>
                    <UpdateTitle>Content - Website Project</UpdateTitle>
                    Homepage Content
                  </Box>
                </Update>
                <Update>
                  <UpdateLogo icon={TiDeviceLaptop} />
                  <Box>
                    <UpdateTitle>Development - Website Project</UpdateTitle>
                    Chart component
                  </Box>
                </Update>
                <Update>
                  <UpdateLogo icon={TiLinkOutline} />
                  <Box>
                    <UpdateTitle>SEO - Website Project</UpdateTitle>
                    Google Analytics plugin
                  </Box>
                </Update>
              </FadeIn>
            </UpdateList>
          </DashboardCard>
          <DashboardCard title="Project Performance" order={{ xs: 2 }}>
            <ReactFrappeChart
              type="line"
              colors={["#21ba45"]}
              axisOptions={{
                xAxisMode: "tick",
                yAxisMode: "tick",
                xIsSeries: 1,
              }}
              height={250}
              data={{
                labels: [
                  "Sun",
                  "Mon",
                  "Tue",
                  "Wed",
                  "Thu",
                  "Fri",
                  "Sat",
                  "Sun",
                ],
                datasets: [
                  {
                    name: "Project 1",
                    values: [18, 40, 30, 35, 8, 52, 17, -4],
                    chartType: "line",
                  },
                  {
                    name: "Project 2",
                    values: [30, 50, 0, 15, 18, 32, 27, 14],
                    chartType: "line",
                  },
                  {
                    name: "Project 3",
                    values: [0, 15, 27, 32, 14, 30, 18, 50],
                    chartType: "line",
                  },
                  {
                    name: "Project 4",
                    values: [18, 14, 27, 15, 30, 50, 32, 1],
                    chartType: "line",
                  },
                ],
              }}
            />
          </DashboardCard>
          <DashboardCard
            title="Projects"
            aboveHeader={`Hi ${names && names[0]}!`}
            order={{ xs: 1 }}
          >
            <ProjectList>
              <FadeIn transitionDuration={500}>
                <ProjectListItem
                  defaultOpen
                  logo={TiDeviceLaptop}
                  title="Website Project"
                  status={0}
                />
                <ProjectListItem
                  logo={TiDevicePhone}
                  title="App Project"
                  status={1}
                />
                <ProjectListItem
                  logo={TiDeviceLaptop}
                  title="Website Project"
                  status={2}
                />
                <ProjectListItem
                  logo={TiDevicePhone}
                  title="App Project"
                  status={0}
                />
              </FadeIn>
            </ProjectList>
          </DashboardCard>
          <DashboardCard title="Upcoming Deadlines">
            <UpdateList>
              <FadeIn transitionDuration={500}>
                <Update>
                  <UpdateLogo logoText="0" />
                  <Box>
                    <UpdateTitle>Design - Website Project</UpdateTitle>
                    Contact us page design
                  </Box>
                </Update>
                <Update>
                  <UpdateLogo logoText="2" variant="yellow" />
                  <Box>
                    <UpdateTitle>Content - Website Project</UpdateTitle>
                    Homepage Content
                  </Box>
                </Update>
                <Update>
                  <UpdateLogo logoText="5" variant="red" />
                  <Box>
                    <UpdateTitle>Development - Website Project</UpdateTitle>
                    Chart component
                  </Box>
                </Update>
                <Update>
                  <UpdateLogo logoText="5" variant="red" />
                  <Box>
                    <UpdateTitle>SEO - Website Project</UpdateTitle>
                    Google Analytics plugin
                  </Box>
                </Update>
              </FadeIn>
            </UpdateList>
          </DashboardCard>
          <DashboardCard title="Latest Messages">
            <UpdateList>
              <FadeIn transitionDuration={500}>
                <Update>
                  <UpdateLogo icon={TiDeviceLaptop} />
                  <Box>
                    <UpdateTitle>Website Project</UpdateTitle>
                    "We've finished updating the design"
                  </Box>
                </Update>
                <Update>
                  <UpdateLogo icon={TiDevicePhone} />
                  <Box>
                    <UpdateTitle>App Project</UpdateTitle>
                    "The new functionality has been implemented"
                  </Box>
                </Update>
                <Update>
                  <UpdateLogo icon={TiDeviceLaptop} />
                  <Box>
                    <UpdateTitle>Website Project</UpdateTitle>
                    "Done. Please check."
                  </Box>
                </Update>
                <Update>
                  <UpdateLogo icon={TiDevicePhone} />
                  <Box>
                    <UpdateTitle>App Project</UpdateTitle>
                    Google Analytics plugin
                  </Box>
                </Update>
              </FadeIn>
            </UpdateList>
          </DashboardCard>
        </DashboardLayout>
      )}
    </>
  )
}

export default ({ data, ...props }) => {
  const meta = data.site.siteMetadata

  return <Dashboard meta={meta} {...props} />
}

Dashboard.propTypes = {
  projects: PropTypes.array.isRequired,
}

export const query = graphql`
  {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`
