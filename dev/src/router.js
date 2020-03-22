import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import GetStartedDemo from "../components/GetStartedDemo";
import DialogDemo from "../components/DialogDemo";
import NotifyDemo from "../components/NotifyDemo";
import LoaderDemo from "../components/LoaderDemo";

const routes = [
    { path: '*', alias: "GetStarted", component: GetStartedDemo, },
    { path: '/Dialog', component: DialogDemo },
    { path: '/Notify', component: NotifyDemo },
    { path: '/Loader', component: LoaderDemo }
]

export default new VueRouter({
    routes, mode: 'history'
})