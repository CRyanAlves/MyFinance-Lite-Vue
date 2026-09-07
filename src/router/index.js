import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "../views/DashboardView.vue";
import TransactionsView from "../views/TransactionsView.vue";
import SettingsView from "../views/SettingsView.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "dashboard", component: DashboardView },
    {
      path: "/movimentacoes",
      name: "transactions",
      component: TransactionsView,
    },
    { path: "/configuracoes", name: "settings", component: SettingsView },
  ],
});
