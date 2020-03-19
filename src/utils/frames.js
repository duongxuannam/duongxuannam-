/**
 * handle behavior with screen render frames
 */

import { InteractionManager } from 'react-native';

/* Returns a promise that will resolve on the next AnimationFrame */
export function nextFrame() {
  return new Promise(resolve => {
    requestAnimationFrame(() => {
      resolve();
    });
  });
}

/* Returns a promise that will resolve on the next AnimationFrame */
export function afterInteract(deadLine = 1000) {
  return new Promise(resolve => {
    const timeout = setTimeout(() => {
      resolve();
      if (InteractionManager.reset) {
        InteractionManager.reset();
      }
    }, deadLine);

    InteractionManager.runAfterInteractions(() => {
      clearTimeout(timeout);
      resolve();
    });
  });
}

/* Applies `fn` to each element of `collection`, iterating once per frame */
export function mapInFrames(collection, fn) {
  let queue = Promise.resolve();
  const values = [];
  collection.forEach(item => {
    queue = queue.then(() => nextFrame().then(() => values.push(fn(item))));
  });
  return queue.then(() => values);
}

/**
 * waiting x frames before the Promise will resolve
 * @param  {Number}    frame - the number of frames the Promise waits before resolving
 * @param  {...} args - optional values that would be the params of the Promises resolve
 * @return {Promise} which will resolve after the waiting frames
 */
export const waitFrames = (frame = 1, ...args) =>
  new Promise(resolve => {
    let i = 0;
    const count = () => {
      if (++i >= frame) {
        return resolve(frame, ...args);
      }
      return requestAnimationFrame(count);
    };
    requestAnimationFrame(count);
  });

/**
 * resolve when fn returns a truthy value.
 * @param  {Function}  fn   a function that will be called every frame to check for changes
 * @param  {...[type]} args - optional values that would be the params of the Promises resolve
 * @return {Promise} which will resolve after the waiting frames
 */
export const when = (fn, ...args) =>
  nextFrame().then(() => {
    const result = fn(...args);
    if (result) {
      return args && args.length > 1 ? args : result;
    }
    return when(fn, ...args);
  });

/**
 * until fn returns a truthy value do not resolve.
 * @param  {Function}  fn   a function that will be called every frame to check for changes
 * @param  {...[type]} args - optional values that would be the params of the Promises resolve
 * @return {Promise} which will resolve after the waiting frames
 */
export const until = (fn, ...args) =>
  nextFrame().then(() => {
    const result = fn(...args);
    if (result) {
      return until(fn, ...args);
    }
    return args && args.length > 1 ? args : result;
  });

/**
 * create an animationframe loop that calls a function (callback) in every frame
 * @param  {Function} cb - gets called in every frame - for rendering mostly
 * @return {Function}  a function which cancels the initialed loop by calling it
 */
export const loop = cb => {
  if (typeof cb !== 'function') {
    throw new Error('callback needs to be a function');
  }
  let f = true;
  const frame = () => {
    if (f) {
      cb();
      requestAnimationFrame(frame);
    }
  };
  requestAnimationFrame(frame);
  return () => {
    f = false;
  };
};

/**
 * create a throttled animationframe loop that calls a function (callback) in every specified
 * @param  {Function} cb        gets called in every specified frame
 * @param  {Number}   throttle in wich interval cb is called
 * @return {Function}  a function which cancels the initialed loop by calling it
 */
export const throttleFrames = (cb, throttle = 0) => {
  if (typeof cb !== 'function') {
    throw new Error('callback needs to be a function');
  }
  let f = true;
  let i = 0;
  const frame = () => {
    ++i;
    if (f) {
      if (throttle && i % throttle === 0) {
        cb();
      }
      requestAnimationFrame(frame);
    }
  };
  requestAnimationFrame(frame);
  return () => {
    f = false;
  };
};

/**
 * delays the call to nextFrame with setTimeout
 * @param  {Number}    ms    delay in ms
 * @param  {...} args - optional values that would be the params of the Promises resolve
 * @return {Promise} which will resolve after the delayed animationframe
 */
export const delay = (ms = 0, ...args) =>
  new Promise(resolve => setTimeout(() => nextFrame().then(resolve(...args)), ms));

export { mapInFrames as frameSequence };
export { mapInFrames as sequence };
export { waitFrames as wait };
export { loop as nextFrames };
export { loop as onEnterFrame };
export { throttleFrames as throttle };
export { nextFrame as frame };

export default nextFrame;
