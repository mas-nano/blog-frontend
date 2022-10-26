import { createRouter, createWebHistory } from "vue-router";
import AdminRoot from "../views/Admin/AdminRoot.vue";
import Author from "../views/Admin/Author.vue";
import Category from "../views/Admin/Category.vue";
import DashboardAdmin from "../views/Admin/DashboardAdmin.vue";
import Post from "../views/Admin/Post.vue";
import PostCreate from "../views/Admin/PostCreate.vue";
import Profile from "../views/Admin/Profile.vue";
import LoginScreen from "../views/Auth/LoginScreen.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "auth.login",
      component: LoginScreen,
    },
    {
      path: "/admin",
      component: AdminRoot,
      children: [
        {
          path: "dashboard",
          name: "admin.dashboard",
          component: DashboardAdmin,
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "category",
          name: "admin.category",
          component: Category,
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "post",
          name: "admin.post",
          component: Post,
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "post/create",
          name: "admin.post.create",
          component: PostCreate,
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "post/update/:uuid",
          name: "admin.post.update",
          component: PostCreate,
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "author",
          name: "admin.author",
          component: Author,
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "profile",
          name: "admin.profile",
          component: Profile,
          meta: {
            requiresAuth: true,
          },
        },
      ],
    },
    {
      path: "/logout",
      name: "auth.logout",
      component: LoginScreen,
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!localStorage.getItem("AUTH_TOKEN")) {
      next({
        name: "auth.login",
      });
    } else {
      next();
    }
  } else {
    if (localStorage.getItem("AUTH_TOKEN")) {
      next({
        name: "admin.dashboard",
      });
    } else {
      next();
    }
  }
});
export default router;
