<template>
  <div v-lazy-container="{ selector: 'img' }" class="inline-block">
    <img
      :data-src="require(`@/assets/img/${filename}`)"
      :data-loading="require(`@/assets/img/${filename}?lqip`)"
      :alt="filename"
    />
  </div>
</template>

<script>
export default {
  props: {
    filename: {
      type: String,
      required: true,
    },
  },
}
</script>
