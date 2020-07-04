import React from "react"
import { Link, graphql } from "gatsby"

const makeSubDirs = dirObj => {
  let keys = Object.keys(dirObj)
  for (let i = 0; i < keys.length; i++) {
    let dirArr = dirObj[keys[i]]
    let obj = {}
    dirArr.forEach(({ slug, title }) => {
      let slugArr = slug.split("/")
      let subDir = slugArr[slugArr.length - 3]
      if (!obj[subDir]) obj[subDir] = [{ slug, title }]
      else obj[subDir].push({ slug, title })
    })
    dirObj[keys[i]] = obj
  }
  return dirObj
}
const makeDirs = dirs => {
  let mappedDirs = dirs.map(til => {
    let slug = til.node.fields.slug
    let title = til.node.frontmatter.title || ""
    let slugArr = til.node.fields.slug.split("/")
    let majorDir = slugArr[slugArr.length - 4]
    return { slug, majorDir, title }
  })
  let obj = {}
  mappedDirs.forEach(({ slug, majorDir, title }) => {
    if (!obj[majorDir]) {
      obj[majorDir] = [{ slug, title }]
    } else {
      obj[majorDir].push({ slug, title })
    }
  })
  obj = makeSubDirs(obj)
  return obj
}

const EndDir = ({ slug, title }) => {
  return <Link to={slug}>{title || slug}</Link>
}

const SubDir = ([subDir, links]) => {
  return (
    <li>
      <div>{subDir}</div>
      <ul>{links.map(EndDir)}</ul>
    </li>
  )
}

const MajorDir = ([majorDir, subDir]) => {
  return (
    <li>
      <div>{majorDir}</div>
      <ul>{Object.entries(subDir).map(SubDir)}</ul>
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
