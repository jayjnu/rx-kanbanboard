import $ from 'jquery'
import Suggest from './suggest'

const $suggestResultViewer = $('#suggestView')
const $suggestList = $('#suggestList')

const renderHTMLTo = ($target) => (htmlString) => {
  console.log(htmlString)
  $target.html(htmlString).trigger({
    type: htmlString.length > 0 ? 'suggest:render' : 'suggest:fail'
  })
}

const terminateSuggest = Suggest(document.getElementById('suggestInput'), {
  requestUrl: 'http://suggest-bar.daum.net/suggest?id=movie&cate=movie&multiple=1&mod=json&code=utf_in_out',
  onNext: renderHTMLTo($suggestList),
  onError: (err) => {}
})

$suggestList.on('suggest:render', function () {
  $suggestResultViewer.addClass('on');
}).on('suggest:fail', function() {
  $suggestResultViewer.removeClass('on');
})