import React from "react"
import colors from "styles/colors"
import AniLink from "gatsby-plugin-transition-link/AniLink"

const Link = ({ children, ...props }) => (
  <AniLink cover duration={0.5} bg={colors.teal300} {...props}>
    {children}
  </AniLink>
)

export default Link
