import React from "react"
import { Link } from "gatsby"
import dirStyles from "./dir.module.css"

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

  console.log(mappedDirs)
  let obj = {}
  obj = makeDirsRecur(mappedDirs)
  return obj
}

const LeafDirs = dir => {
  return (
    <Link
      style={{
        marginLeft: `13px`,
        height: `40px`,
        lineHeight: `40px`,
        color: `black`,
        textDecoration: `none`,
      }}
      key={dir.slug + "-link"}
      to={dir.slug}
    >
      {dir.title || dir.slug}
    </Link>
  )
}

const Dir = ({ dirs }) => {
  if (Array.isArray(dirs)) {
    return dirs.map(LeafDirs)
  }
  const keys = Object.keys(dirs)
  return keys.map(key => (
    <div dirStyles key={key + "-dir"} className={dirStyles.dir}>
      <div className={dirStyles.leftarea}>
        <div className={dirStyles.smallupbox} />
        <div className={dirStyles.smalldownbox} />
      </div>
      <div className={dirStyles.titlearea}>
        <div className={dirStyles.directorytitle}>{key}</div>
        <div className={dirStyles.smallupbox} />
      </div>
      <div className={dirStyles.container}>
        <Dir dirs={dirs[key]} />
      </div>
    </div>
  ))
}

const Til = ({ dirs }) => {
  return (
    <div>
      <h2>TIL</h2>
      <div className={dirStyles.container}>
        <Dir dirs={dirs}></Dir>
      </div>
    </div>
  )
}

export default Til
export { makeDirs }
