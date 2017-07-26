import Rx from 'rxjs/Rx'
import { mergeDeep } from 'src/utils/mergeDeep'

const has = (args) => (arg) => args.includes(arg)
const toExpectedOutput = (keymaps) => (code) => keymaps.filter(keymap => keymap.code === code)

const defaultConfig = {
  eventType: 'keydown',
  keymaps: [
    {
      name: 'KEY_UP',
      code: 38,
      expected: -1
    }, {
      name: 'KEY_DOWN',
      code: 40,
      expected: 1
    }, {
      name: 'KEY_RETURN',
      code: 13,
      expected: 0
    }
  ]
}

export default (target, conf) => {
  const config = mergeDeep({}, defaultConfig, conf)
  const keymaps = config.keymaps

  return Rx.Observable.fromEvent(target, config.eventType)
    .map((event) => event.keyCode)
    .filter(has(keymaps.map(keymap => keymap.code)))
    .map(toExpectedOutput(keymaps))
    .map((keymap) => keymap[0] ? keymap[0].expected : null)
}