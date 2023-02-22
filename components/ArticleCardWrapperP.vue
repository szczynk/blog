<template>
  <div>
    <ArticleCardP v-for="blog in blogs" :key="blog.slug" :blog="blog" />
  </div>
</template>

<script>
export default {
  props: {
    blogs: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
