import React, { useState } from "react"
import styled from "@emotion/styled"
import colors from "styles/colors"
import dimensions from "styles/dimensions"
import Heading from "@chakra-ui/core/dist/Heading"
import DashboardCard from "components/dashboard/_ui/DashboardCard"
import DraggableTask from "components/dashboard/_ui/TasksCard/DraggableTask"
import Text from "@chakra-ui/core/dist/Text"
import Box from "@chakra-ui/core/dist/Box"
import {
  TasksContext,
  DatabaseContext,
  LoadingContext,
} from "components/Context"

const Card = ({ children, title, logo, aboveHeader, ...props }) => {
  return (
    <DashboardCard title={title}>
      <LoadingContext.Consumer>
        {loading => {
          return (
            <TasksContext.Consumer>
              {tasks => {
                return (
                  <DatabaseContext.Consumer>
                    {database => {
                      return (
                        <DraggableTask
                          loading={loading}
                          tasks={tasks}
                          database={database}
                        />
                      )
                    }}
                  </DatabaseContext.Consumer>
                )
              }}
            </TasksContext.Consumer>
          )
        }}
      </LoadingContext.Consumer>
    </DashboardCard>
  )
}

export default Card
