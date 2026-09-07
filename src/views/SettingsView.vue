<script setup>
import { ref } from "vue";
import { CheckCircleIcon } from "@heroicons/vue/24/outline";
import { useTransactionsStore } from "../stores/transactions";
const store = useTransactionsStore();
const resetCompleted = ref(false);

function restoreDemoData() {
  store.resetData();
  resetCompleted.value = true;
}
</script>

<template>
  <section
    class="mx-auto max-w-[980px] px-[4vw] pt-[38px] pb-[60px] max-[700px]:px-[18px] max-[700px]:pt-7 max-[700px]:pb-[45px]"
  >
    <div class="mb-[30px] flex items-end justify-between">
      <div>
        <span
          class="block text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--muted)]"
          >Preferências</span
        >
        <h1
          class="mt-1.5 font-display text-[30px] font-bold tracking-[-0.04em] max-[700px]:text-[27px]"
        >
          Configurações
        </h1>
        <p class="mt-[7px] mb-0 text-sm text-[var(--muted)]">
          Personalize sua experiência no MyFinance.
        </p>
      </div>
    </div>
    <article
      class="mb-4 flex items-center justify-between rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-[22px] shadow-[var(--panel-shadow)] max-[700px]:flex-col max-[700px]:items-start max-[700px]:gap-[18px] max-[700px]:p-[18px]"
    >
      <div>
        <h2
          class="mb-1.5 font-display text-[17px] font-bold tracking-[-0.025em]"
        >
          Meta mensal de gastos
        </h2>
        <p class="m-0 text-xs text-[var(--muted)]">
          Defina quanto você pretende gastar durante o mês.
        </p>
      </div>
      <div
        class="flex items-center overflow-hidden rounded-[10px] border border-[var(--line)] bg-[var(--surface-2)] max-[700px]:w-full"
      >
        <span class="pl-3 text-xs text-[var(--muted)]">R$</span
        ><input
          v-model.number="store.monthlyGoal"
          class="w-[130px] border-0 bg-[var(--surface-2)] px-[13px] py-[11px] text-[var(--text)] outline-none focus:ring-1 focus:ring-[var(--primary)] max-[700px]:w-full"
          type="number"
          min="1"
          max="999999999.99"
        />
      </div>
    </article>
    <article
      class="mb-4 flex items-center justify-between rounded-2xl border border-[#f1d7d2] bg-[var(--surface)] p-[22px] shadow-[var(--panel-shadow)] max-[700px]:flex-col max-[700px]:items-start max-[700px]:gap-[18px] max-[700px]:p-[18px]"
    >
      <div>
        <h2
          class="mb-1.5 font-display text-[17px] font-bold tracking-[-0.025em]"
        >
          Restaurar dados de demonstração
        </h2>
        <p class="m-0 text-xs text-[var(--muted)]">
          Recupera os lançamentos e a meta mensal originais usados no seminário.
        </p>
      </div>
      <div class="flex flex-col items-end gap-2 max-[700px]:items-start">
        <button
          class="rounded-[10px] border-0 bg-[#fff0ee] px-4 py-[11px] text-[13px] font-bold text-[#b54639]"
          type="button"
          @click="restoreDemoData"
        >
          Restaurar dados
        </button>
        <p v-if="resetCompleted" class="m-0 flex items-center gap-1.5 text-xs font-semibold text-[var(--primary)]" role="status"><CheckCircleIcon class="size-5" />Dados restaurados com sucesso.</p>
      </div>
    </article>
    <article class="mt-6 rounded-2xl bg-[#172a22] p-6 text-[#e6f0eb]">
      <span class="block text-[11px] text-[#8da097]">Feito com</span
      ><strong class="my-[5px] block font-display text-xl font-bold"
        >Vue 3 + Pinia + Vue Router</strong
      >
      <p class="m-0 max-w-[600px] text-xs text-[#a8b9b0]">
        Este projeto usa Composition API, componentes, props, emits, computed,
        watch, diretivas e persistência no navegador.
      </p>
    </article>
  </section>
</template>
