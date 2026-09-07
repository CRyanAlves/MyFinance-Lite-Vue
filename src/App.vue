<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import {
  ArrowTrendingUpIcon,
  ArrowsRightLeftIcon,
  Bars3Icon,
  Cog6ToothIcon,
  HomeIcon,
  MoonIcon,
  PlusIcon,
  SunIcon,
} from "@heroicons/vue/24/outline";
import TransactionModal from "./components/TransactionModal.vue";

const route = useRoute();
const modalOpen = ref(false);
const mobileNavOpen = ref(false);
const dark = ref(localStorage.getItem("myfinance-theme") === "dark");

watch(
  dark,
  (value) => {
    document.documentElement.classList.toggle("dark", value);
    localStorage.setItem("myfinance-theme", value ? "dark" : "light");
  },
  { immediate: true },
);

watch(
  () => route.path,
  () => {
    mobileNavOpen.value = false;
  },
);
</script>

<template>
  <div class="min-h-screen">
    <aside
      class="fixed inset-y-0 left-0 z-20 flex w-[250px] flex-col bg-[#121e19] px-5 py-7 text-[#d9e4de] transition-transform duration-200 max-[1000px]:-translate-x-full"
      :class="{ 'max-[1000px]:translate-x-0': mobileNavOpen }"
    >
      <div
        class="flex items-center gap-[11px] px-2.5 pb-[35px] font-display text-[19px] font-bold text-white"
      >
        <span
          class="grid size-[34px] -rotate-4 place-items-center rounded-[11px] bg-[var(--accent)] text-lg text-[#17231e]"
          >M</span
        ><span>MyFinance</span>
      </div>
      <nav class="grid gap-1.5">
        <RouterLink
          to="/"
          class="flex items-center gap-3 rounded-[10px] px-3.5 py-3 text-sm font-semibold text-[#8fa198] no-underline transition-colors hover:bg-[#203129] hover:text-white [&.router-link-active]:bg-[#203129] [&.router-link-active]:text-white"
          ><HomeIcon class="size-5" /> Visão geral</RouterLink
        >
        <RouterLink
          to="/movimentacoes"
          class="flex items-center gap-3 rounded-[10px] px-3.5 py-3 text-sm font-semibold text-[#8fa198] no-underline transition-colors hover:bg-[#203129] hover:text-white [&.router-link-active]:bg-[#203129] [&.router-link-active]:text-white"
          ><ArrowsRightLeftIcon class="size-5" /> Movimentações</RouterLink
        >
        <RouterLink
          to="/configuracoes"
          class="flex items-center gap-3 rounded-[10px] px-3.5 py-3 text-sm font-semibold text-[#8fa198] no-underline transition-colors hover:bg-[#203129] hover:text-white [&.router-link-active]:bg-[#203129] [&.router-link-active]:text-white"
          ><Cog6ToothIcon class="size-5" /> Configurações</RouterLink
        >
      </nav>
      <div
        class="relative mt-auto overflow-hidden rounded-2xl border border-[#294036] bg-[#1d3027] p-[18px]"
      >
        <span
          class="block text-[10px] font-bold uppercase tracking-[0.1em] text-[#8c9d94]"
          >Dica do dia</span
        >
        <strong class="mt-2 block w-3/4 text-[13px] leading-normal"
          >Pequenos aportes constroem grandes planos.</strong
        >
        <div
          class="absolute -right-1 -bottom-[13px] grid size-[58px] place-items-center rounded-full bg-[var(--accent)] text-[#17231e]"
        >
          <ArrowTrendingUpIcon class="size-7 stroke-[2.5]" />
        </div>
      </div>
      <div
        class="mt-[17px] flex items-center gap-2.5 border-t border-[#293932] px-[5px] pt-5"
      >
        <div
          class="grid size-9 place-items-center rounded-full bg-[#e6a379] text-xs font-bold text-[#34241b]"
        >
          PA
        </div>
        <div>
          <strong class="block text-[13px]">Pedro Alvares</strong
          ><span class="mt-0.5 block text-[11px] text-[#7f9188]"
            >Conta pessoal</span
          >
        </div>
      </div>
    </aside>

    <div
      v-if="mobileNavOpen"
      class="fixed inset-0 z-15 bg-black/40 min-[1001px]:hidden"
      @click="mobileNavOpen = false"
    ></div>

    <main class="ml-[250px] min-h-screen max-[1000px]:ml-0">
      <header
        class="sticky top-0 z-10 flex h-[78px] items-center justify-end border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--bg)_85%,transparent)] px-[4vw] backdrop-blur-xl max-[1000px]:justify-between max-[700px]:h-[68px] max-[700px]:px-[18px]"
      >
        <button
          class="mr-auto hidden size-10 place-items-center rounded-[10px] border border-[var(--line)] bg-[var(--surface)] text-[var(--text)] max-[1000px]:grid"
          aria-label="Abrir menu"
          @click="mobileNavOpen = true"
        >
          <Bars3Icon class="size-5" />
        </button>
        <div class="flex items-center gap-3">
          <button
            class="grid size-10 place-items-center rounded-[10px] border border-[var(--line)] bg-[var(--surface)] text-[var(--text)]"
            :aria-label="dark ? 'Ativar tema claro' : 'Ativar tema escuro'"
            @click="dark = !dark"
          >
            <SunIcon v-if="dark" class="size-5" /><MoonIcon
              v-else
              class="size-5"
            />
          </button>
          <button
            class="flex items-center gap-1.5 rounded-[10px] border-0 bg-[var(--primary)] px-4 py-[11px] text-[13px] font-bold text-white shadow-[0_7px_16px_color-mix(in_srgb,var(--primary)_22%,transparent)] transition hover:-translate-y-px hover:bg-[var(--primary-dark)] max-[700px]:px-3 max-[700px]:text-[0]"
            @click="modalOpen = true"
          >
            <PlusIcon class="size-[18px]" />
            <span class="max-[700px]:hidden">Nova movimentação</span>
          </button>
        </div>
      </header>
      <RouterView @new-transaction="modalOpen = true" />
    </main>
    <TransactionModal :open="modalOpen" @close="modalOpen = false" />
  </div>
</template>
