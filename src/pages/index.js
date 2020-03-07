import "react-micro-modal/dist/index.css"
import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import Loadable from "react-loadable"
import { graphql } from "gatsby"
import styled from "@emotion/styled"
import colors from "styles/colors"
import dimensions from "styles/dimensions"
import Button from "components/_ui/Button"
import Layout from "components/Layout"
import Section from "components/_ui/Section"
import useDisclosure from "@chakra-ui/core/dist/useDisclosure"
import useToast from "@chakra-ui/core/dist/Toast"
import IconButton from "@chakra-ui/core/dist/IconButton"
import Box from "@chakra-ui/core/dist/Box"
import Grid from "@chakra-ui/core/dist/Grid"
import LazyLoad from "react-lazyload"
import Heading from "@chakra-ui/core/dist/Heading"
import Text from "@chakra-ui/core/dist/Text"
import Flex from "@chakra-ui/core/dist/Flex"
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
import FadeIn from "react-fade-in"

const Hero = styled(Section)`
  margin: 0 auto;
  text-align: left;
  font-family: Rubik, -apple-system, BlinkMacSystemFont, Helvetica, sans-serif;
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
                onMouseOver={() => HooksContactForm.preload()}
                margin={{ xs: "0 auto", md: "0" }}
                display="block"
              >
                <ButtonText>Get early access now</ButtonText>
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </Box>
        <Flex
          width="100%"
          justifyContent="space-around"
          my={{ xs: "4em", md: "100px" }}
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
          <LazyLoad height={200} once>
            <FadeIn transitionDuration={500}>
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
                <Text>
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
                <Text>
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
                <Text>
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
