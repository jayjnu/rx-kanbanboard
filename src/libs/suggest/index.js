import Rx from 'rxjs/Rx'
import _suggest from './core/suggest'
import _keyEventMapper from './core/keyEventMapper'

const requestByPromise = (requestFn) => (item) => Rx.Observable.fromPromise(requestFn(item))

const defaultConfig = {
  fetch: (item) => new Promise((resolve, reject) => resolve(item)),
  keyConf: {}
};

export default (input, conf) => {
  const config = Object.assign({}, defaultConfig, conf)

  return {
    suggest: _suggest(input, Object.assign({}, config, {
      externalStreamer: requestByPromise(config.fetch)
    })),
    keyEventMapper: _keyEventMapper(input, conf.keyConf)
  }
}