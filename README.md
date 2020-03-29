# hawesome-vue-extends
A Vue modal component library based on Vuetify with Vuex.  
Provides dialog, notification and loader for building a modern website.  
Using Promise API refactor modal component to provide fluent experience.  

## Demo
https://behawesometw.github.io/hawesome-vue-extends/

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
Use component at `root(the most top-level)` component like
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
### Dialog
https://behawesometw.github.io/hawesome-vue-extends/dialog
### Notify
https://behawesometw.github.io/hawesome-vue-extends/notify
### Loader
https://behawesometw.github.io/hawesome-vue-extends/loader
### Dialog
https://behawesometw.github.io/hawesome-vue-extends/tutorial