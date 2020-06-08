import "react-micro-modal/dist/index.css"
import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import Loadable from "react-loadable"
import { graphql } from "gatsby"
import styled from "@emotion/styled"
import colors from "styles/colors"
import Button from "components/_ui/Button"
import Layout from "components/Layout"
import Section from "components/_ui/Section"
import useDisclosure from "@chakra-ui/core/dist/useDisclosure"
import useToast from "@chakra-ui/core/dist/Toast"
import IconButton from "@chakra-ui/core/dist/IconButton"
import Box from "@chakra-ui/core/dist/Box"
import Image from "@chakra-ui/core/dist/Image"
import Heading from "@chakra-ui/core/dist/Heading"
import Text from "@chakra-ui/core/dist/Text"
import Flex from "@chakra-ui/core/dist/Flex"
import landingSvg from "../images/GroovySittingDoodle.svg"
import windowSvgFront from "../images/feature-window-1.svg"
import windowSvgBack from "../images/feature-window-2.svg"
import meditateSvg from "../images/MeditatingDoodle.svg"
import flowShape from "../images/flow-shape.svg"
import {
  ReactJs,
  NextDotJs,
  Gatsby,
  Svelte,
  VueDotJs,
} from "@icons-pack/react-simple-icons"

const Hero = styled(Section)`
  margin: 0 auto;
  text-align: left;
  font-family: Literal, -apple-system, BlinkMacSystemFont, Helvetica, sans-serif;
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
  // clip-path: polygon(0px 0px, 100% 10%, 100% 100%, 0% 100%);
  padding-top: 50px;
  padding-bottom: 50px;
  overflow: hidden;
`

const ColouredSection = styled(Section)`
  background-color: #eef4f5;
  margin-top: 150px;
  padding-top: 35px;
  padding-bottom: 50px;
  position: relative;
`

const LandingIllustration = styled(Image)``

const StepIllustration = styled(Image)`
  width: 100%;
`

const ModalHeader = styled("header")`
  display: flex;
  align-items: center;
  margin-bottom: 1em;
  justify-content: space-between;
`

const LoadedModal = Loadable({
  loader: () => import("react-micro-modal"),
  loading: () => null,
})

const HooksContactForm = Loadable({
  loader: () => import("components/HooksContactForm"),
  loading: () => null,
})

const Card = Loadable({
  loader: () => import("components/_ui/Card"),
  loading: () => null,
})

const FormModal = ({ defaultURL, isOpen, onClose, buttonMarginMd = "0" }) => (
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

        <HooksContactForm
          toast={useToast}
          defaultURL={defaultURL}
          onClose={onClose}
        />
      </>
    )}
  </LoadedModal>
)

const ButtonText = styled.p`
  font-family: inherit;
  z-index: 1;
`

const TechRing = styled(Box)`
  // animation-name: rotate;
  // animation-duration: 50s;
  // animation-iteration-count: infinite;
  // animation-timing-function: linear;

  // @keyframes rotate {
  //   from {
  //     transform: rotate(0deg);
  //   }
  //   to {
  //     transform: rotate(360deg);
  //   }
  // }
`

const TechRingIllustration = styled(Image)`
  animation-name: float;
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  animation-direction: alternate;

  @keyframes float {
    from {
      padding-bottom: 30px;
    }
    to {
      padding-bottom: 60px;
    }
  }
`

const TechRingElement = styled(Box)`
  position: absolute;
`

