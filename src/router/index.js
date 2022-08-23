import Vue from 'vue';
import VueRouter from 'vue-router';
// import store from '../store';
import Vacancies from '../views/Vacancies.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Vacancies,
    // beforeEnter: (to, from, next) => {
    //   const user = store.getters.getUser;
    //   if (user === null)  {
    //     next({name: 'Auth'});
    //   } else {
    //     next();
    //   }
    // }
  },
  // {
  //   path: '/add-vacancy',
  //   name: 'AddVacancy',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AddVacancy.vue')
  // },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('../views/Auth.vue')
  },
  {
    path: '/responses',
    name: 'Responses',
    component: () => import('../views/Responses.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/Settings.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router
