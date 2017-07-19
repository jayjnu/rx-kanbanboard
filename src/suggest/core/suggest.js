import Rx from 'rxjs/Rx'

const rxTimer = (timeout) => () => Rx.Observable.timer(timeout)
const mergeExternalStreamer = (streamer) => (item) => streamer(item)

const defaultConfig = {
  delay: 300,
  skip: 1,
  enableDistinction: true,
  externalStreamer: (item) => {},
  onNext: () => {},
  onError: () => {},
  onComplete: () => {}
};

export default (input, conf) => {
  const config = Object.assign({}, defaultConfig, conf);

  return Rx.Observable.fromEvent(input, 'input')
    .map((event) => event.target.value)
    .skip(config.skip)
    .debounce(rxTimer(config.delay))
    .distinctUntilChanged()
    .flatMap(mergeExternalStreamer(config.externalStreamer))
    .subscribe({
      next: config.onNext,
      error: config.onError,
      complete: config.onComplete
    });
}