import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import store from "./store";

import GetStartedDemo from "../pages/GetStartedDemo";
import DialogDemo from "../pages/DialogDemo";
import NotifyDemo from "../pages/NotifyDemo";
import LoaderDemo from "../pages/LoaderDemo";
import TutorialDemo from "../pages/TutorialDemo";

const routes = [
    { path: '*', component: GetStartedDemo },
    { path: '/getStarted', component: GetStartedDemo },
    { path: '/dialog', component: DialogDemo },
    { path: '/notify', component: NotifyDemo },
    { path: '/loader', component: LoaderDemo },
    { path: '/tutorial', component: TutorialDemo },
]

const router = new VueRouter({
    base: "/vue-hawesome-modal/", routes,
    scrollBehavior: () => ({ x: 0, y: 0 })
});

router.beforeEach((to, from, next) => {
    store.commit('hNotify/clearAllNotify');
    next();
})

export default router