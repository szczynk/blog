<template>
  <div class="flex justify-between space-x-4">
    <NuxtLink
      v-if="prev"
      :to="prev.slug"
      class="interactable no-underline"
      data-type="link"
    >
      {{ prev.title }}
    </NuxtLink>
    <span v-else>&nbsp;</span>
    <NuxtLink
      v-if="next"
      :to="next.slug"
      class="interactable no-underline"
      data-type="link"
    >
      {{ next.title }}
    </NuxtLink>
    <span v-else>&nbsp;</span>
  </div>
</template>
<script>
export default {
  props: {
    prev: {
      type: Object,
      default: () => null,
    },
    next: {
      type: Object,
      default: () => null,
    },
  },
}
</script>
