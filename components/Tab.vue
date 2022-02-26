<template>
  <li
    :class="{
      'border-blue-900 border-solid border-b-2 dark:border-blue-400': isActive,
    }"
    class="px-4 py-2"
  >
    <a class="cursor-pointer" href="#" target="_self" @click="clickTab()">
      <slot name="icon"></slot>
      <span :class="{ 'text-blue-900 dark:text-blue-400': isActive }">
        {{ title }}
      </span>
    </a>
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

<style>
</style>
