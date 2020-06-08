import React, { useRef, useState } from "react"
import styled from "@emotion/styled"
import colors from "styles/colors"
import dimensions from "styles/dimensions"
import Heading from "@chakra-ui/core/dist/Heading"
import Box from "@chakra-ui/core/dist/Box"
import Flex from "@chakra-ui/core/dist/Flex"
import FadeIn from "react-fade-in"
import DashboardCard from "components/dashboard/_ui/DashboardCard"
import Text from "@chakra-ui/core/dist/Text"
import IconButton from "@chakra-ui/core/dist/IconButton"
import useCollapse from "react-collapsed"
import {
  TiBrush,
  TiDocumentText,
  TiFlashOutline,
  TiDevicePhone,
  TiLinkOutline,
  TiChevronRight,
  TiFlagOutline,
  TiThumbsUp,
  TiThumbsOk,
  TiThumbsDown,
} from "react-icons/ti"

const dayjs = require("dayjs")
const relativeTime = require("dayjs/plugin/relativeTime")
var customParseFormat = require("dayjs/plugin/customParseFormat")
dayjs.extend(customParseFormat).extend(relativeTime)

const MeetingCard = styled(Box)`
  padding: 10px;
  border-radius: 6px;
  background: linear-gradient(
    180deg,
    rgba(192, 228, 228, 0.5) 0%,
    rgba(177, 212, 252, 0.5) 100%
  );
  width: 100%;
  box-shadow: 0px 2px 5px rgba(173, 191, 191, 0.2);
  &:not(:first-of-type) {
    margin-top: 5px;
  }
  margin-bottom: 5px;
`

const MeetingCardContainer = styled(Box)`
  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 15px;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 1) 100%
    );
    bottom: 0;
  }

  &.at-bottom {
    &:after {
      display: none;
    }
  }
`

const LogoButton = styled(IconButton)`
  border: initial;
  cursor: pointer;
`

const ChevronDown = styled(TiChevronRight)`
  transform: rotate(90deg);
  transition: 0.3s;
`

const CollapseButton = styled(IconButton)`
  border: initial;
  cursor: pointer;
  background-color: rgba(117, 117, 117, 0.05);

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  &.is-open ${ChevronDown} {
    transform: rotate(270deg);
  }
`

const Collapsible = styled.div``

const Card = ({ children, title, logo, aboveHeader, ...props }) => {
  const meetingCardContainer = useRef(null)
  const [atBottom, setAtBottom] = useState(false)
  const date = dayjs().format("D")
  const month = dayjs().format("MMMM")
  const year = dayjs().format("YYYY")
  const day = dayjs().format("dddd")

  const { getCollapseProps, getToggleProps, isOpen } = useCollapse()

  const onScroll = () => {
    // `current` points to the mounted text input element
    const element = meetingCardContainer.current
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      setAtBottom(true)
    } else {
      if (atBottom) {
        setAtBottom(false)
      }
    }
  }

  return (
    <DashboardCard aboveHeader={aboveHeader}>
      <Flex flexWrap={{ xs: "wrap", md: "initial" }}>
        <Flex flex={{ xs: "1 0 100%", md: "1 0 50%" }} mr={{ md: "10px" }}>
          <Flex mr="0.5rem" alignItems="center">
            <Heading
              as="h2"
              my="0"
              lineHeight="1"
              fontSize="5rem"
              color={colors.qimodaDark}
            >
              {date}
            </Heading>
          </Flex>
          <Flex
            direction="column"
            justifyContent="center"
            color={colors.qimodaDark}
          >
            <Heading
              as="h3"
              fontWeight="500"
              fontSize="1rem"
              lineHeight="1"
              my="2.5px"
            >
              {month}
            </Heading>
            <Heading
              as="h3"
              fontWeight="500"
              fontSize="1rem"
              lineHeight="1"
              my="2.5px"
            >
              {year}
            </Heading>
            <Heading
              as="h3"
              fontWeight="500"
              fontSize="1rem"
              lineHeight="1"
              my="2.5px"
            >
              {day}
            </Heading>
          </Flex>
        </Flex>
        <Box flex={{ xs: "1 0 100%", md: "1 1 50%" }}>
          <MeetingCard>
            <Text my="0" lineHeight="normal">
              9:00AM
            </Text>
            <Text my="0" lineHeight="normal" fontWeight="500">
              Stand-up Meeting
            </Text>
            <CollapseButton
              className={`${isOpen ? "is-open" : ""}`}
              aria-label="Instant Action Button"
              icon={ChevronDown}
              width="100%"
              size="sm"
              fontSize="15px"
              height="auto"
              padding="2.5px 0"
              mt="10px"
              {...getToggleProps()}
            />
          </MeetingCard>
        </Box>
      </Flex>
      <Collapsible {...getCollapseProps()}>
        <MeetingCardContainer
          className={`${atBottom ? "at-bottom" : ""}`}
          position="relative"
        >
          <Box
            height="150px"
            overflowY="scroll"
            ref={meetingCardContainer}
            onScroll={onScroll}
          >
            <MeetingCard>
              <Text my="0" lineHeight="normal">
                9:15AM
              </Text>
              <Text my="0" lineHeight="normal" fontWeight="500">
                Stand-up Meeting
              </Text>
            </MeetingCard>
            <MeetingCard>
              <Text my="0" lineHeight="normal">
                9:30AM
              </Text>
              <Text my="0" lineHeight="normal" fontWeight="500">
                Stand-up Meeting
              </Text>
            </MeetingCard>
            <MeetingCard>
              <Text my="0" lineHeight="normal">
                9:30AM
              </Text>
              <Text my="0" lineHeight="normal" fontWeight="500">
                Stand-up Meeting
              </Text>
            </MeetingCard>
            <MeetingCard>
              <Text my="0" lineHeight="normal">
                9:30AM
              </Text>
              <Text my="0" lineHeight="normal" fontWeight="500">
                Stand-up Meeting
              </Text>
            </MeetingCard>
          </Box>
        </MeetingCardContainer>
      </Collapsible>
      <Flex justifyContent="space-between" my="10px">
        <LogoButton
          aria-label="Instant Action Button"
          icon={TiFlashOutline}
          size="lg"
          fontSize="25px"
        />
        <LogoButton
          aria-label="Instant Action Button"
          icon={TiFlashOutline}
          size="lg"
          fontSize="25px"
        />
        <LogoButton
          aria-label="Instant Action Button"
          icon={TiFlashOutline}
          size="lg"
          fontSize="25px"
        />
        <LogoButton
          aria-label="Instant Action Button"
          icon={TiFlashOutline}
          size="lg"
          fontSize="25px"
        />
        <LogoButton
          aria-label="Instant Action Button"
          icon={TiFlashOutline}
          size="lg"
          fontSize="25px"
        />
        <LogoButton
          aria-label="Instant Action Button"
          icon={TiFlashOutline}
          size="lg"
          fontSize="25px"
        />
      </Flex>
    </DashboardCard>
  )
}

export default Card
