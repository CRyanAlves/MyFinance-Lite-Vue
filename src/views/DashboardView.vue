<script setup>
import { computed } from "vue";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowTrendingUpIcon,
  ArrowUpIcon,
  BanknotesIcon,
  CreditCardIcon,
  HandRaisedIcon,
  WalletIcon,
} from "@heroicons/vue/24/outline";
import { useTransactionsStore } from "../stores/transactions";
import { useCurrency } from "../composables/useCurrency";
import SummaryCard from "../components/SummaryCard.vue";
import ExpenseChart from "../components/ExpenseChart.vue";
import TransactionList from "../components/TransactionList.vue";

const store = useTransactionsStore();
const { formatCurrency } = useCurrency();
const recent = computed(() => store.transactions.slice(0, 5));
</script>

<template>
  <section
    class="mx-auto max-w-[1450px] px-[4vw] pt-[38px] pb-[60px] max-[700px]:px-[18px] max-[700px]:pt-7 max-[700px]:pb-[45px]"
  >
    <div class="mb-[30px] flex items-end justify-between">
      <div>
        <span
          class="block text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--muted)]"
          >Segunda-feira, 7 de setembro</span
        >
        <h1
          class="mt-1.5 flex items-center gap-2 font-display text-[30px] font-bold tracking-[-0.04em] max-[700px]:text-[27px]"
        >
          Olá, Pedro! <HandRaisedIcon class="size-6 text-[#e6a379]" />
        </h1>
        <p class="mt-[7px] mb-0 text-sm text-[var(--muted)]">
          Acompanhe sua vida financeira em um só lugar.
        </p>
      </div>
    </div>
    <div class="grid grid-cols-3 gap-[18px] max-[700px]:grid-cols-1">
      <SummaryCard
        label="Saldo disponível"
        :value="formatCurrency(store.balance)"
        variation="8,4% neste mês"
        tone="positive"
        :icon="WalletIcon"
        :variation-icon="ArrowTrendingUpIcon"
      />
      <SummaryCard
        label="Total de receitas"
        :value="formatCurrency(store.income)"
        variation="R$ 850,00"
        tone="positive"
        :icon="BanknotesIcon"
        :variation-icon="ArrowUpIcon"
      />
      <SummaryCard
        label="Total de despesas"
        :value="formatCurrency(store.expenses)"
        variation="4,2% neste mês"
        tone="negative"
        :icon="CreditCardIcon"
        :variation-icon="ArrowDownIcon"
      />
    </div>
    <div
      class="mt-[18px] grid grid-cols-[1.55fr_1fr] gap-[18px] max-[1000px]:grid-cols-1"
    >
      <ExpenseChart />
      <article
        class="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-[22px] shadow-[var(--panel-shadow)] max-[700px]:p-[18px]"
      >
        <div class="mb-[18px] flex items-center justify-between">
          <div>
            <span
              class="block text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--muted)]"
              >Planejamento</span
            >
            <h2
              class="mt-[5px] font-display text-[17px] font-bold tracking-[-0.025em]"
            >
              Meta de gastos
            </h2>
          </div>
          <span
            class="rounded-full bg-[#edf6d1] px-[9px] py-[5px] text-[10px] font-bold text-[#586c1c]"
            >{{ Math.round(store.goalProgress) }}%</span
          >
        </div>
        <div class="relative h-[145px] text-center">
          <svg class="mx-auto w-[190px] overflow-visible" viewBox="0 0 160 90">
            <path
              d="M20 80 A60 60 0 0 1 140 80"
              pathLength="100"
              class="fill-none stroke-[var(--surface-2)] stroke-[13] [stroke-linecap:round]"
            />
            <path
              d="M20 80 A60 60 0 0 1 140 80"
              pathLength="100"
              class="fill-none stroke-[var(--accent)] stroke-[13] transition-[stroke-dasharray] duration-400 [stroke-linecap:round]"
              :style="{ strokeDasharray: `${store.goalProgress} 100` }"
            />
          </svg>
          <div class="absolute inset-x-0 top-[77px] grid">
            <strong class="font-display text-[19px] font-bold">{{
              formatCurrency(store.expenses)
            }}</strong
            ><span class="text-[10px] text-[var(--muted)]"
              >de {{ formatCurrency(store.monthlyGoal) }}</span
            >
          </div>
        </div>
        <p class="mt-[5px] mb-0 text-center text-xs text-[var(--muted)]">
          Você ainda pode gastar
          <strong class="text-[var(--text)]">{{
            formatCurrency(Math.max(store.monthlyGoal - store.expenses, 0))
          }}</strong>
          neste mês.
        </p>
      </article>
    </div>
    <article
      class="mt-[18px] rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-[22px] shadow-[var(--panel-shadow)] max-[700px]:p-[18px]"
    >
      <div class="mb-[18px] flex items-center justify-between">
        <div>
          <span
            class="block text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--muted)]"
            >Atividade recente</span
          >
          <h2
            class="mt-[5px] font-display text-[17px] font-bold tracking-[-0.025em]"
          >
            Últimas movimentações
          </h2>
        </div>
        <RouterLink
          to="/movimentacoes"
          class="flex items-center gap-1 text-xs font-bold text-[var(--primary)] no-underline"
          >Ver todas <ArrowRightIcon class="size-4"
        /></RouterLink>
      </div>
      <TransactionList :items="recent" compact />
    </article>
  </section>
</template>
