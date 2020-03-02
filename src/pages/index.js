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
import qimoda from "images/qimoda/5.svg"
import { Formik } from "formik"
import * as Yup from "yup"
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

import Textarea from "@chakra-ui/core/dist/Textarea"
import Lottie from "react-lottie"
import heroAnimation from "../data/animation1.json"
import { SlideIn } from "@chakra-ui/core/dist/Transition"

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

const ContactForm = props => {
  const SignupSchema = Yup.object().shape({
    firstname: Yup.string().required("Please enter your first name"),
    lastname: Yup.string().required("Please enter your last name"),
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Please enter your email address"),
    phone: Yup.string().required("Please enter your phone number"),
  })

  const toast = useToast()

  return (
    <Formik
      initialValues={{
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        message: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={(values, actions) => {
        axios({
          method: "post",
          url: "/api/submit",
          data: values,
        }).then(res => {
          actions.setSubmitting(false)
          actions.resetForm()
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
      {props => (
        <form onSubmit={props.handleSubmit}>
          <ModalBody>
            <FormControl
              isInvalid={props.errors.firstname && props.touched.firstname}
            >
              <FormLabel htmlFor="name">Full name</FormLabel>
              <InputGroup>
                <InputLeftElement
                  children={<Box as={TiUser} size="20px" color="gray.300" />}
                />
                <Input
                  id="name"
                  placeholder="John Doe"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.firstname}
                  name="firstname"
                />
              </InputGroup>

              {props.errors.firstname && (
                <ErrorMessage>{props.errors.firstname}</ErrorMessage>
              )}
            </FormControl>

            <FormControl
              mt={4}
              isInvalid={props.errors.lastname && props.touched.lastname}
            >
              <FormLabel htmlFor="lastname">Last name</FormLabel>
              <InputGroup>
                <InputLeftElement
                  children={<Box as={TiUser} size="20px" color="gray.300" />}
                />
                <Input
                  id="lastname"
                  placeholder="John Doe"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.lastname}
                  name="lastname"
                />
              </InputGroup>

              {props.errors.lastname && (
                <ErrorMessage>{props.errors.lastname}</ErrorMessage>
              )}
            </FormControl>

            <FormControl
              mt={4}
              isInvalid={props.errors.email && props.touched.email}
            >
              <FormLabel htmlFor="email">Email</FormLabel>
              <InputGroup>
                <InputLeftElement
                  children={<Icon name="at-sign" color="gray.300" />}
                />
                <Input
                  id="email"
                  placeholder="john.doe@gmail.com"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.email}
                  name="email"
                />
              </InputGroup>
              {props.errors.email && (
                <ErrorMessage>{props.errors.email}</ErrorMessage>
              )}
            </FormControl>

            <FormControl
              mt={4}
              isInvalid={props.errors.phone && props.touched.phone}
            >
              <FormLabel htmlFor="phone">Contact Number</FormLabel>
              <InputGroup>
                <InputLeftElement
                  children={<Icon name="phone" color="gray.300" />}
                />
                <Input
                  placeholder="+61 412 321 123"
                  id="phone"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.phone}
                  name="phone"
                />
              </InputGroup>
              {props.errors.phone && (
                <ErrorMessage>{props.errors.phone}</ErrorMessage>
              )}
            </FormControl>

            <FormControl
              mt={4}
              isInvalid={props.errors.message && props.touched.message}
            >
              <FormLabel htmlFor="message">Enquiry</FormLabel>
              <InputGroup>
                <InputLeftElement
                  children={<Icon name="chat" color="gray.300" />}
                />
                <Textarea
                  placeholder="Your message goes here"
                  id="message"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.message}
                  name="message"
                  paddingLeft="2.5rem"
                />
              </InputGroup>
              {props.errors.message && (
                <ErrorMessage>{props.errors.message}</ErrorMessage>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button type="submit" isLoading={props.isSubmitting}>
              <Text fontFamily="inherit" zIndex="1">
                Connect
              </Text>
            </Button>
          </ModalFooter>
        </form>
      )}
    </Formik>
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

                <ContactForm onClose={onClose} />
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
