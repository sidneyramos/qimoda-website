import React, { Component } from "react"
import styled from "@emotion/styled"
import colors from "styles/colors"
import dimensions from "styles/dimensions"
import qimoda from "images/qimoda/5.svg"
import Button from "@chakra-ui/core/dist/Button"

const ButtonContainer = styled(Button)`
  padding: 1em 2em;
  font-weight: 600;
  color: white;
  outline: none;
  border: none;
  font-size: 1rem;
  border-radius: 5px;
  position: relative;
  transition: background 100ms ease-in-out;
  background-color: ${colors.qimodaDarker}
  position: relative;
  height: auto;
  overflow: hidden;

  &:after {
    content: "";
    width: 35px;
    height: 70px;
    position: absolute;
    bottom: -14px;
    left: 25px;
    opacity: 0;
    transition: 0.5s;

    background-image: url('${qimoda}');
    background-size: cover;
    filter: brightness(300%);

    // @media (max-width: ${dimensions.maxwidthTablet}px) {
    //   bottom: calc(-0.25em - 2px);
    // }
  }

  @media (max-width: ${dimensions.maxwidthMobile}px) {
    padding: 1.2em 1.8em;
    font-size: 1em;
  }

  p {
    margin: 0;
    line-height: 1;
    position: relative;
  }


  &:hover {
    cursor: pointer;

    &:after {
      opacity: 0.4;
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

class ButtonComponent extends Component {
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

export default ButtonComponent
