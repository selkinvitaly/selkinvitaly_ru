import BaseComponent from './BaseComponent';


export default class AdaptiveNav extends BaseComponent {

    constructor(opts) {
        super(opts);

        this._openHandler = e => {
            e.preventDefault();
            this.openMenu();
        };

        this._closeHandler = e => {
            e.preventDefault();
            this.closeMenu();
        };

        this._chooseHandler = e => {
            const foundItem = this._findMenuItem(e.target);

            if (!foundItem) {
                return;
            }

            this.closeMenu();
        };

        opts.elems.openBtn.addEventListener('click', this._openHandler);
        opts.elems.closeBtn.addEventListener('click', this._closeHandler);
        opts.elems.menuList.addEventListener('click', this._chooseHandler);
    }

    _findMenuItem(targetOfEvent) {
        const classes = this._passedOpts.classes;

        return targetOfEvent.closest('.' + classes.menuItem);
    }

    openMenu() {
        const menu = this._passedOpts.elems.menu;
        const classes = this._passedOpts.classes;

        menu.classList.remove(classes.closed);
        document.body.style.overflow = 'hidden';
    }

    closeMenu() {
        const menu = this._passedOpts.elems.menu;
        const classes = this._passedOpts.classes;

        menu.classList.add(classes.closed);
        document.body.style.overflow = null;
    }

}
