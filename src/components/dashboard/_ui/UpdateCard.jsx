import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { graphql } from "gatsby"
import styled from "@emotion/styled"
import DashboardCard from "components/dashboard/_ui/DashboardCard"
import colors from "styles/colors"
import {
  TiBrush,
  TiDocumentText,
  TiDeviceLaptop,
  TiLinkOutline,
} from "react-icons/ti"
import Box from "@chakra-ui/core/dist/Box"
import Flex from "@chakra-ui/core/dist/Flex"
import FadeIn from "react-fade-in"

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

const Card = ({ children, title, logo, aboveHeader, ...props }) => {
  return (
    <DashboardCard title={title}>
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
  )
}

export default Card
