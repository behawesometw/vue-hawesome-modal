# vue-hawesome-modal
A Vue promisify modal component plugin based on Vuetify with Vuex.  
Provides dialog, notification and loader for building a modern website.  
Using Promise API refactor modal component to provide fluent experience.  
⚡ [Live Demo](https://behawesometw.github.io/vue-hawesome-modal/)  
## Installation
### NPM
```bash
$ npm install vue-hawesome-modal
```
Install `vue-hawesome-modal` via `Vue.use()`:
```javascript
// main.js or somewhere you initialize your app

// import
import store from "../path/to/your/vuex/store.js"
import Vue from "vue"
import vueHawesomeModal from "vue-hawesome-modal"

// initialize global settings
var options = {
    store,
    themeColor: "hex or semantic color",
    dialogSetting: { ... },
    notifySetting: { ... },
    loaderSetting: { ... }
}

// install
Vue.use(vueHawesomeModal, options)
```
Use component at `root (the most top-level)` component like:
```vue
<template>
  <v-app>
    <h-dialog />
    <h-notify />
    <h-loader />
    ...
  </v-app>
</template>
```
## Usage
After Installing the plugin, `dialog`, `notify` and `loader` will available at `$h` on the Vue prototype.

---
### Dialog
⚡ [Live Demo](https://behawesometw.github.io/vue-hawesome-modal/#/dialog)
#### API
| Name   | Parameter                                                     | Return Type | Description           |
| :----- | :------------------------------------------------------------ | :---------- | :-------------------- |
| talk   | val: string<br />func: (builder: DialogConfigBuilder) => void | Promise     | setup and open dialog |
| hangUp |                                                               | void        | close dialog          |
#### Global Settings
```javascript
// import
import store from "../path/to/your/vuex/store.js"
import Vue from "vue"
import vueHawesomeModal from "vue-hawesome-modal"

// initialize global settings
var options = { 
  store,
  dialogSetting: {
    // vue-hawesome-modal/lib/dialog/dialogConfigAttribute
    title: "訊息", 
    confirmBtnTxt: "確認", 
    cancelBtnTxt: "取消"
  }
}

// install
Vue.use(vueHawesomeModal, options)
```
#### Basic Usage
```javascript
// `this` points to the Vue instance
this.$h.dialog
  .talk("Lorem ipsum dolor sit amet.")
  .then(() => {
    // trigger after user clicks the confirm button
  })
  .catch(() => {
    // trigger after user clicks the cancel button
  })
  .finally(this.$h.dialog.hangUp);
```
#### Working With Builder
```javascript
// `this` points to the Vue instance
this.$h.dialog
  .talk("嗨～大家今天過得好嗎？", builder => {
    builder 
      .set("width", 500)
      .set("themeColor", "info")
      .set("isShowCancelBtn", false)
  })
  .then(() => {
    // trigger after user clicks the confirm button
  })
  .catch(() => {
    // trigger after user clicks the cancel button
  })
  .finally(this.$h.dialog.hangUp);
```
---
### Notify
⚡ [Live Demo](https://behawesometw.github.io/vue-hawesome-modal/#/notify)
#### API
| Name             | Parameter                                                          | Return Type | Description                                                            |
| :--------------- | :----------------------------------------------------------------- | :---------- | :--------------------------------------------------------------------- |
| info             | notiText: string<br />func: (builder: NotifyConfigBuilder) => void | Promise     | push info notification                                                 |
| success          | notiText: string<br />func: (builder: NotifyConfigBuilder) => void | Promise     | push success notification                                              |
| warning          | notiText: string<br />func: (builder: NotifyConfigBuilder) => void | Promise     | push warning notification                                              |
| error            | notiText: string<br />func: (builder: NotifyConfigBuilder) => void | Promise     | push error notification                                                |
| promise          | notiText: string<br />func: (builder: NotifyConfigBuilder) => void | Promise     | push notification without auto dismiss                                 |
| push             | notiText: string<br />func: (builder: NotifyConfigBuilder) => void | Promise     | push notification                                                      |
| resolveAllNotify |                                                                    | void        | resolve all notification                                               |
| clearAllNotify   |                                                                    | void        | clear all notification<br />( p.s. not trigger then callback function) |
#### Global Settings
```javascript
// import
import store from "../path/to/your/vuex/store.js"
import Vue from "vue"
import vueHawesomeModal from "vue-hawesome-modal"

// initialize global settings
var options = { 
  store, 
  notifySetting: { 
    // vue-hawesome-modal/lib/notify/notifyConfigAttribute
    position: "bottomLeft", 
    timeout: 5 
  } 
}

// install
Vue.use(vueHawesomeModal, options)
```
#### Basic Usage
```javascript
// `this` points to the Vue instance
this.$h.notify
  .info("Lorem, ipsum dolor.")
  .then(() => {
    // trigger after user clicks the confirm icon
    console.log("resolved");
  });
```
#### Working With Builder
```javascript
// `this` points to the Vue instance
this.$h.notify
  .push(
    "Lorem, ipsum dolor.",
    builder => {
      builder
        .setType("success")
        .setTimeout(5)
    })
  .then(() => {
    // trigger after user clicks the confirm icon
    console.log("resolved");
  });
```
---
### Loader
⚡ [Live Demo](https://behawesometw.github.io/vue-hawesome-modal/#/loader)
#### API
| Name | Parameter          | Return Type | Description  |
| :--- | :----------------- | :---------- | :----------- |
| on   | loaderText: string | void        | open loader  |
| off  |                    | void        | close loader |
#### Global Settings
```javascript
// import
import store from "../path/to/your/vuex/store.js"
import Vue from "vue"
import vueHawesomeModal from "vue-hawesome-modal"

// initialize global settings
var options = { 
  store, 
  loaderSetting: { 
    type: "linear"
  } 
}

// install
Vue.use(vueHawesomeModal, options)
```
#### Basic Usage
```javascript
// `this` points to the Vue instance
this.$h.loader.on();
setTimeout(() => {
  this.$h.loader.off();
}, 2000);

// `this` points to the Vue instance
this.$h.loader.on("系統處理中，請稍後…");
setTimeout(() => {
  this.$h.loader.off();
}, 2000);
```
---
### Tutorial
⚡ [Live Demo](https://behawesometw.github.io/vue-hawesome-modal/#/tutorial)
#### Working With Promise API
```javascript
// `this` points to the Vue instance
this.$h.notify
  .promise("hello!!")
  .then(() => this.$h.dialog.talk("ready to start a tutorial?"))
  .then(() =>
    this.$h.dialog.talk(
      "we can use `Promise API` chaining a series of tasks.",
      builder => {
        builder
          .set("width", 500)
          .set("themeColor", "purple")
          .set("isShowCancelBtn", false)
          .set("confirmBtnTxt", "simulate async");
      }
    )
  )
  .then(
    () =>
      new Promise(resolve => {
        this.$h.loader.on();
        setTimeout(() => {
          this.$h.loader.off();
          resolve({ result: true, msg: "hope you enjoy!" });
        }, 2000);
      })
  )
  .then(rs => {
    if (rs.result) {
      this.$h.notify.success(rs.msg);
    }
  })
  .catch(() => {
    this.$h.notify.warning("ok. maybe next time.");
  })
  .finally(this.$h.dialog.hangUp);
```
