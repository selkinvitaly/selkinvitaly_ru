import BaseComponent from './BaseComponent';


export default class NegativeTopNav extends BaseComponent {

    constructor(opts) {
        super(opts);

        this._scrollHandler = () => {
            const currentScroll = window.pageYOffset;
            const viewHeight = document.documentElement.clientHeight;

            const topNav = this._passedOpts.elems.topNav;
            const classes = this._passedOpts.classes;

            const toggleHeight = viewHeight - topNav.offsetHeight;

            const isNegative = topNav.classList.contains(classes.negative);

            // already set
            if (isNegative && currentScroll >= toggleHeight) return;
            if (!isNegative && currentScroll < toggleHeight) return;

            topNav.classList.toggle(classes.negative);
        };

        window.addEventListener('scroll', this._scrollHandler);
    }

}
