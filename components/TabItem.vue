<template>
  <li
    :class="{
      'border-blue-900 border-solid border-b-2 dark:border-blue-400': isActive,
    }"
    class="px-2 py-2 sm:px-4 sm:py-2"
  >
    <button class="cursor-pointer font-bold" @click="clickTab()">
      <slot name="icon"></slot>
      <span
        :class="{ 'text-blue-900 dark:text-blue-400': isActive }"
        class="capitalize"
      >
        {{ title }}
      </span>
    </button>
  </li>
</template>

<script>
export default {
  props: {
    title: { type: String, default: '' },
    isActive: { type: Boolean, default: false },
    onClickTab: { type: Function, default: () => {} },
  },
  methods: {
    clickTab() {
      this.onClickTab(this.title)
    },
  },
}
</script>
