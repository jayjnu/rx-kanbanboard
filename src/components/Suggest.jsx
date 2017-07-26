import React, { Component } from 'react';
import rxSuggest from 'src/libs/suggest';
import fetchJsonp from 'fetch-jsonp';
import { updateSuggestList, updateActiveIndex } from 'src/actions';
import { pipe, split, map } from 'src/utils/index'

const toKeyValuePair = (item) => {
  return {
    title: item[0],
    imgSrc: item[2],
    pubYear: item[3]
  }
};
const pluckItem = (domain) => (res) => domain
  .slice(1)
  .split('.')
  .map(each => each.replace('.', ''))
  .reduce((obj, key) => obj ? obj[key] : null, res)
const silentException = (data) => !data ? [] : data

const refineResponse = pipe(
  pluckItem('.items.movie'),
  silentException,
  split('|'),
  map(toKeyValuePair)
);

class Suggest extends Component {
  constructor(props) {
    super(props);
    this.suggestInput = null;
    this.subscription1 = null;
  }

  static fetchApi(q) {
    return fetchJsonp(`http://suggest-bar.daum.net/suggest?id=movie&cate=movie&multiple=1&mod=json&code=utf_in_out&q=${q}`)
      .then((res) => res.json(), (err) => err)
  }

  listItems() {
    return this.props.items.map((item, idx) => {
      return (
        <li key={idx} className={this.props.activeIndex === idx ? 'on' : ''}>
          <div className="col-items">
            <span className="wrap-thumb"><img src={item.imgSrc} width="40" alt=""/></span>
          </div>
          <div className="col-items">
            <dl className="list-desc">
              <dt className="screen-out">제목</dt>
              <dd className="desc-title">{item.title}</dd>
              <dt className="screen-out">개봉</dt>
              <dd>{item.pubYear}</dd>
            </dl>
          </div>
        </li>
      );
    });
  }

  componentDidMount() {
    const dispatch = this.props.dispatch;
    const rxsg = rxSuggest(this.suggestInput, {fetch: Suggest.fetchApi});
    this.subscription1 = rxsg.suggest.subscribe({
      next(result) {
        dispatch(updateSuggestList(refineResponse(result)));
      }
    });
    this.subscription2 = rxsg.keyEventMapper
      .scan((agg, cur) => {
        const activeIndex =  Math.min( Math.max(agg.activeIndex + cur, 0), this.props.items.length);
        return { maxCount: this.props.items.length, activeIndex };
      }, {maxCount: this.props.items.length, activeIndex: this.props.activeIndex})
      .map((scannedInfo) => scannedInfo.activeIndex)
      .subscribe({
        next(activeItemIdx) {
          dispatch(updateActiveIndex(activeItemIdx))
        }
      });
  }

  componentWillUnmount() {
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
  }

  render() {
    const listItems = this.listItems();
    return (
      <div id="suggestApp">
        <h3>서제스트 앱</h3>
        <label htmlFor="suggestInput" className="screen-out">검색</label>
        <input type="search" id="suggestInput" autoComplete="off" ref={(input) => { this.suggestInput = input }} />
        <div id="suggestView" className={listItems.length > 0 ? 'on' : ''}>
          <ul id="suggestList">
            {listItems}
          </ul>
        </div>
      </div>
    )
  }
}

export default Suggest;