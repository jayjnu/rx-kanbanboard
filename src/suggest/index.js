import $ from 'jquery'
import SuggestStreamManager from './core/suggest'
import { suggestListItems } from './templates'

function fetchByQuery(q) {
  return $.ajax({
    url: `http://suggest-bar.daum.net/suggest?id=movie&cate=movie&multiple=1&mod=json&code=utf_in_out&q=${q}`,
    dataType: 'jsonp'
  })
}

function parseResponse(item) {
  const arr = item.split('|')
  return {
    title: arr[0],
    imgSrc: arr[2],
    pubYear: arr[3]
  }
}

function chunkListHTML(result, item) {
  result += suggestListItems(item);
  return result;
}

class Suggest extends SuggestStreamManager {
  //init
  constructor(...args) {
    super(...args)
    this.suggestedListViewer = this.viewer.querySelector('ul')
  }

  //Override
  shouldFetchData(text) {
    return fetchByQuery(text)
  }

  //Override
  didFetchData(response) {
    try {
      const movieItems = response.items.movie;
      this.suggestedListViewer.innerHTML = movieItems.map(parseResponse).reduce(chunkListHTML, '')
    } catch(e) {
      this.suggestedListViewer.innerHTML = '검색 결과 없음'
    }
  }

  //Override
  didFailFetchingData(err) {
    console.log(err)
    this.suggestedListViewer.innerHTML = '검색 결과 오류'
  }

  //Override
  didCompleteFetchingData(result) {

  }
}

export default Suggest