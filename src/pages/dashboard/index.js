import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { graphql } from "gatsby"
import styled from "@emotion/styled"
import DashboardLayout from "components/dashboard/DashboardLayout"
import DashboardCard from "components/dashboard/_ui/DashboardCard"
import ProjectListCard from "components/dashboard/_ui/ProjectListCard"
import MainCard from "components/dashboard/_ui/MainCard"
import TasksCard from "components/dashboard/_ui/TasksCard"
import ChartsCard from "components/dashboard/_ui/ChartsCard"
import UpdateCard from "components/dashboard/_ui/UpdateCard"
import NotesCard from "components/dashboard/_ui/NotesCard"

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
import { UserDataContext, TasksContext } from "components/Context"

const Dashboard = ({ meta, location }) => {
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
      <DashboardLayout>
        <UserDataContext.Consumer>
          {data => {
            const names = data ? data.fullName.split(" ") : ""
            return <MainCard aboveHeader={`Hi ${names && names[0]}!`} />
          }}
        </UserDataContext.Consumer>

        <TasksCard title="Tasks" />

        <NotesCard title="Notes" />
        <ProjectListCard />

        <UpdateCard title="Latest Project Updates" />
        <ChartsCard title="Project Performance" order={{ xs: 2 }} />

        {/* <DashboardCard title="Upcoming Deadlines">
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
        </DashboardCard> */}
        {/* <DashboardCard title="Latest Messages">
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
        </DashboardCard> */}
      </DashboardLayout>
    </>
  )
}

export default ({ data, ...props }) => {
  const meta = data.site.siteMetadata

  return <Dashboard meta={meta} {...props} />
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
