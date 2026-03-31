import { createRouter, createWebHistory } from "vue-router";
import { ShopView, CartView } from "@/views";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/shop",
    },
    {
      path: "/shop",
      name: "shop",
      component: ShopView,
    },
    {
      path: "/cart",
      name: "cart",
      component: CartView,
    },
  ],
});

export default router;
