<template>
  <div>
    <BreadcrumbItem subtitle="Tag" class="pt-16 pb-16" />
    <div class="block text-sm md:text-base">
      <TabsWrapper>
        <TabItem :title="activeTab" />
      </TabsWrapper>
      <TabsContent>
        <div>
          <ArticleCardWrapper :blogs="tags" />
        </div>
      </TabsContent>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const tags = await $content()
      .only(['title', 'subtitle', 'slug', 'cover', 'createdAt', 'tags'])
      .where({ tags: { $contains: params.slug } })
      .fetch()

    return {
      tags,
    }
  },
  head() {
    const baseUrl = this.$config.baseURL
    const url = `${this.$config.blogURL}tag/`

    const coverImage = require('@/assets/img/introduction.png')

    const description = this.$config.description

    const structuredData = {
      '@context': 'https://schema.org/',
      '@type': 'WebSite',
      name: this.$config.title,
      url: this.$config.blogURL,
      description,
      image: baseUrl + coverImage,
      author: {
        '@type': 'Person',
        name: this.$config.twitter,
        url: this.$config.githubURL,
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${this.$config.blogURL}tag/{search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    }

    const head = {
      link: [
        {
          rel: 'canonical',
          href: url,
        },
      ],
      script: [
        {
          type: 'application/ld+json',
          json: structuredData,
        },
      ],
      meta: [],
    }

    const metaTags = [
      // Global
      { name: 'author', content: this.$config.twitter },
      {
        name: 'apple-mobile-web-app-title',
        content: this.$config.title,
      },

      // Facebook & LinkedIn
      { property: 'og:title', content: this.$config.title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: url },
      { property: 'og:image', content: baseUrl + coverImage },
      { property: 'og:image:width', content: 1200 },
      { property: 'og:image:height', content: 638 },
      { property: 'og:locale', content: 'en' },
      {
        property: 'og:site_name',
        content: this.$config.title,
      },

      // Twitter
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: `@${this.$config.twitter}` },
      { name: 'twitter:creator', content: `@${this.$config.twitter}` },
      { name: 'twitter:title', content: this.$config.title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: baseUrl + coverImage },
      { name: 'twitter:image:width', content: 1200 },
      { name: 'twitter:image:height', content: 638 },
    ]

    // Add meta tags to head
    metaTags.forEach((tag) => {
      if (tag.content !== undefined && tag.content !== null) {
        if (Object.prototype.hasOwnProperty.call(tag, 'name')) {
          head.meta.push({
            hid: tag.name,
            name: tag.name,
            content: tag.content,
          })
        } else if (Object.prototype.hasOwnProperty.call(tag, 'property')) {
          head.meta.push({
            hid: tag.property,
            property: tag.property,
            content: tag.content,
          })
        }
      }
    })

    return head
  },
  computed: {
    activeTab() {
      return this.$route.params.slug || ''
    },
  },
}
</script>
