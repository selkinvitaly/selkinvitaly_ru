"use strict";

import BaseComponent from "./BaseComponent";
import blueimpGallery from "../vendor/blueimp-gallery";
/**
 * This class is used for show the project details
 * This class uses delegate design pattern
 *
 * It requires:
 *  - classList interface (polyfill)
 *  - Element.prototype.closest (polyfill)
 *  - blueimp-gallery (https://github.com/blueimp/Gallery/)
 */
export default class ViewProject extends BaseComponent {
  constructor(opts) {
    super(opts);

    this._ATTR_LINK = "data-project-target";
    this._ATTR_MODAL = "data-project-view";

    this._closeBtnElem    = null; // close button for the current (opened) modal window
    this._modalElem       = null; // the current (opened) modal element
    this._modalWindowElem = null; // window for the current (opened) modal element
    this._galleryInstance = null; // instance of gallery for the current (opened) modal window

    // protected
    this._clickHandler = e => {
      let foundProjectLink = this._findProjectLink(e.target);

      if (!foundProjectLink) {
        return;
      }

      e.preventDefault();

      let foundProjectModal = this._findProjectModal(foundProjectLink);

      if (!foundProjectModal) {
        return;
      }

      this._showProject(foundProjectModal);
    };

    // protected
    this._bubbleHandler = e => {
      e.stopPropagation();
    };

    // protected
    this._closeHandler = e => {
      e.preventDefault();

      this._hideProject();
    };

    // protected
    this._hotkeyHandler = e => {
      if (e.keyCode !== 27) {
        return;
      }

      this._hideProject();
    };

    opts.elems.container.addEventListener("click", this._clickHandler);
  }

  _showProject(modalElem) {
    this._findElemsForModal(modalElem);
    this._attachModalHandlers();
    this._openModal();
    this._initGallery();
  }

  _hideProject() {
    this._removeModalHandlers();
    this._destroyGallery();
    this._closeModal();
    this._clearElemsForModal();
  }

  /**
   * It attaches all necessary handlers for the current modal element
   */
  _attachModalHandlers() {
    this._closeBtnElem.addEventListener("click", this._closeHandler);
    this._modalElem.addEventListener("click", this._closeHandler); // for outside click
    this._modalWindowElem.addEventListener("click", this._bubbleHandler); // for outside click
    document.addEventListener("keydown", this._hotkeyHandler); // pressing "esc" key closes the modal window
  }

  /**
   * It removes all necessary handlers for the current modal element
   */
  _removeModalHandlers() {
    this._closeBtnElem.removeEventListener("click", this._closeHandler);
    this._modalElem.removeEventListener("click", this._closeHandler);
    this._modalWindowElem.removeEventListener("click", this._bubbleHandler);
    document.removeEventListener("keydown", this._hotkeyHandler);
  }

  _openModal() {
    let classes = this._passedOpts.classes;

    document.body.style.overflow = "hidden";
    this._modalElem.classList.remove(classes.closed);
  }

  _closeModal() {
    let classes = this._passedOpts.classes;

    document.body.style.overflow = null;
    this._modalElem.classList.add(classes.closed);
  }

  /**
   * It initializes the gallery instance and saves it
   */
  _initGallery() {
    let galleryElem = this._galleryElem;
    let slides = this._getSlides();

    // read more:
    // https://github.com/blueimp/Gallery/blob/master/README.md#options
    this._galleryInstance = blueimpGallery(slides, {
      container: galleryElem,
      carousel: true,
      enableKeyboardNavigation: true,
      stretchImages: false,
      preloadRange: 1
    });
  }

  _destroyGallery() {
    this._galleryInstance.close();
    this._galleryInstance = null;
  }

  /**
   * It returns array with slides for gallery constructor
   */
  _getSlides() {
    let classes = this._passedOpts.classes;
    let images = this._modalElem.querySelectorAll("." + classes.images);

    return Array.prototype.map.call(images, img => {
      return {
        href: img.src,
        title: img.alt
      };
    });
  }

  /**
   * It finds all necessary elements for the current modal element
   *
   * @param {element}    modalElem the current modal element
   * @return {undefined}
   */
  _findElemsForModal(modalElem) {
    let classes = this._passedOpts.classes;

    this._modalElem       = modalElem;
    this._closeBtnElem    = modalElem.querySelector("." + classes.closeBtn);
    this._modalWindowElem = modalElem.querySelector("." + classes.modalWindow);
    this._galleryElem     = modalElem.querySelector("." + classes.gallery);
  }

  /**
   * It just resets properties for the modal window, because It already has closed
   */
  _clearElemsForModal() {
    this._modalElem       = null;
    this._closeBtnElem    = null;
    this._modalWindowElem = null;
    this._galleryElem     = null;
  }

  /**
   * It looks for the target modal window in DOM by target link
   *
   * @param {element}  targetLink the target link
   * @return {element}            found element
   * @return {null}               If element wasn't found
   */
  _findProjectModal(targetLink) {
    let modalName = targetLink.getAttribute(this._ATTR_LINK);

    return document.querySelector(`*[${this._ATTR_MODAL}="${modalName}"]`);
  }

  /**
   * It looks for the target project link in DOM
   *
   * @param {element}  targetOfEvent event.target element
   * @return {element} found element
   * @return {null}    If element wasn't found
   */
  _findProjectLink(targetOfEvent) {
    let classes = this._passedOpts.classes;

    return targetOfEvent.closest(`*[${this._ATTR_LINK}]`);
  }

}
