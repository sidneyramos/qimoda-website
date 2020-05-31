import React, { useState, useEffect, useRef } from "react"
import styled from "@emotion/styled"
import colors from "styles/colors"
import dimensions from "styles/dimensions"
import Heading from "@chakra-ui/core/dist/Heading"
import Text from "@chakra-ui/core/dist/Text"
import Flex from "@chakra-ui/core/dist/Flex"
import IconButton from "@chakra-ui/core/dist/IconButton"
import useToast from "@chakra-ui/core/dist/Toast"

import Button from "@chakra-ui/core/dist/Button"

import Input from "@chakra-ui/core/dist/Input"
import InputGroup from "@chakra-ui/core/dist/InputGroup"
import { InputRightElement } from "@chakra-ui/core/dist/InputElement"

import { TiPlus, TiTimes, TiPencil, TiTick } from "react-icons/ti"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import "react-micro-modal/dist/index.css"
import Loadable from "react-loadable"

const LoadedModal = Loadable({
  loader: () => import("react-micro-modal"),
  loading: () => null,
})

const CollapseButton = styled(IconButton)`
  border: initial;
  cursor: pointer;
`

const TaskButton = styled(IconButton)`
  border: initial;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.3);

  &:hover {
    background-color: rgba(255, 255, 255, 0.8);
  }
`

const ChangeTaskButton = styled(IconButton)`
  border: initial;
  cursor: pointer;
  background-color: rgba(56, 161, 105, 0.3);

  &:hover {
    background-color: rgba(56, 161, 105, 0.8);
  }
`

const ModalDeleteButton = styled(Button)`
  border: initial;
  cursor: pointer;
`

const TaskInput = styled(Input)`
  border: none;
  border-bottom: 1px solid #5b8f9261;
  border-radius: 0;
  height: auto;
  line-height: initial;
  font-size: 0.9rem;
  font-weight: 500;
  margin-right: 5px;
`

const InputForm = styled.form`
  width: 100%;
`

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const grid = 5

const MeetingCard = styled.div`
  &:focus {
    outline: initial;
  }
`

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  boxShadow: `0px 2px 5px rgba(173, 191, 191, 0.2)`,
  borderRadius: 6,
  background: isDragging
    ? `linear-gradient(
    180deg,
    rgba(192, 228, 228, 1) 0%,
    rgba(177, 212, 252, 1) 100%
  )`
    : `linear-gradient(
    180deg,
    rgba(192, 228, 228, 0.5) 0%,
    rgba(177, 212, 252, 0.5) 100%
  )`,
  ...draggableStyle,
})

const getListStyle = isDraggingOver => ({
  marginTop: "5px",
  width: "100%",
  overflowY: "scroll",
  maxHeight: 300,
  position: "relative",
})

const FormModal = ({ taskIndex, isOpen, onClose, onConfirm }) => {
  const toast = useToast()
  return (
    <LoadedModal closeOnAnimationEnd open={isOpen} handleClose={onClose}>
      {() => (
        <>
          <Text>Are you sure you want to delete this task?</Text>
          <ModalDeleteButton
            variantColor="red"
            size="md"
            onClick={() => {
              toast({
                position: "bottom-right",
                title: "Task deleted.",
                description: "We've deleted that task for you.",
                status: "success",
                duration: 7000,
                isClosable: true,
              })
              onConfirm(taskIndex)
              onClose()
            }}
          >
            Delete
          </ModalDeleteButton>
          <ModalDeleteButton
            ml="10px"
            variantColor="gray"
            size="md"
            onClick={() => onClose()}
          >
            Cancel
          </ModalDeleteButton>
        </>
      )}
    </LoadedModal>
  )
}

const EditingTask = ({ item, index, changeName }) => {
  const toast = useToast()
  const inputEl = useRef(null)
  const [inputValue, setInputValue] = useState(item.content)
  useEffect(() => {
    inputEl.current.focus()
  }, [])
  return (
    <Flex my="0" lineHeight="normal" fontWeight="500">
      <InputForm
        onSubmit={e => {
          e.preventDefault()
          toast({
            position: "bottom-right",
            title: "Task changed",
            description: "Successfully changed task details",
            status: "success",
            duration: 7000,
            isClosable: true,
          })
          changeName(index, inputValue)
        }}
      >
        <InputGroup>
          <TaskInput
            ref={inputEl}
            variant="unstyled"
            value={inputValue}
            onChange={e => {
              setInputValue(e.target.value)
            }}
            placeholder={!item.content ? "New task" : item.content}
            onBlur={e => {
              changeName(index, inputValue)
            }}
          />
          <InputRightElement
            width="auto"
            height="auto"
            position="initial"
            children={
              <ChangeTaskButton size="xs" icon={TiTick} type="submit" />
            }
          />
        </InputGroup>
      </InputForm>
    </Flex>
  )
}

