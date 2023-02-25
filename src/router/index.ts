import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import SignUp from '../views/UserRegisterView.vue'
import Login from '../views/LoginView.vue'
import { CognitoUserPool } from 'amazon-cognito-identity-js'
import { checkTimeout, resetTimer } from './countdown';
import { Auth } from 'aws-amplify';

const poolData = {
  UserPoolId: import.meta.env.VITE_COGNITO_POOLID,
  ClientId: import.meta.env.VITE_COGNITO_CLIENTID,
};

let userPool = new CognitoUserPool(poolData);

const routes = [
  {
    path: '/',
    name: 'home',
    component:Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/signUp',
    name: 'signUp',
    component:SignUp
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

router.beforeEach((to, from, next) => {
  let currentUser = userPool.getCurrentUser();

  // アクションが行われた時刻でタイマーをリセットする
  resetTimer();

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!currentUser) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else if (checkTimeout()) {
      // タイムアウトした場合はログインページにリダイレクトする
      Auth.signOut().then(() => {
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        });
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router