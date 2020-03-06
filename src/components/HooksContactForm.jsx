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
import { TiUser } from "react-icons/ti"
import Icon from "@chakra-ui/core/dist/Icon"

const p = require("phin")

const ModalFooter = styled("footer")`
  margin-top: 2em;
`

const ErrorMessage = styled(FormErrorMessage)`
  p {
    margin: 0;
  }
`

const HooksContactForm = ({ toast, defaultURL, ...props }) => {
  const firstNameReq = value =>
    !!value && value.length > 1 ? undefined : "Please enter your first name"
  const lastNameReq = value =>
    !!value && value.length > 1 ? undefined : "Please enter your last name"
  const phoneReq = value =>
    !!value && value.length > 1
      ? undefined
      : "Please enter a valid phone number"
  const emailReq = value =>
    !!value && value.length > 1 ? undefined : "Please enter a valid email"

  const emailValid = value =>
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
      value
    )
      ? undefined
      : "Please enter a valid email"

  const composeValidators = (...validators) => value =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined
    )

  const onSubmit = async values => {
    return await p({
      method: "post",
      url: new URL(`${defaultURL}api/submit`),
      data: values,
    })
  }

  const { form, handleSubmit, values, pristine, submitting } = useForm({
    onSubmit,
  })
  const firstName = useField("firstname", form, firstNameReq, {
    value: true,
    valid: true,
    error: true,
    touched: true,
  })
  const lastName = useField("lastname", form, lastNameReq, {
    value: true,
    valid: true,
    error: true,
    touched: true,
  })

  const phone = useField("phone", form, phoneReq, {
    value: true,
    valid: true,
    error: true,
    touched: true,
  })

  const email = useField(
    "email",
    form,
    composeValidators(emailReq, emailValid),
    {
      value: true,
      valid: true,
      error: true,
      touched: true,
    }
  )

  return (
    <form
      onSubmit={event => {
        handleSubmit(event).then(() => {
          form.reset()
          props.onClose()
          toast({
            title: "Message submitted",
            description: "We'll get back to you shortly.",
            status: "success",
            duration: 9000,
            isClosable: true,
          })
        })
      }}
    >
      <Box minWidth={{ md: "300px" }}>
        <FormControl
          isRequired
          isInvalid={firstName.meta.error && firstName.meta.touched}
          mb="15px"
        >
          <FormLabel htmlFor="firstname">First name</FormLabel>
          <InputGroup>
            <InputLeftElement
              children={<Box as={TiUser} size="20px" color="gray.300" />}
            />
            <Input
              id="firstname"
              placeholder="John"
              name="firstname"
              isInvalid={firstName.meta.error && firstName.meta.touched}
              {...firstName.input}
            />
          </InputGroup>

          {firstName.meta.error && (
            <ErrorMessage>{firstName.meta.error}</ErrorMessage>
          )}
        </FormControl>

        <FormControl
          isRequired
          isInvalid={lastName.meta.error && lastName.meta.touched}
          mb="15px"
        >
          <FormLabel htmlFor="lastname">Last name</FormLabel>
          <InputGroup>
            <InputLeftElement
              children={<Box as={TiUser} size="20px" color="gray.300" />}
            />
            <Input
              id="lastname"
              placeholder="Doe"
              name="lastname"
              isInvalid={lastName.meta.error && lastName.meta.touched}
              {...lastName.input}
            />
          </InputGroup>
          {lastName.meta.error && (
            <ErrorMessage>{lastName.meta.error}</ErrorMessage>
          )}
        </FormControl>

        <FormControl
          isRequired
          isInvalid={phone.meta.error && phone.meta.touched}
          mb="15px"
        >
          <FormLabel htmlFor="phone">Phone numbr</FormLabel>
          <InputGroup>
            <InputLeftElement
              children={<Icon name="phone" color="gray.300" />}
            />
            <Input
              id="phone"
              placeholder="+61 412 312 312"
              name="phone"
              isInvalid={phone.meta.error && phone.meta.touched}
              {...phone.input}
            />
          </InputGroup>
          {phone.meta.error && <ErrorMessage>{phone.meta.error}</ErrorMessage>}
        </FormControl>

        <FormControl
          isRequired
          isInvalid={email.meta.error && email.meta.touched}
          mb="15px"
        >
          <FormLabel htmlFor="email">Email address</FormLabel>
          <InputGroup>
            <InputLeftElement
              children={<Icon name="at-sign" color="gray.300" />}
            />
            <Input
              id="email"
              placeholder="john.doe@qimoda.com"
              name="email"
              isInvalid={email.meta.error && email.meta.touched}
              {...email.input}
            />
          </InputGroup>
          {email.meta.error && <ErrorMessage>{email.meta.error}</ErrorMessage>}
        </FormControl>
      </Box>

      <ModalFooter>
        <Button type="submit" isDisabled={pristine} isLoading={submitting}>
          <Text fontFamily="inherit" zIndex="1">
            Connect
          </Text>
        </Button>
      </ModalFooter>
    </form>
  )
}

export default HooksContactForm
