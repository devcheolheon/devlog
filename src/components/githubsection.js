import React, { useRef, useCallback } from "react"
import { Link } from "gatsby"
import dirStyles from "./dir.module.css"
import { GrCaretNext } from "react-icons/gr"
import classNames from "classnames"

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
  return (
    <div className={dirStyles.leafarea} key={dir.slug + "-link"}>
      <GrCaretNext className={dirStyles.icon} />
      <Link className={dirStyles.leaf} to={dir.slug}>
        {dir.title || dir.slug}
      </Link>
    </div>
  )
}

const Dir = ({ dirs, depth }) => {
  if (Array.isArray(dirs)) {
    return dirs.map(LeafDirs)
  }
  const keys = Object.keys(dirs)
  return keys.map((key, i) => {
    return (
      <div
        key={`dir_${key}_${depth}_${i}`}
        id={`dir_${key}_${depth}_${i}`}
        className={`${dirStyles.dir}`}
      >
        <div className={dirStyles.leftarea}>
          <div className={dirStyles.smallupbox} />
          <div className={dirStyles.smalldownbox} />
        </div>
        <div className={dirStyles.titlearea}>
          <div
            className={dirStyles.directorytitle}
            data-dirname={`dir_${key}_${depth}_${i}`}
          >
            {key}
          </div>
        </div>
        <div
          className={`${dirStyles.container + " " + dirStyles.subdirectory}`}
        >
          <Dir dirs={dirs[key]} depth={depth + "_" + i} />
        </div>
      </div>
    )
  })
}

const setAllDescendantsUnvisible = targetDom => {
  let descendants = targetDom.querySelectorAll(`.${dirStyles.dir}`)
  for (let i = 0; i < descendants.length; i++) {
    descendants[i].className = classNames(dirStyles.dir, {
      [dirStyles.selected]: false,
    })
  }
}
const setVisible = targetDom => {
  targetDom.className = classNames(dirStyles.dir, {
    [dirStyles.selected]: true,
  })
}

const GithubSection = ({ name, dirs }) => {
  const dirDom = useRef(null)
  const onclickhandler = useCallback(
    e => {
      let targetDirID = e.target.getAttribute("data-dirname")
      if (!targetDirID) return
      let targetDom = dirDom.current.querySelector(`#${targetDirID}`)
      let parentDom = targetDom.parentNode
      setAllDescendantsUnvisible(parentDom)
      setVisible(targetDom)
    },
    [dirDom]
  )
  if (!dirs) return
  return (
    <div>
      <h2>{name}</h2>
      <div
        className={dirStyles.container}
        onClick={onclickhandler}
        ref={dirDom}
      >
        <Dir dirs={dirs} depth={0}></Dir>
      </div>
    </div>
  )
}

export default GithubSection
export { makeDirs }
