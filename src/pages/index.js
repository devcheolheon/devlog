import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import GithubSection, { makeDirs } from "../components/githubsection"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  const tils = data.allMarkdownRemark.edges.filter(obj => {
    return /git\/TIL\//.test(obj.node.fileAbsolutePath)
  })
  const tilsDir = tils.length ? makeDirs(tils, "TIL") : undefined

  const birs = data.allMarkdownRemark.edges.filter(obj => {
    return /git\/BIR\//.test(obj.node.fileAbsolutePath)
  })
  console.log(birs)
  const birsDir = birs.length ? makeDirs(birs, "BIR") : undefined

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Bio />
      {tilsDir && <GithubSection name={"TIL"} dirs={tilsDir} />}
      {birsDir && <GithubSection name={"BIR"} dirs={birsDir} />}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___order], order: ASC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          fileAbsolutePath
          frontmatter {
            title
            description
            order
          }
        }
      }
    }
  }
`
