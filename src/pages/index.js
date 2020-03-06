import React, { useState } from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import Loadable from "react-loadable"
import RichText from "prismic-reactjs/src/Component"
import { graphql } from "gatsby"
import styled from "@emotion/styled"
import colors from "styles/colors"
import dimensions from "styles/dimensions"
import Button from "components/_ui/Button"
import About from "components/About"
import Layout from "components/Layout"
import Link from "components/_ui/Link"
import Card from "components/_ui/Card"
import Section from "components/_ui/Section"
import ProjectCard from "components/ProjectCard"
import "react-micro-modal/dist/index.css"

import { TiUser } from "react-icons/ti"
import useDisclosure from "@chakra-ui/core/dist/useDisclosure"
import useToast from "@chakra-ui/core/dist/Toast"
import FormControl from "@chakra-ui/core/dist/FormControl"
import FormLabel from "@chakra-ui/core/dist/FormLabel"
import IconButton from "@chakra-ui/core/dist/IconButton"
import Input from "@chakra-ui/core/dist/Input"
import InputGroup from "@chakra-ui/core/dist/InputGroup"
import Icon from "@chakra-ui/core/dist/Icon"
import { InputLeftElement } from "@chakra-ui/core/dist/InputElement"
import FormErrorMessage from "@chakra-ui/core/dist/FormErrorMessage"
import Box from "@chakra-ui/core/dist/Box"
import Grid from "@chakra-ui/core/dist/Grid"

import Heading from "@chakra-ui/core/dist/Heading"
import Text from "@chakra-ui/core/dist/Text"
import Flex from "@chakra-ui/core/dist/Flex"

import { useForm, useField } from "react-final-form-hooks"
import ft6 from "../images/feature-tile-icon-06.svg"
import ft5 from "../images/feature-tile-icon-05.svg"
import ft4 from "../images/feature-tile-icon-04.svg"
import ft3 from "../images/feature-tile-icon-03.svg"
import ft7 from "../images/feature-tile-icon-07.svg"

import client1 from "../images/clients-01.svg"
import client4 from "../images/clients-04.svg"
import client3 from "../images/clients-03.svg"
import client5 from "../images/clients-05.svg"

import illus1 from "../images/illus1.svg"
import illus2 from "../images/illus2.svg"
import illus3 from "../images/illus3.svg"
import illus4 from "../images/illus4.svg"
import illus5 from "../images/illus5.svg"
import illus6 from "../images/illus6.svg"
import illus7 from "../images/illus7.svg"

const axios = require("axios")

const Hero = styled(Section)`
  margin: 0 auto;
  text-align: left;
  font-family: Rubik, -apple-system, BlinkMacSystemFont, Helvetica, sans-serif;
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

const ModalClose = styled(IconButton)`
  svg {
    path {
      fill: black;
    }
  }
`

const AngledSection = styled(Section)`
  background-color: rgba(240, 252, 251, 0.75);
  clip-path: polygon(0px 0px, 100% 4%, 100% 100%, 0% 100%);
  padding-top: 80px;
  padding-bottom: 80px;
  overflow: hidden;
`

const LandingIllustration = styled("img")`
  width: 80%;
  @media (max-width: ${dimensions.maxwidthMobile}px) {
    width: 100%;
  }
`

const StepIllustration = styled("img")`
  width: 50%;
`

const ModalFooter = styled("footer")`
  margin-top: 2em;
`

const ModalHeader = styled("header")`
  display: flex;
  align-items: center;
  margin-bottom: 1em;
  justify-content: space-between;
