import { computed, ref, watch } from "vue";
import { defineStore } from "pinia";

const seed = [
  {
    id: 1,
    description: "Salário",
    category: "Trabalho",
    type: "income",
    amount: 3200,
    date: "2026-09-05",
  },
  {
    id: 2,
    description: "Projeto freelance",
    category: "Trabalho",
    type: "income",
    amount: 850,
    date: "2026-09-03",
  },
  {
    id: 3,
    description: "Faculdade",
    category: "Educação",
    type: "expense",
    amount: 425,
    date: "2026-09-02",
  },
  {
    id: 4,
    description: "Supermercado",
    category: "Alimentação",
    type: "expense",
    amount: 286.9,
    date: "2026-09-01",
  },
  {
    id: 5,
    description: "Assinaturas",
    category: "Serviços",
    type: "expense",
    amount: 114,
    date: "2026-08-30",
  },
  {
    id: 6,
    description: "Transporte",
    category: "Transporte",
    type: "expense",
    amount: 132.4,
    date: "2026-08-28",
  },
  {
    id: 7,
    description: "Cinema",
    category: "Lazer",
    type: "expense",
    amount: 68,
    date: "2026-08-26",
  },
];
const DEFAULT_MONTHLY_GOAL = 1400;
const TRANSACTIONS_STORAGE_KEY = "myfinance-transactions";
const MONTHLY_GOAL_STORAGE_KEY = "myfinance-goal";
const persistTransactions = (transactions) => localStorage.setItem(TRANSACTIONS_STORAGE_KEY, JSON.stringify(transactions));
const persistMonthlyGoal = (monthlyGoal) => localStorage.setItem(MONTHLY_GOAL_STORAGE_KEY, String(monthlyGoal));

export const useTransactionsStore = defineStore("transactions", () => {
  const saved = localStorage.getItem(TRANSACTIONS_STORAGE_KEY);
  const transactions = ref(saved ? JSON.parse(saved) : structuredClone(seed));
  const monthlyGoal = ref(Number(localStorage.getItem(MONTHLY_GOAL_STORAGE_KEY)) || DEFAULT_MONTHLY_GOAL);

  const income = computed(() =>
    transactions.value
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0),
  );
  const expenses = computed(() =>
    transactions.value
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0),
  );
  const balance = computed(() => income.value - expenses.value);
  const goalProgress = computed(() =>
    Math.min((expenses.value / monthlyGoal.value) * 100, 100),
  );

  const expensesByCategory = computed(() => {
    const totals = {};
    transactions.value
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        totals[t.category] = (totals[t.category] || 0) + t.amount;
      });
    return Object.entries(totals).sort((a, b) => b[1] - a[1]);
  });

  function addTransaction(transaction) {
    transactions.value.unshift({
      ...transaction,
      id: Date.now(),
      amount: Number(transaction.amount),
    });
  }

  function removeTransaction(id) {
    transactions.value = transactions.value.filter((t) => t.id !== id);
  }

  function resetData() {
    transactions.value = structuredClone(seed);
    monthlyGoal.value = DEFAULT_MONTHLY_GOAL;
    persistTransactions(transactions.value);
    persistMonthlyGoal(monthlyGoal.value);
  }

  watch(
    transactions,
    persistTransactions,
    { deep: true },
  );
  watch(monthlyGoal, persistMonthlyGoal);

  return {
    transactions,
    monthlyGoal,
    income,
    expenses,
    balance,
    goalProgress,
    expensesByCategory,
    addTransaction,
    removeTransaction,
    resetData,
  };
});
