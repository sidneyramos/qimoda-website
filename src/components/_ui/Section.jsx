import React from "react"
import colors from "styles/colors"
import dimensions from "styles/dimensions"
import styled from "@emotion/styled"

const InnerSection = styled("div")`
  max-width: ${dimensions.maxwidthDesktop}px;
  padding-left: ${dimensions.paddingHorizontalDesktop}em;
  padding-right: ${dimensions.paddingHorizontalDesktop}em;
  margin: 0 auto;

  @media (max-width: ${dimensions.maxwidthTablet}px) {
    padding-left: ${dimensions.paddingHorizontalTablet}em;
    padding-right: ${dimensions.paddingHorizontalTablet}em;
  }

  @media (max-width: ${dimensions.maxwidthMobile}px) {
    padding-left: ${dimensions.paddingHorizontalMobile}em;
    padding-right: ${dimensions.paddingHorizontalMobile}em;
  }
`

const OuterSection = styled("section")`
  margin-bottom: 6em;

  @media (max-width: ${dimensions.maxwidthTablet}px) {
    margin-bottom: 4em;
  }
  &:last-of-type {
    margin-bottom: 0;
  }
`

const Section = ({ innerProps, children, ...props }) => (
  <OuterSection {...props}>
    <InnerSection className="inner-section" {...innerProps}>
      {children}
    </InnerSection>
  </OuterSection>
)

export default Section
