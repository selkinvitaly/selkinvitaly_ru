"use strict";

import BaseComponent from "./BaseComponent";

/**
 * This class toggles CSS class for the top navigation
 *
 * It requires:
 *  - classList interface (polyfill)
 */
export default class NegativeTopNav extends BaseComponent {
  constructor(opts) {
    super(opts);

    // protected
    this._scrollHandler = () => {
      let currentScroll = window.pageYOffset;
      let viewHeight = document.documentElement.clientHeight;

      let topNav = this._passedOpts.elems.topNav;
      let classes = this._passedOpts.classes;

      let toggleHeight = viewHeight - topNav.offsetHeight;

      let isNegative = topNav.classList.contains(classes.negative);

      // already set
      if (isNegative && currentScroll >= toggleHeight) return;
      if (!isNegative && currentScroll < toggleHeight) return;

      topNav.classList.toggle(classes.negative);
    };

    window.addEventListener("scroll", this._scrollHandler);
  }

}