const DragTaskApp = ({ tasks, database, ...props }) => {
  const newTasks = tasks.map((item, index) => ({
    id: `item-${index}`,
    content: item.title,
  }))
  const [items, setItems] = useState(newTasks)
  const [modalOpen, setModalOpen] = useState(false)
  const [currentTaskDelete, setTaskDelete] = useState(0)

  useEffect(() => {
    if (JSON.stringify(items) !== JSON.stringify(newTasks)) {
      setItems(newTasks)
    }
  }, [tasks])

  const createTask = () => {
    const newItems = items.map((item, index) => ({
      id: `item-${index + 1}`,
      content: item.content,
      isNewTask: item.isNewTask,
    }))

    newItems.unshift({
      id: "item-0",
      content: "",
      isNewTask: true,
    })

    setItems(newItems)
  }

  const deleteTask = index => {
    items.splice(index, 1)
    const newItems = items.map((item, index) => ({
      id: `item-${index + 1}`,
      content: item.content,
      isNewTask: item.isNewTask,
    }))
    const dbItems = newItems.map(item => ({ title: item.content }))

    setItems(newItems)
    if (database.db && database.uid) {
      database.db
        .collection("tasks")
        .doc(database.uid)
        .set({ taskArray: dbItems })
    }
  }

  const editTask = id => {
    const newItems = items.map((item, index) =>
      id === index
        ? {
            id: `item-${id + 1}`,
            content: item.content,
            isNewTask: true,
          }
        : {
            id: `item-${index + 1}`,
            content: item.content,
            isNewTask: item.isNewTask,
          }
    )

    setItems(newItems)
  }

  const changeName = (id, newContent) => {
    const newItems = items.map((item, index) =>
      id === index
        ? {
            id: `item-${id + 1}`,
            content: newContent,
            isNewTask: false,
          }
        : {
            id: `item-${index + 1}`,
            content: item.content,
            isNewTask: item.isNewTask,
          }
    )
    const dbItems = newItems.map(item => ({ title: item.content }))

    setItems(newItems)
    if (database.db && database.uid) {
      database.db
        .collection("tasks")
        .doc(database.uid)
        .set({ taskArray: dbItems })
    }
  }

  const onDragEnd = result => {
    if (!result.destination) {
      return
    }

    const newItems = reorder(
      items,
      result.source.index,
      result.destination.index
    )

    const dbItems = newItems.map(item => ({ title: item.content }))

    setItems(newItems)

    if (database.db && database.uid) {
      database.db
        .collection("tasks")
        .doc(database.uid)
        .set({ taskArray: dbItems })
    }
  }

  return (
    <>
      <CollapseButton
        aria-label="Instant Action Button"
        icon={TiPlus}
        width="100%"
        size="sm"
        fontSize="15px"
        height="auto"
        padding="2.5px 0"
        mt="1em"
        onClick={createTask}
      />
      <FormModal
        onConfirm={deleteTask}
        taskIndex={currentTaskDelete}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => {
                    return (
                      <MeetingCard
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        {/* <Text my="0" lineHeight="normal">
                          9:00AM
                        </Text> */}
                        {!item.isNewTask ? (
                          <Flex
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Text my="0" lineHeight="normal" fontWeight="500">
                              {item.content}
                            </Text>
                            <Flex>
                              <TaskButton
                                size="xs"
                                icon={TiPencil}
                                onClick={() => {
                                  editTask(index)
                                }}
                                mr="5px"
                              />
                              <TaskButton
                                size="xs"
                                icon={TiTimes}
                                onClick={() => {
                                  setTaskDelete(index)
                                  setModalOpen(true)
                                }}
                              />
                            </Flex>
                          </Flex>
                        ) : (
                          <EditingTask
                            item={item}
                            index={index}
                            changeName={changeName}
                          />
                        )}
                      </MeetingCard>
                    )
                  }}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  )
}

export default DragTaskApp
