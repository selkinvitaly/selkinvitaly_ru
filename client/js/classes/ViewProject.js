import BaseComponent from './BaseComponent';
import blueimpGallery from '../vendor/blueimp-gallery';


export default class ViewProject extends BaseComponent {

    constructor(opts) {
        super(opts);

        this._ATTR_LINK = 'data-project-target';
        this._ATTR_MODAL = 'data-project-view';

        this._closeBtnElem    = null; // close button for the current (opened) modal window
        this._modalElem       = null; // the current (opened) modal element
        this._modalWindowElem = null; // window for the current (opened) modal element
        this._galleryInstance = null; // instance of gallery for the current (opened) modal window

        this._clickHandler = e => {
            const foundProjectLink = this._findProjectLink(e.target);

            if (!foundProjectLink) {
                return;
            }

            e.preventDefault();

            const foundProjectModal = this._findProjectModal(foundProjectLink);

            if (!foundProjectModal) {
                return;
            }

            this._showProject(foundProjectModal);
        };

        this._bubbleHandler = e => {
            e.stopPropagation();
        };

        this._closeHandler = e => {
            e.preventDefault();

            this._hideProject();
        };

        this._hotkeyHandler = e => {
            if (e.keyCode !== 27) {
                return;
            }

            this._hideProject();
        };

        opts.elems.container.addEventListener('click', this._clickHandler);
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

  _attachModalHandlers() {
      this._closeBtnElem.addEventListener('click', this._closeHandler);
      this._modalElem.addEventListener('click', this._closeHandler); // for outside click
      this._modalWindowElem.addEventListener('click', this._bubbleHandler); // for outside click
      document.addEventListener('keydown', this._hotkeyHandler); // pressing 'esc' key closes the modal window
  }

  _removeModalHandlers() {
      this._closeBtnElem.removeEventListener('click', this._closeHandler);
      this._modalElem.removeEventListener('click', this._closeHandler);
      this._modalWindowElem.removeEventListener('click', this._bubbleHandler);
      document.removeEventListener('keydown', this._hotkeyHandler);
  }

  _openModal() {
      const classes = this._passedOpts.classes;

      document.body.style.overflow = 'hidden';
      this._modalElem.classList.remove(classes.closed);
  }

  _closeModal() {
      const classes = this._passedOpts.classes;

      document.body.style.overflow = null;
      this._modalElem.classList.add(classes.closed);
  }

  _initGallery() {
      const galleryElem = this._galleryElem;
      const slides = this._getSlides();

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

  _getSlides() {
      const classes = this._passedOpts.classes;
      const images = this._modalElem.querySelectorAll('.' + classes.images);

      return Array.prototype.map.call(images, img => {
          return {
              href: img.src,
              title: img.alt
          };
      });
  }

  _findElemsForModal(modalElem) {
      const classes = this._passedOpts.classes;

      this._modalElem       = modalElem;
      this._closeBtnElem    = modalElem.querySelector('.' + classes.closeBtn);
      this._modalWindowElem = modalElem.querySelector('.' + classes.modalWindow);
      this._galleryElem     = modalElem.querySelector('.' + classes.gallery);
  }

  _clearElemsForModal() {
      this._modalElem       = null;
      this._closeBtnElem    = null;
      this._modalWindowElem = null;
      this._galleryElem     = null;
  }

  _findProjectModal(targetLink) {
      const modalName = targetLink.getAttribute(this._ATTR_LINK);
      return document.querySelector(`*[${this._ATTR_MODAL}='${modalName}']`);
  }

  _findProjectLink(targetOfEvent) {
      const classes = this._passedOpts.classes;
      return targetOfEvent.closest(`*[${this._ATTR_LINK}]`);
  }

}
