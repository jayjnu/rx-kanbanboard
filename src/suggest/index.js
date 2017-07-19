import $ from 'jquery'
import Rx from 'rxjs/Rx'
import { suggestItemsList } from './templates'
import { pipe } from '../utils'
import _suggest from './core/suggest'

// pipe helper higher order func
const split = (delimiter) => (items) => items.map(item => item.split(delimiter))
const map = (mapperFn) => (items) => items.map(mapperFn)
const reduce = (reducer, initialValue) => (items) => items.reduce(reducer, initialValue)

const fetchFrom = (url) => (q) => $.ajax({url: `${url}&q=${q}`, dataType: 'jsonp'})
const toKeyValuePair = (item) => {
  return {
    title: item[0],
    imgSrc: item[2],
    pubYear: item[3]
  }
}
const requestByPromise = (requestFn) => (item) => Rx.Observable.fromPromise(requestFn(item))
const toTemplateString = (item) => suggestItemsList(item)
const toListHTMLChunk = (chunk, templateHTML) => chunk + templateHTML
const pluckItem = (domain) => (res) => domain
  .slice(1)
  .split('.')
  .map(each => each.replace('.', ''))
  .reduce((obj, key) => obj ? obj[key] : null, res)
const silentException = (data) => !data ? [] : data

const renderHTMLString = pipe(
  pluckItem('.items.movie'),
  silentException,
  split('|'),
  map(toKeyValuePair),
  map(toTemplateString),
  reduce(toListHTMLChunk, '')
)

const defaultConfig = {
  onNext: (res) => {},
  onError: (err) => {},
  onComplete: () => {}
};

export default (input, conf) => {
  const config = Object.assign({}, defaultConfig, conf)

  return _suggest(input, Object.assign({}, config, {
    externalStreamer: requestByPromise(fetchFrom(config.requestUrl)),
    onNext: (res) => config.onNext(renderHTMLString(res)),
    onError: (err) => config.onError(err),
    onComplete: () => config.onComplete()
  }))
}