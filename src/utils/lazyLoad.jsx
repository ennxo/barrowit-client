import { lazy } from "react"

export const lazyLoad = (factory, name) => {
  return Object.create({
    [name]: lazy(() =>
      factory().then((module) => ({ default: module[name] }))),
  })
}
