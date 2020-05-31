import React, { useState } from "react"
import styled from "@emotion/styled"
import colors from "styles/colors"
import dimensions from "styles/dimensions"
import Heading from "@chakra-ui/core/dist/Heading"
import DashboardCard from "components/dashboard/_ui/DashboardCard"
import Text from "@chakra-ui/core/dist/Text"
import Box from "@chakra-ui/core/dist/Box"
import Loadable from "react-loadable"
import ContentLoader from "react-content-loader"

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

const Card = ({ children, title, logo, aboveHeader, ...props }) => {
  return (
    <DashboardCard title={title}>
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
          labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
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
  )
}

export default Card
