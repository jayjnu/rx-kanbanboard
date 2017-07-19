import Rx from 'rxjs/Rx'

const KEY_UP = 38
const KEY_DOWN = 40
const KEY_RETURN = 13



function getKeyCode(e) {
  return {e, code: e.keyCode};
}

function setValidKeyCodes(...codes) {
  return function (obj) {
    return codes.includes(obj.code)
  }
}

function KeyboardNavigation(fromTarget, {listSize, onNext, onFail, onComplete}) {
  const self = {
    listSize,
    unsubscribe() {},
    bindEvent() {
      this.unsubscribe = Rx.Observable.fromEvent(fromTarget, 'keydown')
        .map(getKeyCode)
        .filter(setValidKeyCodes(KEY_UP, KEY_DOWN, KEY_RETURN))
        .scan(calcNavigationPosition, { focusedIdx: -1, keyCode: -1 })
        .subscribe(onNext, onFail, onComplete)
    },
    setListSize(size) {
      this.listSize = size
    }
  }

  function calcNavigationPosition(prevState, obj) {
    const currentKeyCode = obj.code
    let idxDelta = 0
    switch (currentKeyCode) {
      case KEY_UP:
        idxDelta = -1
        break;
      case KEY_DOWN:
        idxDelta = 1
        break;
      default:
        idxDelta = 0
    }

    const focusedIdx = Math.min( Math.max(prevState.focusedIdx + idxDelta, 0), self.listSize)
    return {
      e: obj.e,
      focusedIdx,
      keyCode: currentKeyCode
    }
  }

  return self
}

export default KeyboardNavigation