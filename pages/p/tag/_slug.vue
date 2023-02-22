<template>
  <div>
    <BreadcrumbItem subtitle="Tag" class="pt-16 pb-16" />
    <div class="block text-sm md:text-base">
      <TabsWrapper>
        <TabItem :title="activeTab" />
      </TabsWrapper>
      <TabsContent>
        <div>
          <ArticleCardWrapperP :blogs="tags" />
        </div>
      </TabsContent>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'p',
  async asyncData({ $content, params }) {
    const tags = await $content('p')
      .only(['title', 'subtitle', 'slug', 'cover', 'createdAt', 'tags'])
      .where({ tags: { $contains: params.slug } })
      .fetch()

    return {
      tags,
    }
  },
  computed: {
    activeTab() {
      return this.$route.params.slug || ''
    },
  },
}
</script>
