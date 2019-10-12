export default class RecaptchaVerificator {

    static _scriptLoaded = false;
    static _siteKey = '6LczSL0UAAAAAKk_T5spyk0cXCjCp-8obXPBghZe';

    static _loadScript() {

        return new Promise((resolve, reject) => {
            if (RecaptchaVerificator._scriptLoaded) {
                return resolve();
            }

            window.recaptchCallback = () => {
                RecaptchaVerificator._scriptLoaded = true;
                resolve();
            };

            const script = document.createElement('script');

            script.src = `https://www.google.com/recaptcha/api.js?onload=recaptchCallback&render=explicit`;
            script.async = true;
            script.onerror = reject;

            document.body.appendChild(script);
        });
    }

    _widgetId = null;
    _callback = null;
    _containerElem = null;

    constructor(containerElem) {
        this._containerElem = containerElem;
    }

    get _alreadyRendered() {
        return this._widgetId !== null;
    }

    verify(callback) {
        return (...args) => {
            if (this._alreadyRendered) {
                window.grecaptcha.execute(this._widgetId);
                return;
            }

            this.callback = () => callback.apply(this, args);

            RecaptchaVerificator._loadScript()
                .then(() => {
                    this._widgetId = window.grecaptcha.render(this._containerElem, {
                        sitekey : RecaptchaVerificator._siteKey,
                        size: 'invisible',
                        callback: () => this.callback()
                    });

                    window.grecaptcha.execute(this._widgetId);
                })
                .catch(err => console.error(err));
        };
    }

    reset() {
        if (RecaptchaVerificator._scriptLoaded && this._alreadyRendered) {
            window.grecaptcha.reset(this._widgetId);
        }
    }

}
