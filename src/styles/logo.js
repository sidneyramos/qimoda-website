import css from "@emotion/css"
import dimensions from "styles/dimensions"

const logoStyles = css`
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

  .logo-link {
    text-decoration: none;
  }

  .logo {
    position: relative;

    &.hide-heading {
      height: 25px;
      width: 15px;
      margin-right: 5px;
    }

    h1 {
      line-height: 1;
      margin: 0;
      font-weight: 700;
      color: #003437;
    }

    svg {
      height: 100%;
      position: absolute;
      margin-top: 1%;
      top: 0;
      left: 4%;
      z-index: -1;
      animation-name: flash;
      animation-duration: 3s;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
    }
  }
`

export default logoStyles
