<template>
  <div>
    <BreadcrumbItem class="pt-40 pb-40" />
    <div class="block text-sm md:text-base">
      <TabsWrapper>
        <TabItem
          title="all"
          :is-active="activeTab === 'all'"
          :on-click-tab="clickTab"
        />
      </TabsWrapper>
      <TabsContent>
        <div v-if="activeTab === 'all'">
          <ArticleCardWrapper :blogs="allBlogs" />
        </div>
      </TabsContent>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'p',
  async asyncData({ $content }) {
    const allBlogs = await $content('p')
      .only(['title', 'subtitle', 'slug', 'cover', 'createdAt', 'tags'])
      .sortBy('createdAt', 'desc')
      .limit(20)
      .fetch()

    return {
      allBlogs,
    }
  },
  data() {
    return {
      activeTab: 'all',
    }
  },
  methods: {
    clickTab(name) {
      this.activeTab = name
    },
  },
}
</script>
