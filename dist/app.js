/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {var require;/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   4.1.0
 */

(function (global, factory) {
     true ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.ES6Promise = factory());
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  return typeof x === 'function' || typeof x === 'object' && x !== null;
}

function isFunction(x) {
  return typeof x === 'function';
}

var _isArray = undefined;
if (!Array.isArray) {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
} else {
  _isArray = Array.isArray;
}

var isArray = _isArray;

var len = 0;
var vertxNext = undefined;
var customSchedulerFn = undefined;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && ({}).toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }

  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var r = require;
    var vertx = __webpack_require__(9);
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = undefined;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && "function" === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var _arguments = arguments;

  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;

  if (_state) {
    (function () {
      var callback = _arguments[_state - 1];
      asap(function () {
        return invokeCallback(_state, child, callback, parent._result);
      });
    })();
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  _resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(16);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

var GET_THEN_ERROR = new ErrorObject();

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function getThen(promise) {
  try {
    return promise.then;
  } catch (error) {
    GET_THEN_ERROR.error = error;
    return GET_THEN_ERROR;
  }
}

function tryThen(then, value, fulfillmentHandler, rejectionHandler) {
  try {
    then.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        _resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      _reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      _reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    _reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return _resolve(promise, value);
    }, function (reason) {
      return _reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$) {
  if (maybeThenable.constructor === promise.constructor && then$$ === then && maybeThenable.constructor.resolve === resolve) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$ === GET_THEN_ERROR) {
      _reject(promise, GET_THEN_ERROR.error);
      GET_THEN_ERROR.error = null;
    } else if (then$$ === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$)) {
      handleForeignThenable(promise, maybeThenable, then$$);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function _resolve(promise, value) {
  if (promise === value) {
    _reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    handleMaybeThenable(promise, value, getThen(value));
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function _reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;

  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = undefined,
      callback = undefined,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function ErrorObject() {
  this.error = null;
}

var TRY_CATCH_ERROR = new ErrorObject();

function tryCatch(callback, detail) {
  try {
    return callback(detail);
  } catch (e) {
    TRY_CATCH_ERROR.error = e;
    return TRY_CATCH_ERROR;
  }
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = undefined,
      error = undefined,
      succeeded = undefined,
      failed = undefined;

  if (hasCallback) {
    value = tryCatch(callback, detail);

    if (value === TRY_CATCH_ERROR) {
      failed = true;
      error = value.error;
      value.error = null;
    } else {
      succeeded = true;
    }

    if (promise === value) {
      _reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
    succeeded = true;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
      _resolve(promise, value);
    } else if (failed) {
      _reject(promise, error);
    } else if (settled === FULFILLED) {
      fulfill(promise, value);
    } else if (settled === REJECTED) {
      _reject(promise, value);
    }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      _resolve(promise, value);
    }, function rejectPromise(reason) {
      _reject(promise, reason);
    });
  } catch (e) {
    _reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function Enumerator(Constructor, input) {
  this._instanceConstructor = Constructor;
  this.promise = new Constructor(noop);

  if (!this.promise[PROMISE_ID]) {
    makePromise(this.promise);
  }

  if (isArray(input)) {
    this._input = input;
    this.length = input.length;
    this._remaining = input.length;

    this._result = new Array(this.length);

    if (this.length === 0) {
      fulfill(this.promise, this._result);
    } else {
      this.length = this.length || 0;
      this._enumerate();
      if (this._remaining === 0) {
        fulfill(this.promise, this._result);
      }
    }
  } else {
    _reject(this.promise, validationError());
  }
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
};

Enumerator.prototype._enumerate = function () {
  var length = this.length;
  var _input = this._input;

  for (var i = 0; this._state === PENDING && i < length; i++) {
    this._eachEntry(_input[i], i);
  }
};

Enumerator.prototype._eachEntry = function (entry, i) {
  var c = this._instanceConstructor;
  var resolve$$ = c.resolve;

  if (resolve$$ === resolve) {
    var _then = getThen(entry);

    if (_then === then && entry._state !== PENDING) {
      this._settledAt(entry._state, i, entry._result);
    } else if (typeof _then !== 'function') {
      this._remaining--;
      this._result[i] = entry;
    } else if (c === Promise) {
      var promise = new c(noop);
      handleMaybeThenable(promise, entry, _then);
      this._willSettleAt(promise, i);
    } else {
      this._willSettleAt(new c(function (resolve$$) {
        return resolve$$(entry);
      }), i);
    }
  } else {
    this._willSettleAt(resolve$$(entry), i);
  }
};

Enumerator.prototype._settledAt = function (state, i, value) {
  var promise = this.promise;

  if (promise._state === PENDING) {
    this._remaining--;

    if (state === REJECTED) {
      _reject(promise, value);
    } else {
      this._result[i] = value;
    }
  }

  if (this._remaining === 0) {
    fulfill(promise, this._result);
  }
};

Enumerator.prototype._willSettleAt = function (promise, i) {
  var enumerator = this;

  subscribe(promise, undefined, function (value) {
    return enumerator._settledAt(FULFILLED, i, value);
  }, function (reason) {
    return enumerator._settledAt(REJECTED, i, reason);
  });
};

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all(entries) {
  return new Enumerator(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  _reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {function} resolver
  Useful for tooling.
  @constructor
*/
function Promise(resolver) {
  this[PROMISE_ID] = nextId();
  this._result = this._state = undefined;
  this._subscribers = [];

  if (noop !== resolver) {
    typeof resolver !== 'function' && needsResolver();
    this instanceof Promise ? initializePromise(this, resolver) : needsNew();
  }
}

Promise.all = all;
Promise.race = race;
Promise.resolve = resolve;
Promise.reject = reject;
Promise._setScheduler = setScheduler;
Promise._setAsap = setAsap;
Promise._asap = asap;

Promise.prototype = {
  constructor: Promise,

  /**
    The primary way of interacting with a promise is through its `then` method,
    which registers callbacks to receive either a promise's eventual value or the
    reason why the promise cannot be fulfilled.
  
    ```js
    findUser().then(function(user){
      // user is available
    }, function(reason){
      // user is unavailable, and you are given the reason why
    });
    ```
  
    Chaining
    --------
  
    The return value of `then` is itself a promise.  This second, 'downstream'
    promise is resolved with the return value of the first promise's fulfillment
    or rejection handler, or rejected if the handler throws an exception.
  
    ```js
    findUser().then(function (user) {
      return user.name;
    }, function (reason) {
      return 'default name';
    }).then(function (userName) {
      // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
      // will be `'default name'`
    });
  
    findUser().then(function (user) {
      throw new Error('Found user, but still unhappy');
    }, function (reason) {
      throw new Error('`findUser` rejected and we're unhappy');
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
      // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
    });
    ```
    If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
  
    ```js
    findUser().then(function (user) {
      throw new PedagogicalException('Upstream error');
    }).then(function (value) {
      // never reached
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // The `PedgagocialException` is propagated all the way down to here
    });
    ```
  
    Assimilation
    ------------
  
    Sometimes the value you want to propagate to a downstream promise can only be
    retrieved asynchronously. This can be achieved by returning a promise in the
    fulfillment or rejection handler. The downstream promise will then be pending
    until the returned promise is settled. This is called *assimilation*.
  
    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // The user's comments are now available
    });
    ```
  
    If the assimliated promise rejects, then the downstream promise will also reject.
  
    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // If `findCommentsByAuthor` fulfills, we'll have the value here
    }, function (reason) {
      // If `findCommentsByAuthor` rejects, we'll have the reason here
    });
    ```
  
    Simple Example
    --------------
  
    Synchronous Example
  
    ```javascript
    let result;
  
    try {
      result = findResult();
      // success
    } catch(reason) {
      // failure
    }
    ```
  
    Errback Example
  
    ```js
    findResult(function(result, err){
      if (err) {
        // failure
      } else {
        // success
      }
    });
    ```
  
    Promise Example;
  
    ```javascript
    findResult().then(function(result){
      // success
    }, function(reason){
      // failure
    });
    ```
  
    Advanced Example
    --------------
  
    Synchronous Example
  
    ```javascript
    let author, books;
  
    try {
      author = findAuthor();
      books  = findBooksByAuthor(author);
      // success
    } catch(reason) {
      // failure
    }
    ```
  
    Errback Example
  
    ```js
  
    function foundBooks(books) {
  
    }
  
    function failure(reason) {
  
    }
  
    findAuthor(function(author, err){
      if (err) {
        failure(err);
        // failure
      } else {
        try {
          findBoooksByAuthor(author, function(books, err) {
            if (err) {
              failure(err);
            } else {
              try {
                foundBooks(books);
              } catch(reason) {
                failure(reason);
              }
            }
          });
        } catch(error) {
          failure(err);
        }
        // success
      }
    });
    ```
  
    Promise Example;
  
    ```javascript
    findAuthor().
      then(findBooksByAuthor).
      then(function(books){
        // found books
    }).catch(function(reason){
      // something went wrong
    });
    ```
  
    @method then
    @param {Function} onFulfilled
    @param {Function} onRejected
    Useful for tooling.
    @return {Promise}
  */
  then: then,

  /**
    `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
    as the catch block of a try/catch statement.
  
    ```js
    function findAuthor(){
      throw new Error('couldn't find that author');
    }
  
    // synchronous
    try {
      findAuthor();
    } catch(reason) {
      // something went wrong
    }
  
    // async with promises
    findAuthor().catch(function(reason){
      // something went wrong
    });
    ```
  
    @method catch
    @param {Function} onRejection
    Useful for tooling.
    @return {Promise}
  */
  'catch': function _catch(onRejection) {
    return this.then(null, onRejection);
  }
};

function polyfill() {
    var local = undefined;

    if (typeof global !== 'undefined') {
        local = global;
    } else if (typeof self !== 'undefined') {
        local = self;
    } else {
        try {
            local = Function('return this')();
        } catch (e) {
            throw new Error('polyfill failed because global object is unavailable in this environment');
        }
    }

    var P = local.Promise;

    if (P) {
        var promiseToString = null;
        try {
            promiseToString = Object.prototype.toString.call(P.resolve());
        } catch (e) {
            // silently ignored
        }

        if (promiseToString === '[object Promise]' && !P.cast) {
            return;
        }
    }

    local.Promise = Promise;
}

// Strange compat..
Promise.polyfill = polyfill;
Promise.Promise = Promise;

return Promise;

})));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7), __webpack_require__(8)))

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var es6_promise_1 = __webpack_require__(0);
function isLoaded() {
    return typeof window['require'] !== 'undefined';
}
function dojoPromise(modules) {
    return new es6_promise_1.Promise(function (resolve, reject) {
        // If something goes wrong loading the esri/dojo scripts, reject with the error.
        window['require'].on("error", reject);
        window['require'](modules, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // Resolve with the parameters from dojo require as an array.
            resolve(args);
        });
    });
}
function esriBootstrap(url) {
    return new es6_promise_1.Promise(function (resolve, reject) {
        if (isLoaded()) {
            // If the API is already loaded, reject with an error message.
            reject('The ArcGIS API for JavaScript has already been loaded!');
        }
        if (!url) {
            url = 'https://js.arcgis.com/4.3/';
        }
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.onload = function () {
            // Resolve after the script is loaded.
            resolve();
        };
        // Reject if something goes wrong loading the script.
        script.onerror = reject;
        document.body.appendChild(script);
    });
}
exports.esriBootstrap = esriBootstrap;
function esriPromise(modules) {
    if (!isLoaded()) {
        return esriBootstrap().then(function () { return dojoPromise(modules); });
    }
    else {
        return dojoPromise(modules);
    }
}
exports.esriPromise = esriPromise;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var esri_promise_1 = __webpack_require__(1);
var es6_promise_1 = __webpack_require__(0);
var boilerplate_1 = __webpack_require__(6);
var application_1 = __webpack_require__(3);
esri_promise_1.esriPromise([
    'dojo/text!config/appConfig.json',
    'dojo/text!config/boilerplateSettings.json'
]).then(function (_a) {
    var appConfig = _a[0], boilerplateSettings = _a[1];
    application_1.default().then(function (AppInstance) {
        boilerplate_1.default(JSON.parse(appConfig), JSON.parse(boilerplateSettings))
            .then(function (BoilerInstance) {
            BoilerInstance.init()
                .then(function (boilerplateResponse) {
                AppInstance.init(boilerplateResponse);
            });
        }).catch(es6_promise_1.Promise.reject);
    }).catch(es6_promise_1.Promise.reject);
}).catch(function (err) {
    console.error(err);
});


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var esri_promise_1 = __webpack_require__(1);
var es6_promise_1 = __webpack_require__(0);
var ItemHelper_1 = __webpack_require__(4);
var UrlParamHelper_1 = __webpack_require__(5);
var CSS = {
    loading: "boilerplate--loading",
    error: "boilerplate--error",
    errorIcon: "esri-icon-notice-round"
};
exports.default = function () { return esri_promise_1.esriPromise([
    'dojo/_base/lang', 'dojo/dom', 'dojo/dom-attr', 'dojo/domReady!',
    'esri/views/MapView', 'esri/views/SceneView', 'esri/widgets/Search',
    'esri/WebMap', 'esri/WebScene', 'dojo/i18n!config/nls/resources'
]).then(function (_a) {
    var lang = _a[0], dom = _a[1], domAttr = _a[2], domClass = _a[3], MapView = _a[4], SceneView = _a[5], Search = _a[6], WebMap = _a[7], WebScene = _a[8], i18n = _a[9];
    var Application = (function () {
        function Application() {
            this.config = null;
            this.direction = null;
            this.settings = null;
            this.urlParamHelper = null;
            this.itemHelper = null;
        }
        Application.prototype.init = function (boilerplateResponse) {
            var _this = this;
            if (boilerplateResponse) {
                this.direction = boilerplateResponse.direction;
                this.config = boilerplateResponse.config;
                this.settings = boilerplateResponse.settings;
                var boilerplateResults = boilerplateResponse.results;
                var webMapItem_1 = boilerplateResults.webMapItem;
                var webSceneItem_1 = boilerplateResults.webSceneItem;
                var groupData_1 = boilerplateResults.group;
                document.documentElement.lang = boilerplateResponse.locale;
                ItemHelper_1.default().then(function (instance) {
                    _this.itemHelper = instance;
                })
                    .catch(function (err) {
                    throw err;
                }).then(UrlParamHelper_1.default).then(function (instance) {
                    _this.urlParamHelper = instance;
                }).catch(function (err) {
                    throw err;
                }).then(function () {
                    _this._setDirection();
                    if (webMapItem_1) {
                        _this._createWebMap(webMapItem_1);
                    }
                    else if (webSceneItem_1) {
                        _this._createWebScene(webSceneItem_1);
                    }
                    else if (groupData_1) {
                        _this._createGroupGallery(groupData_1);
                    }
                    else {
                        _this.reportError(new Error("app:: Could not load an item to display"));
                    }
                }).catch(function (err) {
                    throw (err);
                });
            }
            else {
                this.reportError(new Error("app:: Boilerplate is not defined"));
            }
        };
        Application.prototype.reportError = function (error) {
            // remove loading class from body
            document.body.removeAttribute('class');
            document.body.className = CSS.error;
            // an error occurred - notify the user. In this example we pull the string from the
            // resource.js file located in the nls folder because we've set the application up
            // for localization. If you don't need to support multiple languages you can hardcode the
            // strings here and comment out the call in index.html to get the localization strings.
            // set message
            var node = dom.byId("loading_message");
            if (node) {
                node.innerHTML = "<h1><span class=\"" + CSS.errorIcon + "\"></span> " + i18n.error + "</h1><p>" + error.message + "</p>";
            }
            return error;
        };
        Application.prototype._setDirection = function () {
            var direction = this.direction;
            var dirNode = document.getElementsByTagName("html")[0];
            domAttr.set(dirNode, "dir", direction);
        };
        Application.prototype._ready = function () {
            document.body.removeAttribute('class');
            document.title = this.config.title;
        };
        Application.prototype._createWebMap = function (webMapItem) {
            var _this = this;
            this.itemHelper.createWebMap(webMapItem).then(function (map) {
                var viewProperties = {
                    map: map,
                    container: _this.settings.webmap.containerId
                };
                if (!_this.config.title && map.portalItem && map.portalItem.title) {
                    _this.config.title = map.portalItem.title;
                }
                lang.mixin(viewProperties, _this.urlParamHelper.getViewProperties(_this.config));
                var view = new MapView(viewProperties);
                view.then(function (response) {
                    _this.urlParamHelper.addToView(view, _this.config);
                    _this._ready();
                }, _this.reportError);
            }, this.reportError);
        };
        Application.prototype._createWebScene = function (webSceneItem) {
            var _this = this;
            this.itemHelper.createWebScene(webSceneItem).then(function (map) {
                var viewProperties = {
                    map: map,
                    container: _this.settings.webscene.containerId
                };
                if (!_this.config.title && map.portalItem && map.portalItem.title) {
                    _this.config.title = map.portalItem.title;
                }
                lang.mixin(viewProperties, _this.urlParamHelper.getViewProperties(_this.config));
                var view = new SceneView(viewProperties);
                view.then(function (response) {
                    _this.urlParamHelper.addToView(view, _this.config);
                    _this._ready();
                }, _this.reportError);
            }, this.reportError);
        };
        Application.prototype._createGroupGallery = function (groupData) {
            var groupInfoData = groupData.infoData;
            var groupItemsData = groupData.itemsData;
            if (!groupInfoData || !groupItemsData || groupInfoData.total === 0 || groupInfoData instanceof Error) {
                this.reportError(new Error("app:: group data does not exist."));
                return;
            }
            var info = groupInfoData.results[0];
            var items = groupItemsData.results;
            this._ready();
            if (info && items) {
                var html_1 = "";
                html_1 += "<h1>" + info.title + "</h1>";
                html_1 += "<ol>";
                items.forEach(function (item) {
                    html_1 += "<li>" + item.title + "</li>";
                });
                html_1 += "</ol>";
                document.body.innerHTML = html_1;
            }
        };
        return Application;
    }());
    return es6_promise_1.Promise.resolve(new Application());
}); };


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var esri_promise_1 = __webpack_require__(1);
var es6_promise_1 = __webpack_require__(0);
exports.default = function () { return esri_promise_1.esriPromise([
    'dojo/Deferred', 'dojo/promise/Promise',
    'esri/WebMap', 'esri/WebScene',
    'esri/portal/PortalItem'
]).then(function (_a) {
    var Deferred = _a[0], DojoPromise = _a[1], WebMap = _a[2], WebScene = _a[3], PortalItem = _a[4];
    var ItemHelper = (function () {
        function ItemHelper() {
        }
        ItemHelper.prototype.createWebMap = function (item) {
            var deferred = new Deferred();
            if (!item) {
                deferred.reject(new Error("ItemHelper:: WebMap data does not exist."));
            }
            else if (item.data instanceof Error) {
                deferred.reject(item.data);
            }
            else {
                var wm = void 0;
                if (item.data) {
                    wm = new WebMap({
                        portalItem: item.data
                    });
                }
                if (!wm) {
                    deferred.reject(new Error("ItemHelper:: WebMap does not have usable data."));
                }
                else {
                    deferred.resolve(wm);
                }
            }
            return deferred.promise;
        };
        ItemHelper.prototype.createWebScene = function (item) {
            var deferred = new Deferred();
            if (!item) {
                deferred.reject(new Error("ItemHelper:: WebScene data does not exist."));
            }
            else if (item.data instanceof Error) {
                deferred.reject(item.data);
            }
            else {
                var ws = void 0;
                if (item.data) {
                    ws = new WebScene({
                        portalItem: item.data
                    });
                }
                else if (item.json) {
                    ws = WebScene.fromJSON(item.json.itemData);
                    ws.portalItem = item.json.item;
                }
                if (!ws) {
                    deferred.reject(new Error("ItemHelper:: WebScene does not have usable data."));
                }
                else {
                    deferred.resolve(ws);
                }
            }
            return deferred.promise;
        };
        return ItemHelper;
    }());
    return es6_promise_1.Promise.resolve(new ItemHelper());
}).catch(function (err) {
    throw new Error(err);
}); };


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var esri_promise_1 = __webpack_require__(1);
var es6_promise_1 = __webpack_require__(0);
var DEFAULT_MARKER_SYMBOL = {
    url: "./symbols/mapPin.png",
    width: "36px",
    height: "19px",
    xoffset: "9px",
    yoffset: "18px"
};
exports.default = function () { return esri_promise_1.esriPromise([
    'esri/Camera', 'esri/geometry/Extent', 'esri/geometry/Point',
    'esri/widgets/Search', 'esri/Basemap', 'esri/layers/Layer',
    'esri/core/promiseUtils', 'esri/Graphic', 'esri/PopupTemplate', 'esri/symbols/PictureMarkerSymbol',
    'esri/views/MapView', 'esri/views/SceneView'
]).then(function (_a) {
    var Camera = _a[0], Extent = _a[1], Point = _a[2], Search = _a[3], Basemap = _a[4], Layer = _a[5], promiseList = _a[6], Graphic = _a[7], PopupTemplate = _a[8], PictureMarkerSymbol = _a[9], MapView = _a[10], SceneView = _a[11];
    var UrlParamHelper = (function () {
        function UrlParamHelper() {
        }
        UrlParamHelper.prototype.getViewProperties = function (config) {
            var viewProperties = {};
            if (config.components) {
                viewProperties.ui = {
                    components: config.components.split(",")
                };
            }
            var camera = this.viewPointStringToCamera(config.viewpoint);
            if (camera) {
                viewProperties.camera = camera;
            }
            var center = this.centerStringToPoint(config.center);
            if (center) {
                viewProperties.center = center;
            }
            var level = this.levelStringToLevel(config.level);
            if (level) {
                viewProperties.zoom = level;
            }
            var extent = this.extentStringToExtent(config.extent);
            if (extent) {
                viewProperties.extent = extent;
            }
            return viewProperties;
        };
        UrlParamHelper.prototype.addToView = function (view, config, searchWidget) {
            this.addMarkerToView(view, config.marker);
            this.find(view, config.find, searchWidget);
            this.setBasemapOnView(view, config.basemapUrl, config.basemapReferenceUrl);
        };
        UrlParamHelper.prototype.find = function (view, findString, searchWidget) {
            if (findString) {
                if (searchWidget) {
                    searchWidget.search(findString);
                }
                else {
                    searchWidget = new Search({
                        view: view
                    });
                    searchWidget.search(findString);
                }
                return searchWidget;
            }
        };
        UrlParamHelper.prototype.setBasemapOnView = function (view, basemapUrl, basemapReferenceUrl) {
            if (basemapUrl && view) {
                var pl = promiseList.eachAlways({
                    baseLayer: Layer.fromArcGISServerUrl({
                        url: basemapUrl
                    }),
                    referenceLayer: Layer.fromArcGISServerUrl({
                        url: basemapReferenceUrl
                    })
                });
                pl.then(function (response) {
                    if (response.baseLayer) {
                        var basemapOptions = {
                            baseLayers: response.baseLayer,
                            referenceLayers: null
                        };
                        if (response.referenceLayer) {
                            basemapOptions.referenceLayers = response.referenceLayer;
                        }
                        view.map.basemap = new Basemap(basemapOptions);
                    }
                });
            }
        };
        UrlParamHelper.prototype.viewPointStringToCamera = function (viewpointParamString) {
            var viewpointArray = viewpointParamString && viewpointParamString.split(";");
            if (!viewpointArray || !viewpointArray.length) {
                return;
            }
            else {
                var cameraString = "";
                var tiltHeading = "";
                for (var i = 0; i < viewpointArray.length; i++) {
                    if (viewpointArray[i].indexOf("cam:") !== -1) {
                        cameraString = viewpointArray[i];
                    }
                    else {
                        tiltHeading = viewpointArray[i];
                    }
                }
                if (cameraString !== "") {
                    cameraString = cameraString.substr(4, cameraString.length - 4);
                    var positionArray = cameraString.split(",");
                    if (positionArray.length >= 3) {
                        var x = 0, y = 0, z = 0;
                        x = parseFloat(positionArray[0]);
                        y = parseFloat(positionArray[1]);
                        z = parseFloat(positionArray[2]);
                        var wkid = 4326;
                        if (positionArray.length === 4) {
                            wkid = parseInt(positionArray[3], 10);
                        }
                        var cameraPosition = new Point({
                            x: x,
                            y: y,
                            z: z,
                            spatialReference: {
                                wkid: wkid
                            }
                        });
                        var heading = 0, tilt = 0;
                        if (tiltHeading !== "") {
                            var tiltHeadingArray = tiltHeading.split(",");
                            if (tiltHeadingArray.length >= 0) {
                                heading = parseFloat(tiltHeadingArray[0]);
                                if (tiltHeadingArray.length > 1) {
                                    tilt = parseFloat(tiltHeadingArray[1]);
                                }
                            }
                        }
                        var camera = new Camera({
                            position: cameraPosition,
                            heading: heading,
                            tilt: tilt
                        });
                        return camera;
                    }
                }
            }
        };
        UrlParamHelper.prototype.extentStringToExtent = function (extentString) {
            if (extentString) {
                //?extent=-13054125.21,4029134.71,-13032684.63,4041785.04,102100 or ?extent=-13054125.21;4029134.71;-13032684.63;4041785.04;102100
                //?extent=-117.2672,33.9927,-117.0746,34.1064 or ?extent=-117.2672;33.9927;-117.0746;34.1064
                var extentArray = this._splitArray(extentString);
                if (extentArray.length === 4 || extentArray.length === 5) {
                    var xmin = parseFloat(extentArray[0]), ymin = parseFloat(extentArray[1]), xmax = parseFloat(extentArray[2]), ymax = parseFloat(extentArray[3]);
                    if (!isNaN(xmin) && !isNaN(ymin) && !isNaN(xmax) && !isNaN(ymax)) {
                        var wkid = 4326;
                        if (extentArray.length === 5 && !isNaN(extentArray[4])) {
                            wkid = parseInt(extentArray[4], 10);
                        }
                        var ext = new Extent({
                            xmin: xmin,
                            ymin: ymin,
                            xmax: xmax,
                            ymax: ymax,
                            spatialReference: {
                                wkid: wkid
                            }
                        });
                        return ext;
                    }
                }
            }
        };
        UrlParamHelper.prototype.centerStringToPoint = function (centerString) {
            //?center=-13044705.25,4036227.41,102113&level=12 or ?center=-13044705.25;4036227.41;102113&level=12
            //?center=-117.1825,34.0552&level=12 or ?center=-117.1825;34.0552&level=12
            if (centerString) {
                var centerArray = this._splitArray(centerString);
                if (centerArray.length === 2 || centerArray.length === 3) {
                    var x = parseFloat(centerArray[0]);
                    var y = parseFloat(centerArray[1]);
                    if (isNaN(x) || isNaN(y)) {
                        x = parseFloat(centerArray[0]);
                        y = parseFloat(centerArray[1]);
                    }
                    if (!isNaN(x) && !isNaN(y)) {
                        var wkid = 4326;
                        if (centerArray.length === 3 && !isNaN(centerArray[2])) {
                            wkid = parseInt(centerArray[2], 10);
                        }
                        var point = new Point({
                            x: x,
                            y: y,
                            spatialReference: {
                                wkid: wkid
                            }
                        });
                        return point;
                    }
                }
            }
        };
        UrlParamHelper.prototype.levelStringToLevel = function (levelString) {
            return levelString && parseInt(levelString, 10);
        };
        UrlParamHelper.prototype.addMarkerToView = function (view, markerString) {
            // ?marker=-117;34;4326;My%20Title;http%3A//www.daisysacres.com/images/daisy_icon.gif;My%20location&level=10
            // ?marker=-117,34,4326,My%20Title,http%3A//www.daisysacres.com/images/daisy_icon.gif,My%20location&level=10
            // ?marker=-13044705.25,4036227.41,102100,My%20Title,http%3A//www.daisysacres.com/images/daisy_icon.gif,My%20location&level=10
            // ?marker=-117,34,,My%20Title,http%3A//www.daisysacres.com/images/daisy_icon.gif,My%20location&level=10
            // ?marker=-117,34,,,,My%20location&level=10
            // ?marker=-117,34&level=10
            // ?marker=10406557.402,6590748.134,2526
            if (markerString) {
                var markerArray = this._splitArray(markerString);
                if (markerArray.length >= 2 &&
                    !isNaN(markerArray[0]) &&
                    !isNaN(markerArray[1])) {
                    var x = parseFloat(markerArray[0]), y = parseFloat(markerArray[1]), content = markerArray[3], icon_url = markerArray[4], label = markerArray[5];
                    var wkid = 4326;
                    if (!isNaN(markerArray[2])) {
                        wkid = parseInt(markerArray[2], 10);
                    }
                    var symbolOptions = void 0;
                    if (icon_url) {
                        symbolOptions = {
                            url: icon_url,
                            height: "32px",
                            width: "32px"
                        };
                    }
                    else {
                        symbolOptions = DEFAULT_MARKER_SYMBOL;
                    }
                    var markerSymbol = new PictureMarkerSymbol(symbolOptions);
                    var point = new Point({
                        "x": x,
                        "y": y,
                        "spatialReference": {
                            "wkid": wkid
                        }
                    });
                    var popupTemplate = null;
                    if (content || label) {
                        popupTemplate = new PopupTemplate({
                            "title": label || null,
                            "content": content || null
                        });
                    }
                    var graphic = new Graphic({
                        geometry: point,
                        symbol: markerSymbol,
                        popupTemplate: popupTemplate
                    });
                    if (graphic) {
                        view.graphics.add(graphic);
                        // view.goTo(graphic);
                    }
                }
            }
        };
        UrlParamHelper.prototype._splitArray = function (value) {
            var splitValues;
            if (value) {
                splitValues = value.split(";");
                if (splitValues.length === 1) {
                    splitValues = value.split(",");
                }
            }
            return splitValues;
        };
        return UrlParamHelper;
    }());
    return es6_promise_1.Promise.resolve(new UrlParamHelper());
}).catch(function (err) {
    throw new Error(err);
}); };


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var esri_promise_1 = __webpack_require__(1);
var es6_promise_1 = __webpack_require__(0);
var TAGS_RE = /<\/?[^>]+>/g;
var URL_RE = /([^&=]+)=?([^&]*)(?:&+|$)/g;
var SHARING_PATH = "/sharing";
var ESRI_PROXY_PATH = "/sharing/proxy";
var ESRI_APPS_PATH = "/apps/";
var ESRI_HOME_PATH = "/home/";
var RTL_LANGS = ["ar", "he"];
var LTR = "ltr";
var RTL = "rtl";
var LOCALSTORAGE_PREFIX = "boilerplate_config_";
var DEFAULT_URL_PARAM = "default";
exports.default = function (appSettings, boilerSettings) { return esri_promise_1.esriPromise([
    'dojo/_base/kernel', 'dojo/_base/lang', 'dojo/Deferred',
    'esri/config', 'esri/core/promiseUtils',
    'esri/identity/IdentityManager', 'esri/identity/OAuthInfo',
    'esri/portal/Portal', 'esri/portal/PortalItem', 'esri/portal/PortalQueryParams',
    'dojo/text!config/demoWebMap.json', 'dojo/text!config/demoWebScene.json'
]).then(function (_a) {
    var kernel = _a[0], lang = _a[1], Deferred = _a[2], esriConfig = _a[3], promiseUtils = _a[4], IdentityManager = _a[5], OAuthInfo = _a[6], Portal = _a[7], PortalItem = _a[8], PortalQueryParams = _a[9], webmapText = _a[10], websceneText = _a[11];
    var Boilerplate = (function () {
        function Boilerplate(applicationConfigJSON, boilerplateSettings) {
            this.settings = null;
            this.config = null;
            this.results = null;
            this.portal = null;
            this.direction = null;
            this.locale = null;
            this.units = null;
            this.userPrivileges = null;
            this.settings = lang.mixin({
                webscene: {},
                webmap: {},
                group: {},
                portal: {},
                urlItems: []
            }, boilerplateSettings);
            this.config = applicationConfigJSON;
            this.results = {};
        }
        Boilerplate.prototype.queryGroupItems = function () {
            var _this = this;
            var deferred;
            // Get details about the specified web scene. If the web scene is not shared publicly users will
            // be prompted to log-in by the Identity Manager.
            deferred = new Deferred();
            if (!this.settings.group.fetchItems || !this.config.group) {
                deferred.resolve();
            }
            else {
                var defaultParams = {
                    query: "group:\"{groupid}\" AND -type:\"Code Attachment\"",
                    sortField: "modified",
                    sortOrder: "desc",
                    num: 9,
                    start: 1
                };
                var paramOptions = lang.mixin(defaultParams, this.settings.group.itemParams);
                // place group ID
                if (paramOptions.query) {
                    paramOptions.query = lang.replace(paramOptions.query, {
                        groupid: this.config.group
                    });
                }
                // group params
                var params = new PortalQueryParams(paramOptions);
                this.portal.queryItems(params).then(function (response) {
                    if (!_this.results.group) {
                        _this.results.group = {};
                    }
                    _this.results.group.itemsData = response;
                    deferred.resolve(_this.results.group);
                }, function (error) {
                    if (!error) {
                        error = new Error("Boilerplate:: Error retrieving group items.");
                    }
                    if (!_this.results.group) {
                        _this.results.group = {};
                    }
                    _this.results.group.itemsData = error;
                    deferred.reject(error);
                });
            }
            return deferred.promise;
        };
        Boilerplate.prototype.init = function () {
            var _this = this;
            // Set the web scene and appid if they exist but ignore other url params.
            // Additional url parameters may be defined by the application but they need to be mixed in
            // to the config object after we retrieve the application configuration info. As an example,
            // we'll mix in some commonly used url parameters after
            // the application configuration has been applied so that the url parameters overwrite any
            // configured settings. It's up to the application developer to update the application to take
            // advantage of these parameters.
            // This demonstrates how to handle additional custom url parameters. For example
            // if you want users to be able to specify lat/lon coordinates that define the map's center or
            // specify an alternate basemap via a url parameter.
            // If these options are also configurable these updates need to be added after any
            // application default and configuration info has been applied. Currently these values
            // (center, basemap, theme) are only here as examples and can be removed if you don't plan on
            // supporting additional url parameters in your application.
            this.results.urlParams = {
                config: this._getUrlParamValues(this.settings.urlItems)
            };
            // config defaults <- standard url params
            // we need the web scene, appid,and oauthappid to query for the data
            this._mixinAllConfigs();
            // Define the portalUrl and other default values like the proxy.
            // The portalUrl defines where to search for the web map and application content. The
            // default value is arcgis.com.
            this._initializeApplication();
            // determine boilerplate language properties
            this._setLangProps();
            // check if signed in. Once we know if we're signed in, we can get data and create a portal if needed.
            return this._checkSignIn().always(function () {
                // execute these tasks async
                return promiseUtils.eachAlways([
                    // get application data
                    _this._queryApplicationItem(),
                    // get org data
                    _this._queryPortal()
                ]).always(function () {
                    // gets a temporary config from the users local storage
                    _this.results.localStorageConfig = _this._getLocalConfig();
                    // mixin all new settings from org and app
                    _this._mixinAllConfigs();
                    // let's set up a few things
                    _this._completeApplication();
                    // then execute these async
                    return promiseUtils.eachAlways([
                        // webmap item
                        _this._queryWebMapItem(),
                        // webscene item
                        _this._queryWebSceneItem(),
                        // group information
                        _this._queryGroupInfo(),
                        // items within a specific group
                        _this.queryGroupItems()
                    ]).always(function () {
                        return {
                            settings: _this.settings,
                            config: _this.config,
                            results: _this.results,
                            portal: _this.portal,
                            direction: _this.direction,
                            locale: _this.locale,
                            units: _this.units,
                            userPrivileges: _this.userPrivileges
                        };
                    });
                });
            });
        };
        Boilerplate.prototype._getLocalConfig = function () {
            var appid = this.config.appid;
            if (window.localStorage && appid && this.settings.localConfig.fetch) {
                var lsItem = localStorage.getItem(LOCALSTORAGE_PREFIX + appid);
                if (lsItem) {
                    var config = JSON.parse(lsItem);
                    if (config) {
                        return config;
                    }
                }
            }
        };
        Boilerplate.prototype._queryWebMapItem = function () {
            var _this = this;
            var deferred;
            // Get details about the specified web map. If the web map is not shared publicly users will
            // be prompted to log-in by the Identity Manager.
            deferred = new Deferred();
            if (!this.settings.webmap.fetch) {
                deferred.resolve();
            }
            else {
                // Use local web map instead of portal web map
                if (this.settings.webmap.useLocal) {
                    var json = JSON.parse(webmapText);
                    this.results.webMapItem = {
                        json: json
                    };
                    deferred.resolve(this.results.webMapItem);
                }
                else if (this.config.webmap) {
                    var mapItem = new PortalItem({
                        id: this.config.webmap
                    }).load();
                    mapItem.then(function (itemData) {
                        _this.results.webMapItem = {
                            data: itemData
                        };
                        deferred.resolve(_this.results.webMapItem);
                    }, function (error) {
                        if (!error) {
                            error = new Error("Boilerplate:: Error retrieving webmap item.");
                        }
                        _this.results.webMapItem = {
                            data: error
                        };
                        deferred.reject(error);
                    });
                }
                else {
                    deferred.resolve();
                }
            }
            return deferred.promise;
        };
        Boilerplate.prototype._queryGroupInfo = function () {
            var _this = this;
            var deferred;
            // Get details about the specified group. If the group is not shared publicly users will
            // be prompted to log-in by the Identity Manager.
            deferred = new Deferred();
            if (!this.settings.group.fetchInfo || !this.config.group) {
                deferred.resolve();
            }
            else {
                // group params
                var params = new PortalQueryParams({
                    query: "id:\"" + this.config.group + "\""
                });
                this.portal.queryGroups(params).then(function (response) {
                    if (!_this.results.group) {
                        _this.results.group = {};
                    }
                    _this.results.group.infoData = response;
                    deferred.resolve(_this.results.group);
                }, function (error) {
                    if (!error) {
                        error = new Error("Boilerplate:: Error retrieving group info.");
                    }
                    if (!_this.results.group) {
                        _this.results.group = {};
                    }
                    _this.results.group.infoData = error;
                    deferred.reject(error);
                });
            }
            return deferred.promise;
        };
        Boilerplate.prototype._queryWebSceneItem = function () {
            var _this = this;
            var deferred, sceneItem;
            // Get details about the specified web scene. If the web scene is not shared publicly users will
            // be prompted to log-in by the Identity Manager.
            deferred = new Deferred();
            if (!this.settings.webscene.fetch) {
                deferred.resolve();
            }
            else {
                // Use local web scene instead of portal web scene
                if (this.settings.webscene.useLocal) {
                    // get web scene js file
                    var json = JSON.parse(websceneText);
                    this.results.webSceneItem = {
                        json: json
                    };
                    deferred.resolve(this.results.webSceneItem);
                }
                else if (this.config.webscene) {
                    sceneItem = new PortalItem({
                        id: this.config.webscene
                    }).load();
                    sceneItem.then(function (itemData) {
                        _this.results.webSceneItem = {
                            data: itemData
                        };
                        deferred.resolve(_this.results.webSceneItem);
                    }, function (error) {
                        if (!error) {
                            error = new Error("Boilerplate:: Error retrieving webscene item.");
                        }
                        _this.results.webSceneItem = {
                            data: error
                        };
                        deferred.reject(error);
                    });
                }
                else {
                    deferred.resolve();
                }
            }
            return deferred.promise;
        };
        Boilerplate.prototype._queryApplicationItem = function () {
            var _this = this;
            // Get the application configuration details using the application id. When the response contains
            // itemData.values then we know the app contains configuration information. We'll use these values
            // to overwrite the application defaults.
            var deferred = new Deferred();
            if (!this.config.appid) {
                deferred.resolve();
            }
            else {
                var appItem = new PortalItem({
                    id: this.config.appid
                }).load();
                appItem.then(function (itemData) {
                    itemData.fetchData().then(function (data) {
                        var cfg = {};
                        if (data && data.values) {
                            // get app config values - we'll merge them with config later.
                            cfg = data.values;
                        }
                        // get the extent for the application item. This can be used to override the default web map extent
                        if (itemData.extent) {
                            cfg.application_extent = itemData.extent;
                        }
                        // get any app proxies defined on the application item
                        if (itemData.appProxies) {
                            var layerMixins = itemData.appProxies.map(function (p) {
                                return {
                                    "url": p.sourceUrl,
                                    "mixin": {
                                        "url": p.proxyUrl
                                    }
                                };
                            });
                            cfg.layerMixins = layerMixins;
                        }
                        _this.results.applicationItem = {
                            data: itemData,
                            config: cfg
                        };
                        deferred.resolve(_this.results.applicationItem);
                    }, function (error) {
                        if (!error) {
                            error = new Error("Boilerplate:: Error retrieving application configuration data.");
                        }
                        _this.results.applicationItem = {
                            data: error,
                            config: null
                        };
                        deferred.reject(error);
                    });
                }, function (error) {
                    if (!error) {
                        error = new Error("Boilerplate:: Error retrieving application configuration.");
                    }
                    _this.results.applicationItem = {
                        data: error,
                        config: null
                    };
                    deferred.reject(error);
                });
            }
            return deferred.promise;
        };
        Boilerplate.prototype._queryPortal = function () {
            var _this = this;
            var deferred = new Deferred();
            if (!this.settings.portal.fetch) {
                deferred.resolve();
            }
            else {
                // Query the ArcGIS.com organization. This is defined by the portalUrl that is specified. For example if you
                // are a member of an org you'll want to set the portalUrl to be http://<your org name>.arcgis.com. We query
                // the organization by making a self request to the org url which returns details specific to that organization.
                // Examples of the type of information returned are custom roles, units settings, helper services and more.
                // If this fails, the application will continue to function
                var portal = new Portal().load();
                this.portal = portal;
                portal.then(function (response) {
                    if (_this.settings.webTierSecurity) {
                        var trustedHost = void 0;
                        if (response.authorizedCrossOriginDomains && response.authorizedCrossOriginDomains.length > 0) {
                            for (var i = 0; i < response.authorizedCrossOriginDomains.length; i++) {
                                trustedHost = response.authorizedCrossOriginDomains[i];
                                // add if trusted host is not null, undefined, or empty string
                                if (_this._isDefined(trustedHost) && trustedHost.length > 0) {
                                    esriConfig.request.corsEnabledServers.push({
                                        host: trustedHost,
                                        withCredentials: true
                                    });
                                }
                            }
                        }
                    }
                    // set boilerplate units
                    var units = "metric";
                    if (response.user && response.user.units) {
                        units = response.user.units;
                    }
                    else if (response.units) {
                        units = response.units;
                    }
                    else if ((response.user && response.user.region && response.user.region === "US") || (response.user && !response.user.region && response.region === "US") || (response.user && !response.user.region && !response.region) || (!response.user && response.ipCntryCode === "US") || (!response.user && !response.ipCntryCode && kernel.locale === "en-us")) {
                        // use feet/miles only for the US and if nothing is set for a user
                        units = "english";
                    }
                    _this.units = units;
                    // are any custom roles defined in the organization?
                    if (response.user && _this._isDefined(response.user.roleId)) {
                        if (response.user.privileges) {
                            _this.userPrivileges = response.user.privileges;
                        }
                    }
                    // set data for portal on boilerplate
                    _this.results.portal = {
                        data: response
                    };
                    deferred.resolve(_this.results.portal);
                }, function (error) {
                    if (!error) {
                        error = new Error("Boilerplate:: Error retrieving organization information.");
                    }
                    _this.results.portal = {
                        data: error
                    };
                    deferred.reject(error);
                });
            }
            return deferred.promise;
        };
        Boilerplate.prototype._overwriteExtent = function (itemInfo, extent) {
            var item = itemInfo && itemInfo.item;
            if (item && item.extent) {
                item.extent = [
                    [
                        parseFloat(extent[0][0]), parseFloat(extent[0][1])
                    ],
                    [
                        parseFloat(extent[1][0]), parseFloat(extent[1][1])
                    ]
                ];
            }
        };
        Boilerplate.prototype._completeApplication = function () {
            // ArcGIS.com allows you to set an application extent on the application item. Overwrite the
            // existing extents with the application item extent when set.
            var applicationExtent = this.config.application_extent;
            var results = this.results;
            if (this.config.appid && applicationExtent && applicationExtent.length > 0) {
                this._overwriteExtent(results.webSceneItem.data, applicationExtent);
                this._overwriteExtent(results.webMapItem.data, applicationExtent);
            }
            // get helper services
            var configHelperServices = this.config.helperServices;
            var portalHelperServices = this.portal && this.portal.helperServices;
            // see if config has a geometry service
            var configGeometryUrl = configHelperServices && configHelperServices.geometry && configHelperServices.geometry.url;
            // seee if portal has a geometry service
            var portalGeometryUrl = portalHelperServices && portalHelperServices.geometry && portalHelperServices.geometry.url;
            // use the portal geometry service or config geometry service
            var geometryUrl = portalGeometryUrl || configGeometryUrl;
            if (geometryUrl) {
                // set the esri config to use the geometry service
                esriConfig.geometryServiceUrl = geometryUrl;
            }
            if ((!this.config.webmap || this.config.webmap === DEFAULT_URL_PARAM) && this.settings.defaultWebmap) {
                this.config.webmap = this.settings.defaultWebmap;
            }
            if ((!this.config.webscene || this.config.webscene === DEFAULT_URL_PARAM) && this.settings.defaultWebscene) {
                this.config.webscene = this.settings.defaultWebscene;
            }
            if ((!this.config.group || this.config.group === DEFAULT_URL_PARAM) && this.settings.defaultGroup) {
                this.config.group = this.settings.defaultGroup;
            }
        };
        Boilerplate.prototype._setLangProps = function () {
            var direction = LTR;
            RTL_LANGS.forEach(function (l) {
                if (kernel.locale.indexOf(l) !== -1) {
                    direction = RTL;
                }
            });
            // set boilerplate language direction
            this.direction = direction;
            // set boilerplate langauge locale
            this.locale = kernel.locale;
        };
        Boilerplate.prototype._mixinAllConfigs = function () {
            lang.mixin(this.config, this.results.applicationItem ? this.results.applicationItem.config : null, this.results.localStorageConfig, this.results.urlParams ? this.results.urlParams.config : null);
        };
        Boilerplate.prototype._getUrlParamValues = function (items) {
            // retrieves only the items specified from the URL object.
            // Gets parameters from the URL, convert them to an object and remove HTML tags.
            var urlObject = this._createUrlParamsObject();
            var obj = {};
            if (urlObject && items && items.length) {
                for (var i = 0; i < items.length; i++) {
                    var item = urlObject[items[i]];
                    if (item) {
                        if (typeof item === "string") {
                            switch (item.toLowerCase()) {
                                case "true":
                                    obj[items[i]] = true;
                                    break;
                                case "false":
                                    obj[items[i]] = false;
                                    break;
                                default:
                                    obj[items[i]] = item;
                            }
                        }
                        else {
                            obj[items[i]] = item;
                        }
                    }
                }
            }
            return obj;
        };
        Boilerplate.prototype._createUrlParamsObject = function () {
            // retrieve url parameters. Templates all use url parameters to determine which arcgis.com
            // resource to work with.
            // Scene templates use the webscene param to define the scene to display
            // appid is the id of the application based on the template. We use this
            // id to retrieve application specific configuration information. The configuration
            // information will contain the values the  user selected on the template configuration
            // panel.
            return this._stripObjectTags(this._urlToObject());
        };
        Boilerplate.prototype._initializeApplication = function () {
            // If this app is hosted on an Esri environment.
            if (this.settings.esriEnvironment) {
                var appLocation = void 0, instance = void 0;
                // Check to see if the app is hosted or a portal. If the app is hosted or a portal set the
                // portalUrl and the proxy. Otherwise use the portalUrl set it to arcgis.com.
                // We know app is hosted (or portal) if it has /apps/ or /home/ in the url.
                appLocation = location.pathname.indexOf(ESRI_APPS_PATH);
                if (appLocation === -1) {
                    appLocation = location.pathname.indexOf(ESRI_HOME_PATH);
                }
                // app is hosted and no portalUrl is defined so let's figure it out.
                if (appLocation !== -1) {
                    // hosted or portal
                    instance = location.pathname.substr(0, appLocation); //get the portal instance name
                    this.config.portalUrl = "https://" + location.host + instance;
                    this.config.proxyUrl = "https://" + location.host + instance + ESRI_PROXY_PATH;
                }
            }
            esriConfig.portalUrl = this.config.portalUrl;
            // Define the proxy url for the app
            if (this.config.proxyUrl) {
                esriConfig.request.proxyUrl = this.config.proxyUrl;
            }
        };
        Boilerplate.prototype._checkSignIn = function () {
            var deferred, signedIn, oAuthInfo;
            deferred = new Deferred();
            //If there's an oauth appid specified register it
            if (this.config.oauthappid) {
                oAuthInfo = new OAuthInfo({
                    appId: this.config.oauthappid,
                    portalUrl: this.config.portalUrl,
                    popup: true
                });
                IdentityManager.registerOAuthInfos([oAuthInfo]);
            }
            // check sign-in status
            signedIn = IdentityManager.checkSignInStatus(this.config.portalUrl + SHARING_PATH);
            // resolve regardless of signed in or not.
            signedIn.always(deferred.resolve);
            return deferred.promise;
        };
        Boilerplate.prototype._isDefined = function (value) {
            return (value !== undefined) && (value !== null);
        };
        Boilerplate.prototype._stripStringTags = function (data) {
            return data.replace(TAGS_RE, "");
        };
        Boilerplate.prototype._stripObjectTags = function (data) {
            return Object.keys(data).reduce(function (p, c, i) {
                var obj = p;
                if (typeof data[c] === "string") {
                    obj[c] === c.replace(TAGS_RE, "");
                }
                else {
                    obj[c] === c;
                }
                return obj;
            }, {});
        };
        Boilerplate.prototype._urlToObject = function () {
            var query = (window.location.search || "?").substr(1), map = {};
            query.replace(URL_RE, function (match, key, value) {
                map[key] = decodeURIComponent(value);
                return '';
            });
            return map;
        };
        return Boilerplate;
    }());
    return es6_promise_1.Promise.resolve(new Boilerplate(appSettings, boilerSettings));
}).catch(function (err) {
    throw new Error(err);
}); };


/***/ }),
/* 7 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 8 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 9 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map