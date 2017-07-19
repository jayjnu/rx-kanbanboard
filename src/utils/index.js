import { pipe } from './pipe'
import { compose } from './compose'

// pipe helper higher order func
export const split = (delimiter) => (items) => items.map(item => item.split(delimiter))
export const map = (mapperFn) => (items) => items.map(mapperFn)
export const reduce = (reducer, initialValue) => (items) => items.reduce(reducer, initialValue)

export {
  pipe,
  compose
}