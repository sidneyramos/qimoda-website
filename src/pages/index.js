import React, { useState } from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import RichText from "prismic-reactjs/src/Component"
import { graphql } from "gatsby"
import styled from "@emotion/styled"
import colors from "styles/colors"
import dimensions from "styles/dimensions"
import Button from "components/_ui/Button"
import About from "components/About"
import Layout from "components/Layout"
import Link from "components/_ui/Link"
import ProjectCard from "components/ProjectCard"
import lottiebg from "../images/lottiebg-min.png"

import { TiUser } from "react-icons/ti"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/core/dist/Modal"
import useDisclosure from "@chakra-ui/core/dist/useDisclosure"
import useToast from "@chakra-ui/core/dist/Toast"
import FormControl from "@chakra-ui/core/dist/FormControl"
import FormLabel from "@chakra-ui/core/dist/FormLabel"
import Input from "@chakra-ui/core/dist/Input"
import InputGroup from "@chakra-ui/core/dist/InputGroup"
import Icon from "@chakra-ui/core/dist/Icon"
import { InputLeftElement } from "@chakra-ui/core/dist/InputElement"
import FormErrorMessage from "@chakra-ui/core/dist/FormErrorMessage"
import Box from "@chakra-ui/core/dist/Box"
import Heading from "@chakra-ui/core/dist/Heading"
import Text from "@chakra-ui/core/dist/Text"
import Flex from "@chakra-ui/core/dist/Flex"

import Lottie from "react-lottie"
import heroAnimation from "../data/animation1.json"
import { SlideIn } from "@chakra-ui/core/dist/Transition"
import { useForm, useField } from "react-final-form-hooks"

const axios = require("axios")

const Hero = styled(Box)`
  margin: 0 auto;
  text-align: left;
  font-family: Rubik, -apple-system, BlinkMacSystemFont, Helvetica, sans-serif;

  @media (max-width: ${dimensions.maxwidthMobile}px) {
    margin-bottom: 3em;
  }
`

const Section = styled("div")`
  margin-bottom: 6em;
  display: flex;
  flex-direction: column;

  @media (max-width: ${dimensions.maxwidthTablet}px) {
    margin-bottom: 4em;
  }

  &:last-of-type {
    margin-bottom: 0;
  }
`

const WorkAction = styled(Link)`
  font-weight: 600;
  color: ${colors.qimodaDarker};
  text-decoration: none;
  transition: all 150ms ease-in-out;
  margin-left: auto;

  @media (max-width: ${dimensions.maxwidthTablet}px) {
    margin: 0 auto;
  }

  span {
    margin-left: 1em;
    transform: translateX(-8px);
    display: inline-block;
    transition: transform 400ms ease-in-out;
  }

  &:hover {
    color: ${colors.qimodaDarker};
    transition: all 150ms ease-in-out;

    span {
      transform: translateX(0px);
      opacity: 1;
      transition: transform 150ms ease-in-out;
    }

    p {
      &:after {
        opacity: 0.25;
        transform: translateX(0);
      }
    }
  }

  p {
    display: inline-block;
    position: relative;
    z-index: 1;

    &:after {
      z-index: -1;
      content: "";
      display: block;
      position: absolute;
      height: 50%;
      width: 100%;
      transform: translateX(-15px);
      opacity: 0;
      background-color: ${colors.qimodaLight};
      bottom: 0;
      left: 0;
      transition: 0.5s;
    }
  }
`

const ErrorMessage = styled(FormErrorMessage)`
  p {
    margin: 0;
  }
`

const ModalClose = styled(ModalCloseButton)`
  svg {
    path {
      fill: black;
    }
  }
`

const heroAnimationOptions = {
  loop: false,
  autoplay: true,
  animationData: heroAnimation,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
}

