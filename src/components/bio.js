/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import { GrContactInfo, GrTwitter, GrFacebook } from "react-icons/gr"

import { rhythm, scale } from "../utils/typography"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `)

  const { author, social } = data.site.siteMetadata
  return (
    <div
      style={{
        display: `flex`,
        position: `relative`,
        marginBottom: rhythm(2.5),
        fontFamily: `Nanum Gothic Coding`,
      }}
    >
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author.name}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 50,
          borderRadius: `100%`,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />
      <p
        style={{
          height: `50px`,
          display: `flex`,
          flex: `1`,
          marginRight: rhythm(1),
          alignItems: `center`,
          justifyContent: `space-between`,
          ...scale(0.18),
        }}
      >
        <div style={{ width: `450px`, textAlign: `center` }}>
          {author.summary}
        </div>
        <div style={{ marginTop: `2px` }}>
          <a
            style={{
              boxShadow: "none",
              marginRight: rhythm(1 / 3),
            }}
            href={`https://twitter.com/${social.twitter}`}
          >
            <GrContactInfo />
          </a>
          <a
            style={{ boxShadow: "none", marginRight: rhythm(1 / 3) }}
            href={`https://twitter.com/${social.twitter}`}
          >
            <GrTwitter />
          </a>
          <a
            style={{ boxShadow: "none", marginRight: rhythm(1 / 3) }}
            href={`https://twitter.com/${social.twitter}`}
          >
            <GrFacebook />
          </a>
        </div>
      </p>
    </div>
  )
}

export default Bio
