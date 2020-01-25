import css from "@emotion/css"
import dimensions from "styles/dimensions"

const logoStyles = css`
  .logo-link {
    text-decoration: none;

    .logo {
      position: relative;
      h1 {
        margin: 0;
        font-weight: 700;
        color: #003437;
      }

      svg {
        position: absolute;
        top: 11px;
        left: 5px;
        z-index: -1;
      }
    }
  }
`

export default logoStyles
