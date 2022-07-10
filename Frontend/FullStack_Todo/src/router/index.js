import { createRouter, createWebHistory } from 'vue-router'
import Register from '../views/Register.vue';
import Login from "../views/Login.vue";
import Dashboard from '../views/Dashboard.vue';
import { useAuthStore } from '../stores/authStore';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'register',
      component: Register,
      meta: {
        auth: false
      }
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: {
        auth: false
      }
    },
    {
      path:"/dashboard",
      name: "Dashboard",
      component: Dashboard,
      meta: {
        auth: true
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('../views/NotFound.vue'),
      meta: {
        auth: false
      }
    }
  ]
});

const currentUser = () => {
  return new Promise(( resolve, reject ) => {
    const authStore = useAuthStore();
    const token = authStore.user;
    resolve(token);
    reject
  })
}

router.beforeEach( async (to, from, next) => {
  if(to.matched.some((record) => record.meta.auth)) {
    if(await currentUser()) {
      next();
    } else {
      next("/login")
    }
  } else {
    next();
  }
})
export default router