`

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

const LoadedModal = Loadable({
  loader: () => import("react-micro-modal"),
  loading() {
    return <div />
  },
})

const FormModal = ({ isOpen, onClose, buttonMarginMd = "0" }) => (
  <LoadedModal closeOnAnimationEnd open={isOpen}>
    {() => (
      <>
        <ModalHeader>
          <Heading as="h1" fontSize="1.5em" mr="20px" my="0">
            Connect with us
          </Heading>
          <ModalClose
            size="sm"
            onClick={onClose}
            aria-label="Close modal"
            icon="close"
          />
        </ModalHeader>

        <HooksContactForm onClose={onClose} />
      </>
    )}
  </LoadedModal>
)

const RenderBody = ({ home, projects, meta, posts, allImages }) => {
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
      <FormModal isOpen={isOpen} onClose={onClose} />
      <Hero pt={{ md: "2.5em" }} pb={{ md: "3em" }}>
        <Flex flexWrap="wrap" mt={{ md: "2em" }} mb={{ md: "6em" }}>
          <Flex
            width={{ xs: "100%", md: "auto" }}
            flex={{ xs: "1 0 100%", md: "1" }}
            flexDirection="column"
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
                Insert tagline here.
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
                Seriously, we{" "}
                <Box as="span" color={colors.qimodaLight}>
                  need{" "}
                </Box>
                it
              </Heading>

              <Heading
                fontFamily="inherit"
                as="h3"
                fontWeight="400"
                fontSize="0.9rem"
                color="#353535"
                lineHeight="1.5"
                m="0"
                mb="2rem"
                textAlign={{ xs: "center", md: "left" }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Heading>
              <Button
                onClick={onOpen}
                margin={{ xs: "0 auto", md: "0" }}
                display="block"
              >
                {/* {RichText.render(home.hero_button_text)} */}
                <Text fontFamily="inherit" zIndex="1">
                  Get early access now
                </Text>
              </Button>
            </Box>
          </Flex>
          <Flex
            width={{ xs: "100%", md: "auto" }}
            flex={{ xs: "1 0 100%", md: "1" }}
            position="relative"
            alignItems={{ md: "center" }}
            justifyContent={{ md: "flex-end" }}
            mt={{ xs: "5em", md: "0" }}
          >
            <LandingIllustration src={illus7} alt="Imagine. Create. Disrupt." />
          </Flex>
        </Flex>
      </Hero>
      <Section>
        <Heading as="h1" textAlign="center" mb="0">
          Lorem ipsum dolor sit amet
        </Heading>
        <Box textAlign="center" padding="0 15%">
          <Text>
            {/* Build bigger, better, faster things and innovate with lightning pace
            with our cutting-edge platform. Qimoda allows you to start off and a
            prototype with a template similar to a website builder, but you're
            never left off to fend for yourself with their clanky, janky (and
            often unscalable) platforms. Leave the dirty stuff to the
            professionals, and focus on the things you do best. */}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </Box>
        <Flex
          width="100%"
          justifyContent="space-around"
          my="100px"
          flexDirection={{ xs: "column", md: "row" }}
          px={{ md: "5%" }}
        >
          <Box
            width={{ xs: "100%", md: "20%" }}
            mb={{ xs: "20px", md: 0 }}
            height="30px"
            backgroundPosition="center"
            backgroundImage={`url('${client1}')`}
            backgroundSize="auto 100%"
            backgroundRepeat="no-repeat"
          />
          <Box
            width={{ xs: "100%", md: "20%" }}
            mb={{ xs: "20px", md: 0 }}
            height="30px"
            backgroundPosition="center"
            backgroundImage={`url('${client4}')`}
            backgroundSize="auto 100%"
            backgroundRepeat="no-repeat"
          />
          <Box
            width={{ xs: "100%", md: "20%" }}
            mb={{ xs: "20px", md: 0 }}
            height="30px"
            backgroundPosition="center"
            backgroundImage={`url('${client3}')`}
            backgroundSize="auto 100%"
            backgroundRepeat="no-repeat"
          />
          <Box
            width={{ xs: "100%", md: "20%" }}
            mb={{ xs: "20px", md: 0 }}
            height="30px"
            backgroundPosition="center"
            backgroundImage={`url('${client5}')`}
            backgroundSize="auto 100%"
            backgroundRepeat="no-repeat"
          />
        </Flex>
        <Grid
          mt="40px"
          px={{ md: "5%" }}
          templateColumns={{ xs: "1fr", md: "repeat(2, 1fr)" }}
          gap={4}
        >
          <Card
            title="Benefit 1"
            logo={
              <Box
                size="100%"
                backgroundImage={`url('${ft6}')`}
                backgroundSize="cover"
              />
            }
          >
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
          </Card>
          <Card
            title="Benefit 2"
            logo={
              <Box
                size="100%"
                backgroundImage={`url('${ft4}')`}
                backgroundSize="cover"
              />
            }
          >
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
          </Card>
          <Card
            title="Benefit 3"
            logo={
              <Box
                size="100%"
                backgroundImage={`url('${ft3}')`}
                backgroundSize="cover"
              />
            }
          >
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
          </Card>
          <Card
            title="Benefit 4"
            logo={
              <Box
                size="100%"
                backgroundImage={`url('${ft5}')`}
                backgroundSize="cover"
              />
            }
          >
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
          </Card>
        </Grid>
      </Section>

      <AngledSection>
        <Flex alignItems={{ md: "center" }} my="3em" flexWrap="wrap-reverse">
          <Box flex={{ md: "1 0 50%" }} textAlign="center" my="2em">
            <Heading as="h1" margin="0" lineHeight="1" fontSize="2em">
              Start off with a template
            </Heading>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
          </Box>
          <Flex flex={{ md: "1 0 50%" }} justifyContent="center">
            <StepIllustration src={illus1} alt="Start off with a template" />
          </Flex>
        </Flex>

        <Flex alignItems={{ md: "center" }} my="3em" flexWrap="wrap">
          <Flex flex={{ md: "1 0 50%" }} justifyContent="center">
            <StepIllustration
              src={illus3}
              alt="Help us make it uniquely yours"
            />
          </Flex>
          <Box flex={{ md: "1 0 50%" }} textAlign="center" my="2em">
            <Heading as="h1" margin="0" lineHeight="1" fontSize="2em">
              Help us make it uniquely yours
            </Heading>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
          </Box>
        </Flex>

        <Flex
          alignItems={{ md: "center" }}
          my="3em"
          mb="0"
          flexWrap="wrap-reverse"
        >
          <Box flex={{ md: "1 0 50%" }} textAlign="center" my="2em">
            <Heading as="h1" margin="0" lineHeight="1" fontSize="2em">
              We'll take care of the rest
            </Heading>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
          </Box>
          <Flex flex={{ md: "1 0 50%" }} justifyContent="center">
            <StepIllustration src={illus4} alt="We'll take care of the rest" />
          </Flex>
        </Flex>
      </AngledSection>
      <Section>
        <Heading as="h1" textAlign="center" mb="0.5em">
          Be part of the early beta
        </Heading>
        <Text
          textAlign="center"
          width={{ md: "50%" }}
          mx={{ md: "auto" }}
          mb="2em"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
        <Button onClick={onOpen} margin="0 auto" display="block">
          {/* {RichText.render(home.hero_button_text)} */}
          <Text fontFamily="inherit" zIndex="1">
            Get early access now
          </Text>
        </Button>
      </Section>
      {/* <Section>
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
      </Section> */}
      {/* <Section>
        <About
          title={home.about_title}
          bio={home.about_bio}
          socialLinks={home.about_links}
          posts={posts}
        />
      </Section> */}
    </>
  )
}

export default ({ data }) => {
  //Required check for no data being returned
  const doc = data.prismic.allHomepages.edges.slice(0, 1).pop()
  const projects = data.prismic.allProjects.edges
  const meta = data.site.siteMetadata
  const posts = data.prismic.allPosts.edges
  const allImages = data.allImageSharp.edges.reduce((total, item) => {
    const arr = total
    arr[item.node.original.src] = item.node.fluid
    return arr
  }, {})

  console.log(allImages)

  if (!doc || !projects) return null

  return (
    <Layout>
      <RenderBody
        home={doc.node}
        projects={projects}
        meta={meta}
        posts={posts}
        allImages={allImages}
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

    allImageSharp {
      edges {
        node {
          id
          original {
            src
          }
          fluid {
            ...GatsbyImageSharpFluid_withWebp_noBase64
          }
        }
      }
    }

    file(relativePath: { eq: "lottiebg-min.png" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid_withWebp_noBase64
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
