import React from "react"
import styled from "@emotion/styled"
import Button from "components/_ui/Button"
import Text from "@chakra-ui/core/dist/Text"
import FormControl from "@chakra-ui/core/dist/FormControl"
import FormLabel from "@chakra-ui/core/dist/FormLabel"
import InputGroup from "@chakra-ui/core/dist/InputGroup"
import { InputLeftElement } from "@chakra-ui/core/dist/InputElement"
import Input from "@chakra-ui/core/dist/Input"
import FormErrorMessage from "@chakra-ui/core/dist/FormErrorMessage"
import { useForm, useField } from "react-final-form-hooks"
import Box from "@chakra-ui/core/dist/Box"
import { TiMail, TiLockOpen } from "react-icons/ti"
import Icon from "@chakra-ui/core/dist/Icon"
import useToast from "@chakra-ui/core/dist/Toast"
import FadeIn from "react-fade-in"
import * as firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
const CryptoJS = require("crypto-js")

const p = require("phin")

const FormFooter = styled("footer")`
  margin-top: 2em;
`

const ErrorMessage = styled(FormErrorMessage)`
  p {
    margin: 0;
  }
`

const HooksLoginForm = ({ defaultURL, setLoggedIn, ...props }) => {
  const toast = useToast()
  const emailReq = value =>
    !!value && value.length > 1 ? undefined : "Please enter your email"
  const passwordReq = value =>
    !!value && value.length > 1 ? undefined : "Please enter your password"

  const onSubmit = async values => {
    const res = await p({
      method: "post",
      url: new URL(`${defaultURL}/api/login`),
      data: values,
    })

    const { message, data, settings, uid, sessionToken } = JSON.parse(
      new TextDecoder("utf-8").decode(res.body)
    )
    const isError = res.statusCode !== 200

    const successResponse = message => ({
      title: "Success",
      description: message,
      status: "success",
      duration: 9000,
      isClosable: true,
    })

    const errorResponse = message => ({
      title: "Error",
      description: message,
      status: "error",
      duration: 9000,
      isClosable: true,
    })

    if (!isError) {
      sessionStorage.setItem("user", data + `%${uid}`)
      sessionStorage.setItem("set", settings)

      const parsedSettings = JSON.parse(
        CryptoJS.AES.decrypt(settings, uid).toString(CryptoJS.enc.Utf8)
      )
      if (firebase.apps.length === 0) {
        firebase.initializeApp(parsedSettings)
      }
      try {
        await firebase
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.SESSION)
        await firebase.auth().signInWithCustomToken(sessionToken)
        toast(successResponse(message))
        setLoggedIn(true)
      } catch (error) {
        var errorMessage = error.message
        toast(errorResponse(errorMessage))
      }
    } else {
      toast(errorResponse(message))
    }
  }

  const { form, handleSubmit, values, pristine, submitting } = useForm({
    onSubmit,
  })

  const email = useField("email", form, emailReq, {
    value: true,
    valid: true,
    error: true,
    touched: true,
  })
  const password = useField("password", form, passwordReq, {
    value: true,
    valid: true,
    error: true,
    touched: true,
  })

  return (
    <form
      onSubmit={async event => {
        return handleSubmit(event)
      }}
    >
      <Box minWidth={{ md: "300px" }}>
        <FadeIn transitionDuration={500}>
          <FormControl
            isRequired
            isInvalid={email.meta.error && email.meta.touched}
            mb="15px"
          >
            <InputGroup>
              <InputLeftElement
                children={<Box as={TiMail} size="20px" color="gray.300" />}
              />
              <Input
                id="email"
                placeholder="Email"
                name="email"
                isInvalid={email.meta.error && email.meta.touched}
                {...email.input}
              />
            </InputGroup>

            {email.meta.error && (
              <ErrorMessage>{email.meta.error}</ErrorMessage>
            )}
          </FormControl>

          <FormControl
            isRequired
            isInvalid={password.meta.error && password.meta.touched}
            mb="15px"
          >
            <InputGroup>
              <InputLeftElement
                children={<Box as={TiLockOpen} size="20px" color="gray.300" />}
              />
              <Input
                id="password"
                placeholder="Password"
                name="password"
                type="password"
                isInvalid={password.meta.error && password.meta.touched}
                {...password.input}
              />
            </InputGroup>
            {password.meta.error && (
              <ErrorMessage>{password.meta.error}</ErrorMessage>
            )}
          </FormControl>
        </FadeIn>
      </Box>

      <FormFooter>
        <Button type="submit" isDisabled={pristine} isLoading={submitting}>
          <Text fontFamily="inherit" zIndex="1">
            Connect
          </Text>
        </Button>
      </FormFooter>
    </form>
  )
}

export default HooksLoginForm
