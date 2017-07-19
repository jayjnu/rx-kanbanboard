import Rx from 'rxjs/Rx'
import $ from 'jquery'
import Suggest from './suggest'
import keyEventEmitter from './suggest/core/keyEventEmitter'

const $suggestInput = $('#suggestInput')
const $suggestResultViewer = $('#suggestView')
const $suggestList = $('#suggestList')

const renderHTMLTo = ($target) => (htmlString) => {
  $target.html(htmlString).trigger({
    type: htmlString.length > 0 ? 'suggest:render' : 'suggest:fail'
  })
}

const terminateSuggest = Suggest($suggestInput[0], {
  requestUrl: 'http://suggest-bar.daum.net/suggest?id=movie&cate=movie&multiple=1&mod=json&code=utf_in_out',
  onNext: renderHTMLTo($suggestList),
  onError: (err) => {}
})

$suggestList.on('suggest:render', function () {
  $suggestResultViewer.addClass('on');
}).on('suggest:fail', function() {
  $suggestResultViewer.removeClass('on');
})

const terminateKeyBinding = keyEventEmitter($suggestInput[0], {
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
  ],
  onNext: (expected) => {
    const $lists = $suggestList.children('li');
    const $activeItem = $lists.map((idx, each) => $(each).hasClass('on') ? each : null);
    const idx = Math.min( Math.max($activeItem.index() + expected, 0), $lists.length - 1);
    $activeItem.removeClass('on');
    const $newActiveItem = $lists.eq(idx).addClass('on')
  }
})

