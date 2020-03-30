# hawesome-vue-extends
> A Vue modal component plugin based on Vuetify with Vuex.  
> Provides dialog, notification and loader for building a modern website.  
> Using Promise API refactor modal component to provide fluent experience.  
> [Live Demo](https://behawesometw.github.io/hawesome-vue-extends/)  
## Installation
### NPM
```bash
$ npm install hawesome-vue-extends
```
Install `hawesome-vue-extends` via `Vue.use()`:
```javascript
// main.js or somewhere you initialize your app

// import
import store from "../path/to/your/vuex/store.js"
import Vue from "vue"
import hawesomeVue from "hawesome-vue-extends"

// initialize global settings
var options = {
    store,
    dialogSetting: { ... },
    notifySetting: { ... },
    loaderSetting: { ... }
}

// install
Vue.use(hawesomeVue, options)
```
Use component at `root (the most top-level)` component like
```vue
<template>
  <v-app>
    <HawesomeDialog />
    <HawesomeNotify />
    <HawesomeLoader />
    ...
  </v-app>
</template>
```
## Usage
After Installing the plugin, `$dialog`, `$notify` and `$loader` will available on the Vue prototype.
### Dialog
[Live Demo](https://behawesometw.github.io/hawesome-vue-extends/#/dialog)
#### API
| Name   | Parameter                                                 | Return Type      | Description           |
| :----- | :-------------------------------------------------------- | :--------------- | :-------------------- |
| talk   | val: string<br />func: (builder: DialogConfigBuilder) => void | Promise&lt;null> | setup and open dialog |
| hangUp |                                                           | void             | close dialog          |
#### Global Settings
```javascript
// import
import store from "../path/to/your/vuex/store.js"
import Vue from "vue"
import hawesomeVue from "hawesome-vue-extends"

// initialize global settings
var options = { 
  store,
  dialogSetting: {
    // hawesome-vue-extends/lib/dialog/dialogConfigAttribute
    title: "訊息", 
    confirmBtnTxt: "確認", 
    cancelBtnTxt: "取消"
  }
}

// install
Vue.use(hawesomeVue, options)
```
#### Basic Usage
```javascript
// `this` points to the Vue instance
this.$dialog
  .talk("Lorem ipsum dolor sit amet.")
  .then(() => {
    // trigger after user clicks the confirm button
  })
  .catch(() => {
    // trigger after user clicks the cancel button
  })
  .finally(this.$dialog.hangUp);
```
#### Working With Builder
```javascript
// `this` points to the Vue instance
this.$dialog
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
  .finally(this.$dialog.hangUp);
```
---
### Notify
[Live Demo](https://behawesometw.github.io/hawesome-vue-extends/#/notify)
#### API
| Name             | Parameter                                                      | Return Type      | Description                                                       |
| :--------------- | :------------------------------------------------------------- | :--------------- | :---------------------------------------------------------------- |
| info             | notiText: string<br />func: (builder: NotifyConfigBuilder) => void | Promise&lt;null> | push info notification                                            |
| success          | notiText: string<br />func: (builder: NotifyConfigBuilder) => void | Promise&lt;null> | push success notification                                         |
| warning          | notiText: string<br />func: (builder: NotifyConfigBuilder) => void | Promise&lt;null> | push warning notification                                         |
| error            | notiText: string<br />func: (builder: NotifyConfigBuilder) => void | Promise&lt;null> | push error notification                                           |
| promise          | notiText: string<br />func: (builder: NotifyConfigBuilder) => void | Promise&lt;null> | push notification without auto dismiss                            |
| push             | notiText: string<br />func: (builder: NotifyConfigBuilder) => void | Promise&lt;null> | push notification                                                 |
| resolveAllNotify |                                                                | void             | resolve all notification                                          |
| clearAllNotify   |                                                                | void             | clear all notification<br />( p.s. not trigger then callback function) |
#### Global Settings
```javascript
// import
import store from "../path/to/your/vuex/store.js"
import Vue from "vue"
import hawesomeVue from "hawesome-vue-extends"

// initialize global settings
var options = { 
  store, 
  notifySetting: { 
    // hawesome-vue-extends/lib/notify/notifyConfigAttribute
    position: "bottomLeft", 
    timeout: 5 
  } 
}

// install
Vue.use(hawesomeVue, options)
```
#### Basic Usage
```javascript
// `this` points to the Vue instance
this.$notify
  .info("Lorem, ipsum dolor.")
  .then(() => {
    console.log("resolved");
  });
```
#### Working With Builder
```javascript
// `this` points to the Vue instance
this.$notify
  .push(
    "Lorem, ipsum dolor.",
    builder => {
      builder
        .setType("success")
        .setTimeout(5)
    })
  .then(() => {
    console.log("resolved");
  });
```
---
### Loader
[Live Demo](https://behawesometw.github.io/hawesome-vue-extends/#/loader)
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
import hawesomeVue from "hawesome-vue-extends"

// initialize global settings
var options = { 
  store, 
  loaderSetting: { 
    type: "linear"
  } 
}

// install
Vue.use(hawesomeVue, options)
```
#### Basic Usage
```javascript
// `this` points to the Vue instance
this.$loader.on();
setTimeout(() => {
  this.$loader.off();
}, 2000);

// `this` points to the Vue instance
this.$loader.on("系統處理中，請稍後…");
setTimeout(() => {
  this.$loader.off();
}, 2000);
```
---
### Tutorial
[Live Demo](https://behawesometw.github.io/hawesome-vue-extends/#/tutorial)
#### Working With Promise API
```javascript
// `this` points to the Vue instance
this.$notify
  .promise("hello!!")
  .then(() => this.$dialog.talk("ready to start a tutorial?"))
  .then(() =>
    this.$dialog.talk(
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
        this.$loader.on();
        setTimeout(() => {
          this.$loader.off();
          resolve({ result: true, msg: "hope you enjoy!" });
        }, 2000);
      })
  )
  .then(rs => {
    if (rs.result) {
      this.$notify.success(rs.msg);
    }
  })
  .catch(() => {
    this.$notify.warning("ok. maybe next time.");
  })
  .finally(this.$dialog.hangUp);
```
