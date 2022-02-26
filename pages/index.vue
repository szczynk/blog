<template>
  <div>
    <Breadcrumb title="Blog" />
    <div class="block text-sm md:text-base">
      <TabsWrapper>
        <Tab
          title="Tech"
          :is-active="activeTab === 'Tech'"
          :on-click-tab="clickTab"
        />
        <Tab
          title="Game"
          :is-active="activeTab === 'Game'"
          :on-click-tab="clickTab"
        />
        <Tab
          title="All"
          :is-active="activeTab === 'All'"
          :on-click-tab="clickTab"
        />
        <Tab
          title="Pesonal"
          :is-active="activeTab === 'Pesonal'"
          :on-click-tab="clickTab"
        />
        <Tab
          title="Misc"
          :is-active="activeTab === 'Misc'"
          :on-click-tab="clickTab"
        />
      </TabsWrapper>
      <TabsContent>
        <div v-if="activeTab === 'Tech'">
          <ArticleCardWrapper :blogs="techBlogs" />
        </div>
        <div v-if="activeTab === 'Game'">
          <ArticleCardWrapper :blogs="gameBlogs" />
        </div>
        <div v-if="activeTab === 'All'">
          <ArticleCardWrapper :blogs="allBlogs" />
        </div>
        <div v-if="activeTab === 'Pesonal'">
          <ArticleCardWrapper :blogs="personalBlogs" />
        </div>
        <div v-if="activeTab === 'Misc'">
          <ArticleCardWrapper :blogs="miscBlogs" />
        </div>
      </TabsContent>
    </div>
    <!-- <ArticleCard /> -->
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const allBlogs = await $content(params.slug)
      .only(['title', 'subtitle', 'slug', 'cover', 'createdAt', 'tags'])
      .sortBy('createdAt', 'desc')
      .fetch()

    const techBlogs = await $content(params.slug)
      .only(['title', 'subtitle', 'slug', 'cover', 'createdAt', 'tags'])
      .where({ tags: { $contains: 'Tech' } })
      .sortBy('createdAt', 'desc')
      .fetch()

    const gameBlogs = await $content(params.slug)
      .only(['title', 'subtitle', 'slug', 'cover', 'createdAt', 'tags'])
      .where({ tags: { $contains: 'Game' } })
      .sortBy('createdAt', 'desc')
      .fetch()

    const personalBlogs = await $content(params.slug)
      .only(['title', 'subtitle', 'slug', 'cover', 'createdAt', 'tags'])
      .where({ tags: { $contains: 'Personal' } })
      .sortBy('createdAt', 'desc')
      .fetch()

    const miscBlogs = await $content(params.slug)
      .only(['title', 'subtitle', 'slug', 'cover', 'createdAt', 'tags'])
      .where({ tags: { $contains: 'Misc' } })
      .sortBy('createdAt', 'desc')
      .fetch()

    return {
      allBlogs,
      techBlogs,
      gameBlogs,
      personalBlogs,
      miscBlogs,
    }
  },
  data() {
    return {
      activeTab: 'All',
    }
  },
  methods: {
    clickTab(name) {
      this.activeTab = name
    },
  },
}
</script>
