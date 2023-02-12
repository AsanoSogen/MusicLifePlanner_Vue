import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import Login from '../views/LoginView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component:Home,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'login',
    component:Login
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  if (to.meta.requiresAuth && localStorage.getItem("token") == null) {
    return { name: "login" };
  }
});

export default router
