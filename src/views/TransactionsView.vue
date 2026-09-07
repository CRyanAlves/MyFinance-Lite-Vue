<script setup>
import { computed, ref } from "vue";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/vue/24/outline";
import { useTransactionsStore } from "../stores/transactions";
import TransactionList from "../components/TransactionList.vue";

defineEmits(["new-transaction"]);
const store = useTransactionsStore();
const search = ref("");
const type = ref("all");
const filtered = computed(() =>
  store.transactions.filter((item) => {
    const matchesSearch = `${item.description} ${item.category}`
      .toLowerCase()
      .includes(search.value.toLowerCase());
    return matchesSearch && (type.value === "all" || item.type === type.value);
  }),
);
</script>

<template>
  <section
    class="mx-auto max-w-[1450px] px-[4vw] pt-[38px] pb-[60px] max-[700px]:px-[18px] max-[700px]:pt-7 max-[700px]:pb-[45px]"
  >
    <div
      class="mb-[30px] flex items-center justify-between max-[700px]:items-end"
    >
      <div>
        <span
          class="block text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--muted)]"
          >Histórico financeiro</span
        >
        <h1
          class="mt-1.5 font-display text-[30px] font-bold tracking-[-0.04em] max-[700px]:text-[27px]"
        >
          Movimentações
        </h1>
        <p class="mt-[7px] mb-0 text-sm text-[var(--muted)]">
          Consulte, filtre e organize todos os seus lançamentos.
        </p>
      </div>
      <button
        class="flex items-center gap-1.5 rounded-[10px] border-0 bg-[var(--primary)] px-4 py-[11px] text-[13px] font-bold text-white shadow-[0_7px_16px_color-mix(in_srgb,var(--primary)_22%,transparent)] transition hover:-translate-y-px hover:bg-[var(--primary-dark)] max-[700px]:hidden"
        @click="$emit('new-transaction')"
      >
        <PlusIcon class="size-[18px]" /> Adicionar
      </button>
    </div>
    <article
      class="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-[22px] shadow-[var(--panel-shadow)] max-[700px]:p-[18px]"
    >
      <div class="mb-5 flex justify-between gap-3 max-[700px]:flex-col">
        <div class="relative flex-1 max-w-[480px]">
          <MagnifyingGlassIcon
            class="absolute top-2.5 left-3.5 size-5 text-[var(--muted)]"
          /><input
            v-model="search"
            class="w-full rounded-[10px] border border-[var(--line)] bg-[var(--surface-2)] py-[11px] pr-[13px] pl-[41px] text-[var(--text)] outline-none focus:border-[var(--primary)]"
            placeholder="Buscar por descrição ou categoria"
            maxlength="120"
          />
        </div>
        <select
          v-model="type"
          class="min-w-[170px] rounded-[10px] border border-[var(--line)] bg-[var(--surface-2)] px-[13px] py-[11px] text-[var(--text)] outline-none focus:border-[var(--primary)] max-[700px]:w-full"
        >
          <option value="all">Todos os tipos</option>
          <option value="income">Receitas</option>
          <option value="expense">Despesas</option>
        </select>
      </div>
      <div
        class="grid grid-cols-[1fr_auto] border-b border-[var(--line)] px-[57px] py-[9px] text-[9px] font-bold uppercase tracking-[0.08em] text-[var(--muted)] max-[700px]:hidden"
      >
        <span>Movimentação</span><span>Valor</span>
      </div>
      <TransactionList :items="filtered" />
    </article>
  </section>
</template>
