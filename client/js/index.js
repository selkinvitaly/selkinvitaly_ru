"use strict";

import NegativeTopNav from "./classes/NegativeTopNav";
import GoToScroll from "./classes/GoToScroll";
import AdaptiveNav from "./classes/AdaptiveNav";
import ViewProject from "./classes/ViewProject";
import SendMail from "./classes/SendMail";

new NegativeTopNav({
  elems: {
    topNav: document.querySelector(".g-top-nav")
  },
  classes: {
    negative: "g-top-nav_negative"
  }
});

new GoToScroll({
  elems: {
    container: document
  },
  offset: document.querySelector(".g-top-nav").offsetHeight
});

new AdaptiveNav({
  elems: {
    menu: document.querySelector(".g-adaptive-nav"),
    openBtn: document.querySelector(".g-hum-open"),
    closeBtn: document.querySelector(".g-adaptive-nav-close"),
    menuList: document.querySelector(".g-adaptive-nav-lst")
  },
  classes: {
    closed: "g-adaptive-nav_closed",
    menuItem: "g-adaptive-nav-itm"
  }
});

new ViewProject({
  elems: {
    container: document.querySelector(".g-projects")
  },
  classes: {
    closeBtn: "g-project-view-close",
    closed: "g-project-view_closed",
    modalWindow: "g-project-view-win",
    images: "g-project-view-gal-images img",
    gallery: "blueimp-gallery"
  }
});

new SendMail({
  elems: {
    form: document.querySelector(".g-contacts-form"),
    sendBtn: document.querySelector(".g-contacts-send"),
    sendBtnText: document.querySelector(".g-contacts-send__txt"),
    nameField: document.querySelector(".g-contacts-name__input"),
    emailField: document.querySelector(".g-contacts-email__input"),
    messageField: document.querySelector(".g-contacts-message__input")
  },
  classes: {
    stateError: "g-contacts-send_state_error",
    stateSuccess: "g-contacts-send_state_success",
    stateLoading: "g-contacts-send_state_loading"
  }
});
