"use strict";

import BaseComponent from "./BaseComponent";

/**
 * This class is used for adaptive navigation
 *
 * It requires:
 *  - classList interface (polyfill)
 */
export default class AdaptiveNav extends BaseComponent {
  constructor(opts) {
    super(opts);

    // protected
    this._openHandler = e => {
      e.preventDefault();
      this.openMenu();
    };

    // protected
    this._closeHandler = e => {
      e.preventDefault();
      this.closeMenu();
    };

    // protected
    this._chooseHandler = e => {
      let foundItem = this._findMenuItem(e.target);

      if (!foundItem) {
        return;
      }

      this.closeMenu();
    };

    opts.elems.openBtn.addEventListener("click", this._openHandler);
    opts.elems.closeBtn.addEventListener("click", this._closeHandler);
    opts.elems.menuList.addEventListener("click", this._chooseHandler);
  }

  /**
   * It looks for the target item menu in DOM
   *
   * @param {element}  targetOfEvent event.target element
   * @return {element} found element
   * @return {null}    If element wasn't found
   */
  _findMenuItem(targetOfEvent) {
    let classes = this._passedOpts.classes;

    return targetOfEvent.closest("." + classes.menuItem);
  }

  openMenu() {
    let menu = this._passedOpts.elems.menu;
    let classes = this._passedOpts.classes;

    menu.classList.remove(classes.closed);
    document.body.style.overflow = "hidden";
  }

  closeMenu() {
    let menu = this._passedOpts.elems.menu;
    let classes = this._passedOpts.classes;

    menu.classList.add(classes.closed);
    document.body.style.overflow = null;
  }

}
