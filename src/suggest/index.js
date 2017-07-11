import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/fromEvent'
import 'rxjs/add/observable/timer'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/debounce'

class Suggest {
  constructor(app, { viewer }) {
    this.app = document.querySelector(app)
    this.input = this.app.querySelector('input')
    this.viewer = this.app.querySelector(viewer)
    Observable.fromEvent(this.app, 'input')
      .map((event) => event.target.value)
      .debounce(() => Observable.timer(150))
      .subscribe((value) => { this.viewer.innerHTML = value; })
  }
}

export default Suggest