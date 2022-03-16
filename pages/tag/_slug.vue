<template>
  <div>
    <Breadcrumb subtitle="Tag" class="pt-16 pb-16" />
    <div class="block text-sm md:text-base">
      <TabsWrapper>
        <Tab :title="activeTab" />
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
    const baseUrl = 'https://szczynk.github.io'
    const url = 'https://szczynk.github.io/blog/find/'

    const coverImage = require('@/assets/img/introduction.png')

    const description = 'My personal blog about anything that i need to talk.'

    const structuredData = {
      '@context': 'https://schema.org/',
      '@type': 'WebSite',
      name: 'Szczynk Blog',
      url: 'https://szczynk.github.io/blog/',
      description,
      image: baseUrl + coverImage,
      author: {
        '@type': 'Person',
        name: 'szczynk',
        url: 'https://szczynk.github.io/resume/',
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate:
            'https://szczynk.github.io/blog/find/{search_term_string}',
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
      { name: 'author', content: 'szczynk' },
      {
        name: 'apple-mobile-web-app-title',
        content: 'Szczynk Blog',
      },

      // Facebook & LinkedIn
      { property: 'og:title', content: 'Szczynk Blog' },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: url },
      { property: 'og:image', content: baseUrl + coverImage },
      { property: 'og:image:width', content: 1200 },
      { property: 'og:image:height', content: 638 },
      { property: 'og:locale', content: 'en' },
      {
        property: 'og:site_name',
        content: 'Szczynk Blog',
      },

      // Twitter
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@szczynk' },
      { name: 'twitter:creator', content: '@szczynk' },
      { name: 'twitter:title', content: 'Szczynk Blog' },
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
