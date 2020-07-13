import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import store from "./store";

import GetStartedDemo from "../components/GetStartedDemo";
import DialogDemo from "../components/DialogDemo";
import NotifyDemo from "../components/NotifyDemo";
import LoaderDemo from "../components/LoaderDemo";
import TutorialDemo from "../components/TutorialDemo";

const routes = [
    { path: '*', component: GetStartedDemo },
    { path: '/getStarted', component: GetStartedDemo },
    { path: '/dialog', component: DialogDemo },
    { path: '/notify', component: NotifyDemo },
    { path: '/loader', component: LoaderDemo },
    { path: '/tutorial', component: TutorialDemo },
]

const router = new VueRouter({ base: "/vue-hawesome-modal/", routes });

router.beforeEach((to, from, next) => {
    store.commit('notify/clearAllNotify');
    next();
})

export default router