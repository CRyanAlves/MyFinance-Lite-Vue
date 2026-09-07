<script setup>
import { computed } from "vue";
import { ChevronDownIcon } from "@heroicons/vue/20/solid";
import { useTransactionsStore } from "../stores/transactions";
import { useCurrency } from "../composables/useCurrency";

const store = useTransactionsStore();
const { formatCurrency } = useCurrency();
const colors = ["#ff805e", "#6558e8", "#f6bd41", "#45b990", "#5fa8e8"];
const total = computed(() =>
  store.expensesByCategory.reduce((sum, [, value]) => sum + value, 0),
);
const gradient = computed(() => {
  if (!total.value) return "var(--surface-2)";
  let cursor = 0;
  const parts = store.expensesByCategory.map(([, value], i) => {
    const start = cursor;
    cursor += (value / total.value) * 100;
    return `${colors[i % colors.length]} ${start}% ${cursor}%`;
  });
  return `conic-gradient(${parts.join(",")})`;
});
</script>

<template>
  <article
    class="min-h-[300px] rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-[22px] shadow-[var(--panel-shadow)] max-[700px]:p-[18px] min-[1001px]:min-h-0"
  >
    <div class="mb-[18px] flex items-center justify-between">
      <div>
        <span
          class="block text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--muted)]"
          >Distribuição</span
        >
        <h2
          class="mt-[5px] font-display text-[17px] font-bold tracking-[-0.025em]"
        >
          Gastos por categoria
        </h2>
      </div>
      <button
        class="flex items-center gap-0.5 border-0 bg-transparent text-xs font-bold text-[var(--primary)]"
      >
        Este mês<ChevronDownIcon class="size-4" />
      </button>
    </div>
    <div
      class="flex min-h-[212px] items-center gap-[8%] max-[700px]:flex-col max-[700px]:gap-6"
    >
      <div
        class="relative grid size-[178px] shrink-0 place-items-center rounded-full"
        :style="{ background: gradient }"
      >
        <div
          class="absolute inset-[23px] rounded-full bg-[var(--surface)]"
        ></div>
        <div class="relative grid gap-[3px] text-center">
          <small class="text-[10px] text-[var(--muted)]">Total gasto</small
          ><strong class="font-display text-base font-bold">{{
            formatCurrency(total)
          }}</strong>
        </div>
      </div>
      <div class="grid flex-1 gap-[13px] max-[700px]:w-full">
        <div
          v-for="([category, value], index) in store.expensesByCategory"
          :key="category"
          class="grid grid-cols-[10px_1fr_auto] items-center gap-[9px] text-xs text-[var(--muted)]"
        >
          <span
            class="size-2 rounded-full"
            :style="{ background: colors[index % colors.length] }"
          ></span>
          <span>{{ category }}</span
          ><strong class="text-[11px] text-[var(--text)]">{{
            formatCurrency(value)
          }}</strong>
        </div>
      </div>
    </div>
  </article>
</template>
