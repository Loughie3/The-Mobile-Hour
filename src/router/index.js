import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ShopAllView from "../views/ShopAllView.vue";
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
    path: "/individualItem",
    name: "IndividualItem",
    component: IndividualItem,
  },
  {
    path: "/admin/dashboard",
    name: "AdminDashboard",
    component: AdminDashboard,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/admin/dashboard/manageStock",
    name: "ManageStock",
    component: ManageStock,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/admin/dashboard/managerViewUsers",
    name: "ManagerViewUsers",
    component: ManagerViewUsers,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/admin/dashboard/viewUsers",
    name: "ViewUsers",
    component: ViewUsers,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/admin/dashboard/changeLog",
    name: "ChangeLog",
    component: ChangeLog,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem("token");

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!token) {
      next({ path: "/login" });
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/verify", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (to.matched.some((record) => record.meta.requiresAdmin)) {
          if (data.role !== "Admin") {
            next({ path: "/" }); // Redirect non-admin users
            return;
          }
        }
        next();
      } else {
        console.error(`Error verifying token: ${response.statusText}`);
        next({ path: "/login" });
      }
    } catch (error) {
      console.error("Error verifying token:", error);
      next({ path: "/login" });
    }
  } else {
    next();
  }
});

export default router;
