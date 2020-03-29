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

// todo: mode 也許會影響 # 的使用，測測看
const router = new VueRouter({ base: "/hawesome-vue-extends/", routes, mode: 'history' });

router.beforeEach((to, from, next) => {
    store.commit('notify/clearAllNotify');
    next();
})

export default router