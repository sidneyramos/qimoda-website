import React, { useState } from "react"
import styled from "@emotion/styled"
import colors from "styles/colors"
import dimensions from "styles/dimensions"
import Heading from "@chakra-ui/core/dist/Heading"
import DashboardCard from "components/dashboard/_ui/DashboardCard"
import Text from "@chakra-ui/core/dist/Text"
import Box from "@chakra-ui/core/dist/Box"

const Card = ({ children, title, ...props }) => {
  return <DashboardCard title={title}>Sample</DashboardCard>
}

export default Card
