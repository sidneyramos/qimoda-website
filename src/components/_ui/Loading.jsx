import React from "react"
import styled from "@emotion/styled"

const LoadingDot = styled.div`
  @keyframes dot-keyframes {
    0% {
      opacity: 0.4;
      transform: scale(1, 1);
    }

    50% {
      opacity: 1;
      transform: scale(1.2, 1.2);
    }

    100% {
      opacity: 0.4;
      transform: scale(1, 1);
    }
  }

  animation: dot-keyframes 1.5s infinite ease-in-out;
  background-color: #07656b;
  border-radius: 100%;
  display: inline-block;
  height: 6px;
  width: 6px;
  margin-right: 5px;
  margin-left: 5px;

  &:nth-child(2) {
    animation-delay: 0.5s;
  }

  &:nth-child(3) {
    animation-delay: 1s;
  }
`

const LoadingDots = styled.div`
  text-align: center;
  width: 100%;
  margin-top: 10px;
`

const Loading = () => (
  <LoadingDots>
    <LoadingDot />
    <LoadingDot />
    <LoadingDot />
  </LoadingDots>
)

export default Loading
