import React from "react"
import Link from "components/_ui/Link"
import styled from "@emotion/styled"
import colors from "styles/colors"
import Logo from "components/_ui/Logo"
import qimoda from "images/qimoda/5.png"

const FooterContainer = styled("div")`
  padding-top: 3.75em;
  padding-bottom: 3em;
  display: flex;
  flex-direction: column;
  align-items: center;

  svg {
    max-width: 50px;
  }
`

const FooterAuthor = styled("a")`
  font-size: 0.75em;
  color: ${colors.grey700};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  margin-top: 1.5em;

  .footerLogoContainer {
    position: relative;
  }

  h1 {
    font-size: 45px;
    margin: 0;
    color: ${colors.qimodaDark};
  }

  &:hover {
    color: ${colors.blue900};

    h1 {
      color: ${colors.qimodaDark};
    }
  }

  .FooterSpooch {
    animation-name: flash;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes flash {
    0%,
    87%,
    95% {
      filter: brightness(100%);
    }
    93%,
    99%,
    100% {
      filter: brightness(200%);
    }
  }
`

const FooterSpooch = styled("img")`
  max-width: 20px;
  margin-top: 0.25em;
  position: absolute;
  top: 10px;
  left: 8px;
  z-index: -1;
`

const Footer = () => (
  <FooterContainer>
    <FooterAuthor>
      © 2020 — Qimoda Digital
      <div className="footerLogoContainer">
        <h1 className="footerLogo">Q</h1>
        <FooterSpooch className="FooterSpooch" src={qimoda} />
      </div>
    </FooterAuthor>
  </FooterContainer>
)

export default Footer
