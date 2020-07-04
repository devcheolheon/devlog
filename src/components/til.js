import React from "react"
import { Link, graphql } from "gatsby"
const Til = ({ tils }) => {
  console.log(tils)
  tils.map()
  return (
    <div>
      <hr></hr>
      <h2>TIL</h2>
    </div>
  )
}

export default Til
export const TilQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/git/TIL//" } }) {
      edges {
        node {
          id
          fields {
            slug
          }
        }
      }
    }
  }
`
