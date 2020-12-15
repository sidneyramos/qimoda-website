import React, { useEffect, useMemo, useState } from "react"
import styled from "@emotion/styled"
import colors from "styles/colors"
import dimensions from "styles/dimensions"
import Heading from "@chakra-ui/core/dist/Heading"
import DashboardCard from "components/dashboard/_ui/DashboardCard"
import Text from "@chakra-ui/core/dist/Text"
import Box from "@chakra-ui/core/dist/Box"
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/core/dist/Accordion"
import { createEditor } from "slate"
import { Slate, Editable, withReact } from "slate-react"
import { TiPlus } from "react-icons/ti"
import IconButton from "@chakra-ui/core/dist/IconButton"

const AddButton = styled(IconButton)`
  border: initial;
  cursor: pointer;
`

const StyledAccordionHeader = styled(AccordionHeader)`
  background-color: transparent;
  border: initial;
  font-family: "Rubik";
  font-size: 16px;
`

const StyledAccordionItem = styled(AccordionItem)`
  border-top: 1px solid rgb(226, 232, 240);

  &:last-of-type {
    border-bottom: 1px solid rgb(226, 232, 240);
  }
`

const StyledAccordionPanel = styled(AccordionPanel)`
  font-size: 14px;
`

const EditableContent = () => {
  const editor = useMemo(() => withReact(createEditor()), [])
  const [value, setValue] = useState([
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }],
    },
  ])

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={newValue => setValue(newValue)}
    >
      <Editable />
    </Slate>
  )
}

const Card = ({ children, title, ...props }) => {
  return (
    <DashboardCard title={title}>
      <AddButton
        aria-label="Instant Action Button"
        icon={TiPlus}
        width="100%"
        size="sm"
        fontSize="15px"
        height="auto"
        padding="2.5px 0"
        mt="1em"
        onClick={() => {
          console.log("alskjalskjljks")
        }}
      />

      <Accordion defaultIndex={[]} allowMultiple marginTop="5px">
        <StyledAccordionItem>
          <StyledAccordionHeader>
            <Box flex="1" textAlign="left">
              Section 1 title
            </Box>
            <AccordionIcon />
          </StyledAccordionHeader>
          <StyledAccordionPanel pb={4}>
            <EditableContent />
          </StyledAccordionPanel>
        </StyledAccordionItem>

        <StyledAccordionItem>
          <StyledAccordionHeader>
            <Box flex="1" textAlign="left">
              Section 2 title
            </Box>
            <AccordionIcon />
          </StyledAccordionHeader>
          <StyledAccordionPanel pb={4}>
            <EditableContent />
          </StyledAccordionPanel>
        </StyledAccordionItem>
      </Accordion>
    </DashboardCard>
  )
}

export default Card
