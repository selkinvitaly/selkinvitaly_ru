"use strict";

import BaseComponent from "./BaseComponent";

/**
 * This class is used for smooth scrolling on the page
 * This class uses delegate design pattern
 *
 * It requires:
 *  - requestAnimationFrame (polyfill)
 *  - Element.prototype.closest (polyfill)
 *  - window.performance (polyfill)
 *  - Promise (polyfill)
 */
export default class GoToScroll extends BaseComponent {
  constructor(opts) {
    super(opts);

    this._ATTR_AREA = "data-goto-area";
    this._ATTR_LINK = "data-goto-link";

    // protected
    this._clickHandler = e => {
      let foundLink = this._findTargetLink(e.target);

      if (!foundLink) {
        return;
      }

      e.preventDefault();

      let foundArea = this._findArea(foundLink);

      if (!foundArea) {
        return;
      }

      let scrollCoordY = this._calcOffsetY(foundArea);
      let scrollAnimate = promisify(scrollTo);

      scrollAnimate(scrollCoordY, 300);
    };

    opts.elems.container.addEventListener("click", this._clickHandler);
  }

  /**
   * It looks for the target link in DOM by data attribute
   *
   * @param {element}  targetOfEvent event.target element
   * @return {element} found element
   * @return {null}    If element wasn't found
   */
  _findTargetLink(targetOfEvent) {
    return targetOfEvent.closest(`*[${this._ATTR_LINK}]`);
  }

  /**
   * It looks for the target area in DOM by target link
   *
   * @param {element}  the target link
   * @return {element} found element
   * @return {null}    If element wasn't found
   */
  _findArea(targetLink) {
    let areaName = targetLink.getAttribute(this._ATTR_LINK);

    return document.querySelector(`*[${this._ATTR_AREA}="${areaName}"]`);
  }

  /**
   * It calculates top offset of document for the target link
   *
   * @param {element} the target area
   * @return {number} top offset of document
   */
  _calcOffsetY(targetArea) {
    let { top } = targetArea.getBoundingClientRect();

    // check to see If was passed the parameter "offset"
    let offset = +this._passedOpts.offset || 0;
    let calculatedTop = top + window.pageYOffset - offset;

    return (calculatedTop > 0) ? calculatedTop : 0;
  }

}

/**
 * Animate of vertical scrolling
 * @param  {number}   to       Y coordinate of the end position
 * @param  {number}   [ms=200] The duration, ms
 * @param  {function} cb       callback
 * @return {undefined}
 */
function scrollTo(to, ms = 200, cb) {
  let start   = window.performance.now();
  let from    = window.pageYOffset;
  let scrollX = window.pageXOffset;
  let delta   = to - from;

  window.requestAnimationFrame(function step(timestamp) {
    let timePassed = timestamp - start;

    if (timePassed > ms || delta === 0) {
      timePassed = ms;
    }

    let progress = timePassed / ms;
    let current  = progress * delta + from;

    window.scrollTo(scrollX, current + 1); // 1px for firefox

    if (timePassed < ms) {
      window.requestAnimationFrame(step);
    } else if (cb) {
      cb(null);
    }
  });
}

/**
 * It's decorator for promisify functions
 * @param  {func} func It's function that takes the last parameter of callback
 * @return {func} func Decorated function
 */
function promisify(func) {
  return function(...args) {

    return new Promise(resolve => {
      let done = function(err, res) {
        if (err !== null) {
          reject(err);
        }

        resolve(res);
      };

      args.push(done);
      func.apply(this, args);
    });

  };
}
