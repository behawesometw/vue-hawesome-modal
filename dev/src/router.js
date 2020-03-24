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
    { path: '/dialog', component: DialogDemo },
    { path: '/notify', component: NotifyDemo },
    { path: '/loader', component: LoaderDemo },
    { path: '/tutorial', component: TutorialDemo },
]

const router = new VueRouter({
    routes,
    mode: 'history'
});

router.beforeEach((to, from, next) => {
    var hasNotify = store.getters["notify/hasNotify"];
    if (hasNotify) {
        store.commit('notify/clearAllNotify');
    }
    next();
})

export default router