const HooksContactForm = props => {
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

  const toast = useToast()

  const onSubmit = async values => {
    return await axios({
      method: "post",
      url: "/api/submit",
      data: values,
    })
  }

  const { form, handleSubmit, values, pristine, submitting } = useForm({
    onSubmit, // the function to call with your form values upon valid submit
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
      <ModalBody>
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
          <FormLabel htmlFor="phone">Phone number</FormLabel>
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
      </ModalBody>

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

const RenderBody = ({ home, projects, meta, posts }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [animPaused, setAnimPaused] = useState(false)

  return (
    <>
      <Helmet
        title={meta.title}
        titleTemplate={`%s`}
        meta={[
          {
            name: `description`,
            content: meta.description,
          },
          {
            property: `og:title`,
            content: meta.title,
          },
          {
            property: `og:description`,
            content: meta.description,
          },
          {
            property: `og:type`,
            content: `website`,
          },
          {
            name: `twitter:card`,
            content: `summary`,
          },
          {
            name: `twitter:creator`,
            content: meta.author,
          },
          {
            name: `twitter:title`,
            content: meta.title,
          },
          {
            name: `twitter:description`,
            content: meta.description,
          },
        ].concat(meta)}
      />
      <Hero pt={{ md: "2.5em" }} pb="3em">
        <Flex flexWrap="wrap">
          <Flex
            width={{ xs: "100%", md: "auto" }}
            flex={{ xs: "1 0 100%", md: "1" }}
            flexDirection="column"
            pt="2em"
          >
            <Box>
              <Heading
                fontFamily="inherit"
                as="h1"
                fontWeight="500"
                lineHeight="1"
                m="0"
                mt="0.5em"
                mb="0.25em"
                textAlign={{ xs: "center", md: "left" }}
              >
                We make good brands
              </Heading>
              <Heading
                fontFamily="inherit"
                as="h1"
                fontWeight="500"
                lineHeight="1"
                m="0"
                mb="0.6em"
                textAlign={{ xs: "center", md: "left" }}
              >
                become{" "}
                <Box as="span" color={colors.qimodaLight}>
                  remarkable.
                </Box>
              </Heading>

              <Heading
                fontFamily="inherit"
                as="h3"
                fontWeight="400"
                fontSize="0.9rem"
                color="#353535"
                lineHeight="1"
                m="0"
                mb="2rem"
                textAlign={{ xs: "center", md: "left" }}
              >
                Website Design | Development | Content
              </Heading>
              <Button
                onClick={onOpen}
                margin={{ xs: "40px auto", md: "0" }}
                display="block"
              >
                {/* {RichText.render(home.hero_button_text)} */}
                <Text fontFamily="inherit" zIndex="1">
                  Get in touch now
                </Text>
              </Button>
            </Box>
          </Flex>
          <Box
            width={{ xs: "100%", md: "auto" }}
            flex={{ xs: "1 0 100%", md: "1" }}
            backgroundImage={`url(${lottiebg})`}
            backgroundSize="cover"
          >
            <Lottie
              ariaRole="img"
              title="qimoda-animation"
              options={heroAnimationOptions}
              isPaused={animPaused}
              isClickToPauseDisabled={true}
              eventListeners={[
                {
                  eventName: "enterFrame",
                  callback: e => {
                    if (e.currentTime > 107) {
                      setAnimPaused(true)
                    }
                  },
                },
              ]}
              height={400}
            />
          </Box>
        </Flex>
        <SlideIn in={isOpen}>
          {styles => (
            <Modal isOpen={true} onClose={onClose}>
              <ModalOverlay opacity={styles.opacity} />
              <ModalContent backgroundColor="white" {...styles}>
                <ModalHeader>CONNECT WITH US</ModalHeader>
                <ModalClose />

                <HooksContactForm onClose={onClose} />
              </ModalContent>
            </Modal>
          )}
        </SlideIn>
      </Hero>
      <Section>
        {projects.map((project, i) => (
          <ProjectCard
            key={i}
            category={project.node.project_category}
            title={project.node.project_title}
            description={project.node.project_preview_description}
            thumbnail={project.node.project_preview_thumbnail}
            thumbnailSharp={project.node.project_preview_imageSharp}
            uid={project.node._meta.uid}
          />
        ))}
        <WorkAction to={"/work"}>
          <p>MORE WORK</p> <span>&#8594;</span>
        </WorkAction>
      </Section>
      <Section>
        <About
          title={home.about_title}
          bio={home.about_bio}
          socialLinks={home.about_links}
          posts={posts}
        />
      </Section>
    </>
  )
}

export default ({ data }) => {
  //Required check for no data being returned
  const doc = data.prismic.allHomepages.edges.slice(0, 1).pop()
  const projects = data.prismic.allProjects.edges
  const meta = data.site.siteMetadata
  const posts = data.prismic.allPosts.edges

  if (!doc || !projects) return null

  return (
    <Layout>
      <RenderBody
        home={doc.node}
        projects={projects}
        meta={meta}
        posts={posts}
      />
    </Layout>
  )
}

RenderBody.propTypes = {
  home: PropTypes.object.isRequired,
  projects: PropTypes.array.isRequired,
  posts: PropTypes.array.isRequired,
  meta: PropTypes.object.isRequired,
}

export const query = graphql`
  {
    prismic {
      allHomepages {
        edges {
          node {
            hero_title
            hero_button_text
            hero_button_link {
              ... on PRISMIC__ExternalLink {
                _linkType
                url
              }
            }
            content
            about_title
            about_bio
            about_links {
              about_link
            }
          }
        }
      }
      allProjects {
        edges {
          node {
            project_title
            project_preview_description
            project_preview_thumbnail
            project_preview_image
            project_preview_imageSharp {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            project_category
            project_post_date
            _meta {
              uid
            }
          }
        }
      }
      allPosts(sortBy: post_date_DESC, first: 1) {
        edges {
          node {
            post_title
            post_date
            post_category
            post_preview_description
            post_author
            _meta {
              uid
            }
          }
        }
      }
    }
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`
