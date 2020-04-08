import React from "react"
import styled from "@emotion/styled"
import colors from "styles/colors"
import dimensions from "styles/dimensions"
import Heading from "@chakra-ui/core/dist/Heading"

const CardContainer = styled.div`
  box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.06);
  width: 100%;
  background-color: white;
  border-radius: 10px;
  padding: 1.5rem;
  order: ${props =>
    props.order && props.order.xs ? props.order.xs : "initial"};

  @media (min-width: ${dimensions.maxwidthMobile}px) {
    order: ${props =>
      props.order && props.order.md ? props.order.md : "initial"};
  }
`

const CardTitle = styled.h3`
  font-family: Rubik;
  font-weight: 400;
  margin: 0;
  font-size: 0.75rem;
  color: ${colors.qimodaDashboardCardTitle};
`

const CardLogo = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 30px;
  background: linear-gradient(#036c72, transparent),
    linear-gradient(to bottom left, #003437, transparent),
    linear-gradient(to top right, #76d7c4, transparent);
  background-blend-mode: screen;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
`

const CardTitleContainer = styled.div`
  display: flex;
  align-items: center;
`
const CardBody = styled.div`
  p {
    font-size: 0.9rem;
  }
`

const Card = ({ children, title, logo, aboveHeader, ...props }) => {
  return (
    <CardContainer {...props}>
      {aboveHeader && (
        <Heading as="h1" mb="10px">
          {aboveHeader}
        </Heading>
      )}
      {title && <CardTitle>{title}</CardTitle>}
      <CardBody>{children}</CardBody>
    </CardContainer>
  )
}

export default Card
