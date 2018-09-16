import BaseComponent from './BaseComponent';


export default class GoToScroll extends BaseComponent {

    constructor(opts) {
        super(opts);

        this._ATTR_AREA = 'data-goto-area';
        this._ATTR_LINK = 'data-goto-link';

        this._clickHandler = e => {
            const foundLink = this._findTargetLink(e.target);

            if (!foundLink) {
                return;
            }

            e.preventDefault();

            const foundArea = this._findArea(foundLink);

            if (!foundArea) {
                return;
            }

            const scrollCoordY = this._calcOffsetY(foundArea);
            const scrollAnimate = promisify(scrollTo);

            scrollAnimate(scrollCoordY, 300);
        };

        opts.elems.container.addEventListener('click', this._clickHandler);
    }

    _findTargetLink(targetOfEvent) {
        return targetOfEvent.closest(`*[${this._ATTR_LINK}]`);
    }

    _findArea(targetLink) {
        const areaName = targetLink.getAttribute(this._ATTR_LINK);

        return document.querySelector(`*[${this._ATTR_AREA}='${areaName}']`);
    }

    _calcOffsetY(targetArea) {
      const { top } = targetArea.getBoundingClientRect();

      // check to see If was passed the parameter 'offset'
      const offset = +this._passedOpts.offset || 0;
      const calculatedTop = top + window.pageYOffset - offset;

      return (calculatedTop > 0) ? calculatedTop : 0;
    }

}


function scrollTo(to, ms = 200, cb) {
    const start   = window.performance.now();
    const from    = window.pageYOffset;
    const scrollX = window.pageXOffset;
    const delta   = to - from;

    window.requestAnimationFrame(function step(timestamp) {
        let timePassed = timestamp - start;

        if (timePassed > ms || delta === 0) {
            timePassed = ms;
        }

        const progress = timePassed / ms;
        const current  = progress * delta + from;

        window.scrollTo(scrollX, current + 1); // 1px for firefox

        if (timePassed < ms) {
            window.requestAnimationFrame(step);
        } else if (cb) {
            cb(null);
        }
    });
}


function promisify(func) {
    return function(...args) {
        return new Promise(resolve => {
            const done = function(err, res) {
                if (err !== null) {
                    reject(err);
                    return;
                }

                resolve(res);
            };

            args.push(done);
            func.apply(this, args);
        });

    };
}
