"use strict";

import BaseComponent from "./BaseComponent";

/**
 * This class sends messages to email
 *
 * It requires:
 *  - classList interface (polyfill)
 *  - fetch interface (polyfill)
 */
export default class SendMail extends BaseComponent {
  constructor(opts) {
    super(opts);

    this._ERR_MSG_BAD_DATA = "Oops! You entered incorrect data!";
    this._ERR_MSG_SERVER   = "The message hasn't been sent! Try again letter!";
    this._OK_MSG_SENT      = "The message has been sent!";

    this._savedLabelButton = opts.elems.sendBtnText.textContent;

    // protected
    this._submitHandler = e => {
      e.preventDefault();

      let body = this._serializeForm();

      this._setLoadingState();

      fetch("/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body
      }).then(res => {
        this._handleResponse(res.status);
      }).catch(err => {
        this._handleResponse(500);
      });
    };

    opts.elems.form.addEventListener("submit", this._submitHandler);
  }

  _handleResponse(statusCode) {
    if (statusCode === 200) {
      this._setSuccessState(this._OK_MSG_SENT);
      this._resetForm();
    } else if (statusCode === 400) {
      this._setErrorState(this._ERR_MSG_BAD_DATA);
    } else {
      this._setErrorState(this._ERR_MSG_SERVER);
    }

    setTimeout(() => {
      this._setDefaultState();
    }, 4000);
  }

  _setErrorState(msg) {
    let buttonElem = this._passedOpts.elems.sendBtn;
    let buttonTextElem = this._passedOpts.elems.sendBtnText;
    let classes = this._passedOpts.classes;

    this._resetState();
    buttonElem.disabled = true;
    buttonTextElem.textContent = msg;
    buttonElem.classList.add(classes.stateError);
  }

  _setSuccessState(msg) {
    let buttonElem = this._passedOpts.elems.sendBtn;
    let buttonTextElem = this._passedOpts.elems.sendBtnText;
    let classes = this._passedOpts.classes;

    this._resetState();
    buttonElem.disabled = true;
    buttonTextElem.textContent = msg;
    buttonElem.classList.add(classes.stateSuccess);
  }

  _setLoadingState() {
    let buttonElem = this._passedOpts.elems.sendBtn;
    let classes = this._passedOpts.classes;

    this._resetState();
    buttonElem.disabled = true;
    buttonElem.classList.add(classes.stateLoading);
  }

  _setDefaultState() {
    let buttonElem = this._passedOpts.elems.sendBtn;
    let buttonTextElem = this._passedOpts.elems.sendBtnText;

    this._resetState();
    buttonElem.disabled = false;
    buttonTextElem.textContent = this._savedLabelButton;
  }

  _resetState() {
    let buttonElem = this._passedOpts.elems.sendBtn;
    let classes = this._passedOpts.classes;

    buttonElem.classList.remove(classes.stateError);
    buttonElem.classList.remove(classes.stateSuccess);
    buttonElem.classList.remove(classes.stateLoading);
  }

  _resetForm() {
    this._passedOpts.elems.nameField.value = "";
    this._passedOpts.elems.emailField.value = "";
    this._passedOpts.elems.messageField.value = "";
  }

  _serializeForm() {
    let name = this._passedOpts.elems.nameField.value;
    let email = this._passedOpts.elems.emailField.value;
    let message = this._passedOpts.elems.messageField.value;

    let encode = encodeURIComponent;

    return `name=${encode(name)}&email=${encode(email)}&message=${encode(message)}`;
  }

}
