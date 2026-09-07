<script setup>
import {
  AcademicCapIcon,
  BanknotesIcon,
  FilmIcon,
  InboxIcon,
  ShoppingCartIcon,
  TagIcon,
  TrashIcon,
  TruckIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/vue/24/outline";
import { useTransactionsStore } from "../stores/transactions";
import { useCurrency } from "../composables/useCurrency";

defineProps({ items: Array, compact: Boolean });
const store = useTransactionsStore();
const { formatCurrency, formatDate } = useCurrency();
const categoryIcons = {
  Trabalho: BanknotesIcon,
  Educação: AcademicCapIcon,
  Alimentação: ShoppingCartIcon,
  Serviços: WrenchScrewdriverIcon,
  Transporte: TruckIcon,
  Lazer: FilmIcon,
};
</script>

<template>
  <div class="grid">
    <div
      v-if="!items.length"
      class="grid gap-[7px] px-5 py-[60px] text-center text-[var(--muted)]"
    >
      <InboxIcon class="mx-auto size-[34px]" /><strong
        class="text-[var(--text)]"
        >Nenhuma movimentação encontrada</strong
      ><small>Tente alterar os filtros ou adicione um novo lançamento.</small>
    </div>
    <div
      v-for="item in items"
      :key="item.id"
      class="grid grid-cols-[39px_1fr_auto_auto] items-center gap-3 border-t border-[var(--line)] px-0.5 py-3 first:border-t-0 max-[700px]:grid-cols-[39px_1fr_auto]"
    >
      <span
        class="grid size-[38px] place-items-center rounded-[11px]"
        :class="
          item.type === 'income'
            ? 'bg-[#e8f5ef] text-[#3a8b6c]'
            : 'bg-[#fff0ec] text-[#d06e58]'
        "
        ><component
          :is="categoryIcons[item.category] || TagIcon"
          class="size-5"
      /></span>
      <div>
        <strong class="block text-[13px]">{{ item.description }}</strong
        ><span class="mt-1 block text-[10px] text-[var(--muted)]"
          >{{ item.category }} · {{ formatDate(item.date) }}</span
        >
      </div>
      <span
        class="text-xs font-bold max-[700px]:col-start-3 max-[700px]:row-start-1"
        :class="
          item.type === 'income' ? 'text-[#368c6a]' : 'text-[var(--text)]'
        "
        >{{ item.type === "expense" ? "-" : "+" }}
        {{ formatCurrency(item.amount) }}</span
      >
      <button
        v-if="!compact"
        class="border-0 bg-transparent p-2 text-[var(--muted)] transition-colors hover:text-[var(--danger)] max-[700px]:col-start-3"
        aria-label="Excluir"
        @click="store.removeTransaction(item.id)"
      >
        <TrashIcon class="size-[18px]" />
      </button>
    </div>
  </div>
</template>
