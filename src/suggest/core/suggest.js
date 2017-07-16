import Rx from 'rxjs/Rx'

const defaultConfig = {
  delay: 300,
  skip: 1,
  enableDistinction: true
}

class SuggestStreamManager {
  get input() {
    return this._input
  }
  set input(dom) {
    this._input = dom;
  }
  get viewer() {
    return this._viewer
  }
  set viewer(dom) {
    this._viewer = dom;
  }

  constructor(input, viewer, config) {
    this._config = Object.assign({}, defaultConfig, config)

    this.input = typeof input === 'string' ? document.getElementById(input) : input

    if (!this.input || !this.input.nodeName || this.input.nodeName !== 'INPUT') {
      throw new TypeError('[Invalid argument] the first argument for Suggest must be either an INPUT html element or string of its target id')
    }

    this.viewer = typeof viewer === 'string' ? document.getElementById(viewer) : viewer
    if (!this.viewer || !this.viewer.nodeName) {
      throw new TypeError('[Invalid argument] the second argument for Suggest must be either an html element or string of its target id')
    }

    this.bindEventStream()
  }

  bindEventStream() {
    this.eventStream$ = Rx.Observable.fromEvent(this.input, 'input')
      .map((event) => event.target.value)
      .debounce(() => Rx.Observable.timer(this._config.delay))

    if (this._config.enableDistinction) {
      this.eventStream$ = this.eventStream$.distinctUntilChanged()
    }

    this.unsubscribe = this.eventStream$
      .skip(this._config.skip)
      .flatMap((text) => {
        return Rx.Observable.fromPromise(this.shouldFetchData(text))
      }).subscribe({
        next: this._next.bind(this),
        error: this._error.bind(this),
        complete: this._complete.bind(this)
      });
  }

  //MARK: Private methods
  _next(result) {
    // if (!result.items.movie) return
    // const list = this.viewer.getElementsByTagName('ul')[0]
    // list.innerHTML = result.items.movie.map(parseResponse).map(makeListHTML).join('')
    this.didFetchData(result)
  }

  _error(error) {
    this.didFailFetchingData(error)
  }

  _complete(result) {
    this.didCompleteFetchingData(result)
  }

  //MARK: Lifecycle methods
  shouldFetchData(text) {

  }

  didFetchData(response) {

  }

  didFailFetchingData(err) {

  }

  didCompleteFetchingData(result) {

  }

}

export default SuggestStreamManager