import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ShopAllView from "../views/ShopAllView.vue";
import CategoriesView from "../views/CategoriesView.vue";
import LoginForm from "../views/LoginForm.vue";
import SignUp from "../views/SignUp.vue";
import AdminDashboard from "../views/AdminDashboard.vue";
import ManageStock from "../views/ManageStock.vue";
import ManagerViewUsers from "../views/ManagerViewUsers.vue";
import ViewUsers from "../views/ViewUsers";
import ChangeLog from "../views/ChangeLog.vue";
import IndividualItem from "../views/IndividualItem.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/shopAll",
    name: "ShopAll",
    component: ShopAllView,
  },
  {
    path: "/categories",
    name: "Categories",
    component: CategoriesView,
  },
  {
    path: "/login",
    name: "LoginForm",
    component: LoginForm,
  },
  {
    path: "/signUp",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/admin/dashboard",
    name: "AdminDashboard",
    component: AdminDashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin/dashboard/manageStock",
    name: "ManageStock",
    component: ManageStock,
  },
  {
    path: "/admin/dashboard/managerViewUsers",
    name: "ManagerViewUsers",
    component: ManagerViewUsers,
  },
  {
    path: "/admin/dashboard/viewUsers",
    name: "ViewUsers",
    component: ViewUsers,
  },
  {
    path: "/admin/dashboard/changeLog",
    name: "ChangeLog",
    component: ChangeLog,
  },
  {
    path: "/individualItem",
    name: "IndividualItem",
    component: IndividualItem,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const token = localStorage.getItem("token");

    if (!token) {
      next({ path: "/login" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
