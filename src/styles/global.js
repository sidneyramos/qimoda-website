import css from "@emotion/css"
import colors from "styles/colors"
import dimensions from "styles/dimensions"

const globalStyles = css`
  html,
  body,
  #root {
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 100%;
  }

  body {
    width: 100%;
    margin: 0 auto;
    font-size: 16px;
    line-height: 1.5;
    color: ${colors.qimodaDarker};
    -webkit-font-smoothing: antialiased;

    @media (max-width: ${dimensions.maxwidthMobile}px) {
      font-size: 14px;
    }

    * {
      box-sizing: border-box;

      &::selection {
        color: ${colors.qimodaLight};
        background-color: ${colors.teal200};
      }
    }
  }

  a {
    color: ${colors.qimodaLight};
    transition: 0.3s;

    &:hover {
      color: ${colors.qimodaLighter};
    }
  }

  // button {
  //   border: initial;
  //   background-color: initial;
  //   cursor: pointer;

  //   svg {
  //     path {
  //       fill: white;
  //     }
  //   }
  // }

  .modal {
    .modal-overlay {
      z-index: 10;
      .modal-container {
        position: relative;
      }
    }
  }

  .chart-container {
    * {
      font-family: Rubik, -apple-system, BlinkMacSystemFont, Helvetica,
        sans-serif;
    }
    .chart-legend {
      display: none;
    }

    .graph-svg-tip {
      ul {
        &.data-point-list {
          li {
            font-weight: 400;
          }
        }
      }
    }
  }

  /*
    A workaround for forcing accessibility wrappers
    to have a 100% height.
    Reach Router issue here: https: //github.com/reach/router/issues/63
    */
  #___gatsby,
  div[role="group"][tabindex] {
    height: 100%;
    min-height: 100% !important;
  }
`

export default globalStyles
