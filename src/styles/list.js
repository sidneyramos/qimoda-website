import css from "@emotion/css"
import dimensions from "styles/dimensions"
import qimoda from "images/qimoda/5.svg"

const listStyles = css`
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

  ul {
    list-style: none;
    padding-left: 30px;

    li {
      position: relative;

      &:before {
        content: "";
        position: absolute;
        display: block;
        height: 19px;
        width: 9px;
        left: -15px;
        top: 3px;
        background-image: url('${qimoda}');
        background-size: cover;
        animation-name: flash;
        animation-duration: 3s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
      }
    }
  }
`

export default listStyles
