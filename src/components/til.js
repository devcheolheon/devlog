import React from "react"
import { Link, graphql } from "gatsby"

const makeDirs = tils => {
  let mappedTils = tils.map(til => {
    let slug = til.node.fields.slug
    let slugArr = til.node.fields.slug.split("/")
    let majorDir = slugArr[slugArr.length - 4]
    return { slug, majorDir }
  })
  let obj = {}
  mappedTils.forEach(({ slug, majorDir }) => {
    if (!obj[majorDir]) {
      obj[majorDir] = [slug]
    } else {
      obj[majorDir].push(slug)
    }
  })
  return obj
}

const SubDir = subdir => {
  return (
    <li>
      <Link to={subdir}>{subdir}</Link>
    </li>
  )
}
const MajorDir = ([majorDir, slugs]) => {
  return (
    <li>
      <div>{majorDir}</div>
      <ul>{slugs.map(SubDir)}</ul>
    </li>
  )
}
const Til = ({ dirs }) => {
  return (
    <div>
      <h2>TIL</h2>
      <ul>{Object.entries(dirs).map(MajorDir)}</ul>
    </div>
  )
}

export default Til
export { makeDirs }
