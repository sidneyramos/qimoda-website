import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { graphql } from "gatsby"
import styled from "@emotion/styled"
import DashboardLayout from "components/dashboard/DashboardLayout"
import DashboardCard from "components/dashboard/_ui/DashboardCard"
import useCollapse from "react-collapsed"
import Loadable from "react-loadable"
import ContentLoader from "react-content-loader"
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

const dayjs = require("dayjs")
const relativeTime = require("dayjs/plugin/relativeTime")
var customParseFormat = require("dayjs/plugin/customParseFormat")
dayjs.extend(customParseFormat).extend(relativeTime)

const PieChart = Loadable({
  loader: () => import("react-minimal-pie-chart"),
  loading: () => null,
})

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
    &:first-of-type {
      transition: filter 0.3s;
    }
  }
`

const DonutCharts = styled.div`
  display: flex;
  padding-top: 0.5rem;
`

const Collapsible = styled.div`
  // margin: 0.5rem 0;
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
        &:first-of-type {
          filter: brightness(0.85);
        }
      }
    }
  }
`

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

const Card = ({ children, title, logo, aboveHeader, ...props }) => {
  return (
    <DashboardCard title="Projects" aboveHeader={aboveHeader} order={{ xs: 1 }}>
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
  )
}

export default Card
