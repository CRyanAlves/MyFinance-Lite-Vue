<script setup>
import { reactive, ref, watch } from "vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { useTransactionsStore } from "../stores/transactions";

const props = defineProps({ open: Boolean });
const emit = defineEmits(["close"]);
const store = useTransactionsStore();
const error = ref("");
const initial = () => ({
  description: "",
  amount: "",
  type: "expense",
  category: "Alimentação",
  date: new Date().toISOString().slice(0, 10),
});
const form = reactive(initial());
const categories = [
  "Alimentação",
  "Transporte",
  "Educação",
  "Serviços",
  "Lazer",
  "Trabalho",
  "Outros",
];

watch(
  () => props.open,
  (value) => {
    if (value) Object.assign(form, initial());
  },
);
function submit() {
  if (!form.description.trim() || Number(form.amount) <= 0) {
    error.value = "Preencha a descrição e informe um valor válido.";
    return;
  }
  store.addTransaction({ ...form });
  error.value = "";
  emit("close");
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-100 grid place-items-center bg-[#08110d]/62 p-5 backdrop-blur-sm"
      @click.self="$emit('close')"
    >
      <form
        class="w-full max-w-[510px] rounded-[18px] bg-[var(--surface)] p-[25px] shadow-[0_30px_80px_rgba(0,0,0,0.22)]"
        @submit.prevent="submit"
      >
        <div class="mb-5 flex items-start justify-between">
          <div>
            <span
              class="block text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--muted)]"
              >Novo registro</span
            >
            <h2
              class="mt-1 font-display text-[21px] font-bold tracking-[-0.025em]"
            >
              Adicionar movimentação
            </h2>
          </div>
          <button
            type="button"
            class="grid size-8 place-items-center rounded-full border-0 bg-[var(--surface-2)] text-[var(--text)]"
            aria-label="Fechar"
            @click="$emit('close')"
          >
            <XMarkIcon class="size-5" />
          </button>
        </div>
        <div
          class="mb-[17px] grid grid-cols-2 gap-[5px] rounded-[10px] bg-[var(--surface-2)] p-1"
        >
          <button
            type="button"
            class="rounded-lg border-0 px-2 py-[9px] text-xs font-bold"
            :class="
              form.type === 'expense'
                ? 'bg-[var(--surface)] text-[var(--primary)] shadow-[0_2px_8px_rgba(0,0,0,0.07)]'
                : 'bg-transparent text-[var(--muted)]'
            "
            @click="form.type = 'expense'"
          >
            Despesa
          </button>
          <button
            type="button"
            class="rounded-lg border-0 px-2 py-[9px] text-xs font-bold"
            :class="
              form.type === 'income'
                ? 'bg-[var(--surface)] text-[var(--primary)] shadow-[0_2px_8px_rgba(0,0,0,0.07)]'
                : 'bg-transparent text-[var(--muted)]'
            "
            @click="form.type = 'income'"
          >
            Receita
          </button>
        </div>
        <label class="mt-[13px] grid gap-[7px] text-[11px] font-bold"
          >Descrição<input
            v-model="form.description"
            class="w-full rounded-[10px] border border-[var(--line)] bg-[var(--surface-2)] px-[13px] py-[11px] text-[var(--text)] outline-none focus:border-[var(--primary)]"
            placeholder="Ex.: Supermercado"
            maxlength="120"
            autofocus
        /></label>
        <div class="grid grid-cols-2 gap-3 max-[700px]:grid-cols-1">
          <label class="mt-[13px] grid gap-[7px] text-[11px] font-bold"
            >Valor (R$)<input
              v-model.number="form.amount"
              class="w-full rounded-[10px] border border-[var(--line)] bg-[var(--surface-2)] px-[13px] py-[11px] text-[var(--text)] outline-none focus:border-[var(--primary)]"
              type="number"
              step="0.01"
              min="0.01"
              max="999999999.99"
              placeholder="0,00" /></label
          ><label class="mt-[13px] grid gap-[7px] text-[11px] font-bold"
            >Data<input
              v-model="form.date"
              class="w-full rounded-[10px] border border-[var(--line)] bg-[var(--surface-2)] px-[13px] py-[11px] text-[var(--text)] outline-none focus:border-[var(--primary)]"
              type="date"
          /></label>
        </div>
        <label class="mt-[13px] grid gap-[7px] text-[11px] font-bold"
          >Categoria<select
            v-model="form.category"
            class="w-full rounded-[10px] border border-[var(--line)] bg-[var(--surface-2)] px-[13px] py-[11px] text-[var(--text)] outline-none focus:border-[var(--primary)]"
          >
            <option v-for="category in categories" :key="category">
              {{ category }}
            </option>
          </select></label
        >
        <p v-if="error" class="my-[11px] text-[11px] text-[var(--danger)]">
          {{ error }}
        </p>
        <div
          class="mt-[23px] flex justify-end gap-2.5 border-t border-[var(--line)] pt-[18px]"
        >
          <button
            type="button"
            class="rounded-[10px] border border-[var(--line)] bg-[var(--surface-2)] px-4 py-[11px] text-[13px] font-bold text-[var(--text)]"
            @click="$emit('close')"
          >
            Cancelar</button
          ><button
            class="rounded-[10px] border-0 bg-[var(--primary)] px-4 py-[11px] text-[13px] font-bold text-white shadow-[0_7px_16px_color-mix(in_srgb,var(--primary)_22%,transparent)] transition hover:-translate-y-px hover:bg-[var(--primary-dark)]"
          >
            Salvar movimentação
          </button>
        </div>
      </form>
    </div>
  </Teleport>
</template>
