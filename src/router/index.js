import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/sys/home' }, 
    {
      path: "/sys",
      name: "系統",
      component: () => import("../views/System.vue"),
      children: [
        {
          path: "home",
          name: "主頁",
          component: () => import("../components/Home/Home.vue")
        },
        {
          path: "product",
          name: "產品",
          component: () => import("../components/Product/ProductTable.vue")
        },
        {
          path: "ware-house", 
          name: "倉庫", 
          component: () => import("../components/Warehouse/Warehouse.vue"),
          children: [
            {
              path: ":id",
              component: () => import("../components/Warehouse/House.vue")
            }
          ]
        },
        {
          path: "data-anaylsis",
          name: "資料分析",
          component: () => import("../components/Carousel.vue")
        },
        {
          path: '404',
          component: () => import("../components/compNotFound.vue")
        },
        {
          path: ':pathMatch(.*)*',
          redirect: "/sys/404"
        }
      ]
    },
    {
      path: "/register",
      component: () => import("../views/Register.vue"),
      meta: {
        public: true
      }
    },
    {
      path: "/sign-in",
      component: () => import("../views/SignIn.vue"),
      meta: {
        public: true
      }
    },
    // {
    //   path: "/test",
    //   component: () => import("../components/Home/UserInfo.vue")
    // }
  ],
});

export default router;
