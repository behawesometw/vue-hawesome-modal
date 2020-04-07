import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import store from "./store";

import GettingStartedDemo from "../components/GettingStartedDemo";
import DialogDemo from "../components/DialogDemo";
import NotifyDemo from "../components/NotifyDemo";
import LoaderDemo from "../components/LoaderDemo";
import TutorialDemo from "../components/TutorialDemo";

const routes = [
    { path: '*', component: GettingStartedDemo },
    { path: '/gettingStarted', component: GettingStartedDemo },
    { path: '/dialog', component: DialogDemo },
    { path: '/notify', component: NotifyDemo },
    { path: '/loader', component: LoaderDemo },
    { path: '/tutorial', component: TutorialDemo },
]

const router = new VueRouter({ base: "/hawesome-vue-extends/", routes });

router.beforeEach((to, from, next) => {
    store.commit('notify/clearAllNotify');
    next();
})

export default router