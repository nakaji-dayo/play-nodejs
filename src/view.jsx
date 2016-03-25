import Cycle from '@cycle/core';
import {makeDOMDriver, hJSX} from '@cycle/dom';

module.exports = x => {
  var ls = x.lines.map(x => <span>{x}</span>);
  return <pre>
    {ls}
    </pre>;
};
