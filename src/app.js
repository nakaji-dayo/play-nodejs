import Cycle from '@cycle/core';
import {makeDOMDriver, div, input, p, pre, span} from '@cycle/dom';
import SocketIO from 'cycle-socket.io';

import view from './view.jsx';

function main({DOM, SocketIO}) {
  return {
    DOM: SocketIO.get('result')
      .merge(SocketIO.get('clear').map(x => ({clear: true})))
      .scan((xs, x) => {
        console.log('test:' + x);
        xs.push(x);
        return x.clear ? [] : xs;
      }, [])
      .map(x => view({lines: x}))
  };
}

const drivers = {
  DOM: makeDOMDriver('#app'),
  SocketIO: SocketIO.createSocketIODriver(window.location.origin)
};

Cycle.run(main, drivers);
