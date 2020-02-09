import React, { Component } from "react"
import styled from "@emotion/styled"
import colors from "styles/colors"
import dimensions from "styles/dimensions"
import qimoda from "images/qimoda/5.svg"
import { Button as ChakraButton } from "@chakra-ui/core"

const ButtonContainer = styled(ChakraButton)`
  padding: 1em 2em;
  font-weight: 600;
  color: white;
  outline: none;
  border: none;
  font-size: 1rem;
  border-radius: 5px;
  position: relative;
  transition: background 100ms ease-in-out;
  position: relative;
  height: auto;

  &:after {
    content: "";
    width: 10px;
    height: 21px;
    position: absolute;
    bottom: calc(50% - 12px);
    right: 12px;
    opacity: 0;
    transition: 0.5s;

    background-image: url('${qimoda}');
    background-size: cover;
    filter: brightness(300%);

    @media (max-width: ${dimensions.maxwidthTablet}px) {
      bottom: calc(-0.25em - 2px);
    }
  }

  @media (max-width: ${dimensions.maxwidthMobile}px) {
    padding: 0.8em 1.8em;
    font-size: 1em;
  }

  p {
    margin: 0;
  }


  &:hover {
    cursor: pointer;

    &:after {
      opacity: 1;
    }
  }

  &.Button--secondary {
    background: ${colors.teal200};
    color: ${colors.teal600};
    padding: 0.95em 1.8em;
    font-size: 0.95rem;

    &:after {
      filter: brightness(100%);
      right: 10px;
    }

    &:hover {
      background: ${colors.teal300};
      transition: background 100ms ease-in-out;
    }
  }
`

class Button extends Component {
  render() {
    const { children, ...props } = this.props
    return (
      <ButtonContainer
        variantColor="teal"
        onClick={this.props.onClick}
        {...props}
      >
        {this.props.children}
      </ButtonContainer>
    )
  }
}

export default Button
