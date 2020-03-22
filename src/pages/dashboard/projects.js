import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { graphql } from "gatsby"
import styled from "@emotion/styled"
import dimensions from "styles/dimensions"
import DashboardLayout from "components/DashboardLayout"
import DashboardCard from "components/_ui/DashboardCard"

import colors from "styles/colors"

const Dashboard = ({ meta }) => (
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
      <DashboardCard title="Project Tasks">Sample</DashboardCard>
      <DashboardCard title="Project Timeline">Sample</DashboardCard>
      <DashboardCard title="Project Chat">Sample</DashboardCard>
    </DashboardLayout>
  </>
)

export default ({ data }) => {
  const meta = data.site.siteMetadata

  return <Dashboard meta={meta} />
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