const RenderBody = ({ home, projects, meta, posts, location, ...props }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

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
      <FormModal isOpen={isOpen} onClose={onClose} defaultURL={location.href} />
      <Hero pt={{ md: "2.5em" }} pb={{ md: "3em" }}>
        <Flex flexWrap="wrap" mb={{ md: "6em" }}>
          <Flex
            width={{ xs: "100%", md: "auto" }}
            flex={{ xs: "1 0 100%", md: "1 0 50%" }}
            flexDirection="column"
          >
            <Box mt={{ md: "5rem" }}>
              <Heading
                fontFamily="inherit"
                fontSize="2.5rem"
                as="h1"
                fontWeight="500"
                lineHeight="1"
                m="0"
                mt="0.5em"
                mb="0.25em"
                textAlign={{ xs: "center", md: "left" }}
              >
                Build the next{" "}
                <Box as="span" color={colors.qimodaLight}>
                  best thing
                </Box>
                .
              </Heading>

              <Heading
                fontFamily="inherit"
                fontSize="2.5rem"
                as="h1"
                fontWeight="500"
                lineHeight="1"
                m="0"
                mb="0.6em"
                textAlign={{ xs: "center", md: "left" }}
              >
                All in one place.
              </Heading>

              <Heading
                fontFamily="inherit"
                as="h3"
                fontWeight="400"
                fontSize="1.1rem"
                color="#353535"
                lineHeight="1.5"
                m="0"
                mb="2rem"
                textAlign={{ xs: "center", md: "left" }}
              >
                Create innovative and efficient products with the latest
                technologies, seamlessly in one platform.
              </Heading>
              <Button
                onClick={onOpen}
                onMouseOver={() => HooksContactForm.preload()}
                margin={{ xs: "0 auto", md: "0" }}
                display="block"
              >
                <ButtonText>Connect with us now</ButtonText>
              </Button>
            </Box>
          </Flex>
          <Flex
            width={{ xs: "100%", md: "auto" }}
            flex={{ xs: "1 0 100%", md: "1 1 45%" }}
            position="relative"
            alignItems={{ md: "center" }}
            justifyContent={{ md: "flex-end" }}
            mt={{ xs: "5em", md: "2.5em" }}
          >
            <LandingIllustration
              position="absolute"
              top="8%"
              left="0"
              width="75%"
              zIndex="2"
              src={windowSvgFront}
              alt="Imagine. Create. Disrupt."
            />
            <LandingIllustration
              position="absolute"
              top="0"
              right="0"
              width="75%"
              zIndex="1"
              src={windowSvgBack}
              alt="Imagine. Create. Disrupt."
            />
            <LandingIllustration
              marginTop="40%"
              marginLeft="20%"
              zIndex="3"
              width="100%"
              src={landingSvg}
              alt="Imagine. Create. Disrupt."
            />
          </Flex>
        </Flex>
      </Hero>
      <ColouredSection>
        <Box
          position="absolute"
          width="100%"
          top="0"
          left="0"
          transform="translateY(-75%)"
        >
          <Image src={flowShape} width="100%" />
        </Box>
        <Heading
          as="h2"
          my="0"
          fontWeight="500"
          fontSize="2.5rem"
          textAlign="center"
        >
          Ditch the website builder.
        </Heading>
        {/* <Box width="100%" position="relative">
          <Box
            position="absolute"
            boxSizing="content-box"
            textAlign="right"
            width="40%"
            right="0"
          >
            <Text>
              Forget about the cookie-cutter solutions. We tailor-make your
              product to assure it can efficiently scale using the latest
              technologies.
            </Text>
          </Box>
        </Box> */}

        <Flex
          position="relative"
          width={{ xs: "100%", md: "400px" }}
          justifyContent="space-around"
          mx="auto"
          mt={{ xs: "6em", md: "3.5rem" }}
          mb={{ xs: "4em", md: "25px" }}
          flexDirection={{ xs: "column", md: "row" }}
        >
          <TechRingIllustration
            mt="5%"
            width="100%"
            height="400px"
            src={meditateSvg}
            zIndex="3"
          />
          <TechRing
            width={{ xs: "200px", md: "50%" }}
            height={{ xs: "200px", md: "50%" }}
            backgroundColor="white"
            position="absolute"
            top={{ xs: "25%", md: "20%" }}
            left={{ xs: "50%", md: "initial" }}
            transform={{ xs: "translateX(-50%)", md: "initial" }}
            borderRadius="50%"
            zIndex="1"
          />
          <TechRing
            position="absolute"
            width={{ xs: "100%", md: "110%" }}
            height={{ xs: "100%", md: "105%" }}
          >
            <TechRingElement
              left="50%"
              top="0"
              transform="translate(-50%, -40%)"
            >
              <ReactJs color="#61DAFB" size={70} />
            </TechRingElement>
            <TechRingElement top="20%" left="5%" transform="translateX(-50%)">
              <NextDotJs color="#000000" size={70} />
            </TechRingElement>
            <TechRingElement top="20%" right="0" transform="translateX(25%)">
              <Gatsby color="#663399" size={70} />
            </TechRingElement>
            <TechRingElement
              bottom={{ xs: "7%", md: "5%" }}
              left="10%"
              transform="translateX(-20%)"
            >
              <Svelte color="#FF3E00" size={70} />
            </TechRingElement>
            <TechRingElement
              bottom={{ xs: "7%", md: "5%" }}
              right="10%"
              transform="translateX(20%)"
            >
              <VueDotJs color="#4FC08D" size={70} />
            </TechRingElement>
          </TechRing>
        </Flex>
      </ColouredSection>

      {/* <Section>
        <Grid
          mt="40px"
          px={{ md: "5%" }}
          templateColumns={{ xs: "1fr", md: "repeat(2, 1fr)" }}
          gap={4}
        >
          <LazyLoad height={200} once>
            <FadeIn transitionDuration={500}>
              <Card
                title="L-U-D-I, don't D-I-Y"
                logo={
                  <Box
                    size="100%"
                    backgroundImage={`url('${ft6}')`}
                    backgroundSize="cover"
                  />
                }
              >
                <Text textAlign="justify">
                  Let us do it, don't do it yourself. No need to go too
                  technical with detailing, just let us know what you have in
                  mind and our experts will handle the rest.
                </Text>
              </Card>
            </FadeIn>
          </LazyLoad>
          <LazyLoad height={200} once>
            <FadeIn transitionDuration={500}>
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
                <Text textAlign="justify">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Text>
              </Card>
            </FadeIn>
          </LazyLoad>
          <LazyLoad height={200} once>
            <FadeIn transitionDuration={500}>
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
                <Text textAlign="justify">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Text>
              </Card>
            </FadeIn>
          </LazyLoad>
          <LazyLoad height={200} once>
            <FadeIn transitionDuration={500}>
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
                <Text textAlign="justify">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Text>
              </Card>
            </FadeIn>
          </LazyLoad>
        </Grid>
      </Section>

      <AngledSection>
        <LazyLoad height={300} once>
          <FadeIn transitionDuration={500}>
            <Flex
              alignItems={{ md: "center" }}
              my="3em"
              flexWrap="wrap-reverse"
            >
              <Box
                flex={{ xs: "1 0 100%", md: "1 0 50%" }}
                textAlign="center"
                my="2em"
              >
                <Heading as="h1" margin="0" lineHeight="1" fontSize="2em">
                  Start off with a template
                </Heading>
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Text>
              </Box>
              <Flex
                flex={{ xs: "1 0 100%", md: "1 0 50%" }}
                justifyContent="center"
              >
                <StepIllustration
                  src={illus1}
                  alt="Start off with a template"
                />
              </Flex>
            </Flex>
          </FadeIn>
        </LazyLoad>
        <LazyLoad height={300} once>
          <FadeIn transitionDuration={500}>
            <Flex alignItems={{ md: "center" }} my="3em" flexWrap="wrap">
              <Flex
                flex={{ xs: "1 0 100%", md: "1 0 50%" }}
                justifyContent="center"
              >
                <StepIllustration
                  src={illus3}
                  alt="Help us make it uniquely yours"
                />
              </Flex>
              <Box
                flex={{ xs: "1 0 100%", md: "1 0 50%" }}
                textAlign="center"
                my="2em"
              >
                <Heading as="h1" margin="0" lineHeight="1" fontSize="2em">
                  Help us make it uniquely yours
                </Heading>
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Text>
              </Box>
            </Flex>
          </FadeIn>
        </LazyLoad>

        <LazyLoad height={300} once>
          <FadeIn transitionDuration={500}>
            <Flex
              alignItems={{ md: "center" }}
              my="3em"
              mb="0"
              flexWrap="wrap-reverse"
            >
              <Box
                flex={{ xs: "1 0 100%", md: "1 0 50%" }}
                textAlign="center"
                my="2em"
              >
                <Heading as="h1" margin="0" lineHeight="1" fontSize="2em">
                  We'll take care of the rest
                </Heading>
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Text>
              </Box>
              <Flex
                flex={{ xs: "1 0 100%", md: "1 0 50%" }}
                justifyContent="center"
              >
                <StepIllustration
                  src={illus4}
                  alt="We'll take care of the rest"
                />
              </Flex>
            </Flex>
          </FadeIn>
        </LazyLoad>
      </AngledSection> */}
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
          <ButtonText>Get early access now</ButtonText>
        </Button>
      </Section>
    </>
  )
}

export default ({ data, ...props }) => {
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
        {...props}
      />
    </Layout>
  )
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
