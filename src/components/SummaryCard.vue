<script setup>
defineProps({
  label: String,
  value: String,
  variation: String,
  tone: { type: String, default: "neutral" },
  icon: [Object, Function],
  variationIcon: [Object, Function],
});
</script>

<template>
  <article
    class="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 shadow-[var(--panel-shadow)]"
  >
    <div
      class="flex items-center justify-between text-xs font-semibold text-[var(--muted)]"
    >
      <span>{{ label }}</span
      ><span
        class="grid size-[31px] place-items-center rounded-[9px]"
        :class="
          tone === 'negative'
            ? 'bg-[#fff0ec] text-[#d05d49]'
            : 'bg-[#e4f6ee] text-[#26785a]'
        "
        ><component :is="icon" class="size-[17px] stroke-[2.25]"
      /></span>
    </div>
    <strong class="my-2 mt-3 block font-display text-[25px] font-bold">{{
      value
    }}</strong>
    <span
      class="flex items-center gap-1 text-[11px] font-semibold"
      :class="tone === 'negative' ? 'text-[#df705c]' : 'text-[#3a9674]'"
      ><component :is="variationIcon" class="size-3.5 stroke-[2.5]" />{{
        variation
      }}</span
    >
  </article>
</template>
