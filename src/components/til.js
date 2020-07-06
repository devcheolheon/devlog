import React from "react"
import { Link } from "gatsby"

const makeDirsRecur = function makeDirsRecur(mappedDirs) {
  if (mappedDirs[0].slugArr.length == 1) return mappedDirs
  let obj = {}

  for (let i = 0; i < mappedDirs.length; i++) {
    let name = mappedDirs[i].slugArr.shift()
    if (obj[name]) obj[name].push(mappedDirs[i])
    else obj[name] = [mappedDirs[i]]
  }

  for (let key in obj) {
    obj[key] = makeDirsRecur(obj[key])
  }

  return obj
}

const makeDirs = (dirs, subject) => {
  let mappedDirs = dirs.map(til => {
    let slug = til.node.fields.slug
    let title = til.node.frontmatter.title || ""
    let slugArr = slug.split("/").slice(1, -1)
    return { slug, title, slugArr, subject }
  })

  let obj = {}
  obj = makeDirsRecur(mappedDirs)
  return obj
}

const LeafDirs = dir => {
  return <Link to={dir.slug}>{dir.title || dir.slug}</Link>
}

const Dir = ({ dirs }) => {
  console.log(dirs)
  if (Array.isArray(dirs)) {
    return dirs.map(LeafDirs)
  }
  const keys = Object.keys(dirs)
  return keys.map(key => (
    <div>
      <h1>{key}</h1>
      <Dir dirs={dirs[key]} />
    </div>
  ))
}

const Til = ({ dirs }) => {
  return (
    <div>
      <h2>TIL</h2>
      <div>
        <Dir dirs={dirs}></Dir>
      </div>
    </div>
  )
}

export default Til
export { makeDirs }
