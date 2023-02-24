<template>
  <div>
    <article class="px-4 md:mx-8 md:p-8 lg:mx-16 lg:p-16">
      <h1 class="text-4xl mb-3">
        {{ blog.title }}
      </h1>
      <h2 v-if="blog.lead" class="text-2xl mb-3">
        {{ blog.lead }}
      </h2>
      <div class="text-sm mb-3">
        <a
          :href="$config.githubURL"
          class="text-black font-bold mr-2 dark:text-white"
        >
          {{ $config.twitter }}
        </a>
        <span
          v-if="blog.createdAt"
          class="mr-2 text-gray-600 dark:text-gray-400"
        >
          Created at {{ $moment(blog.createdAt).format('LLL') }}
        </span>
        <span
          v-if="blog.updatedAt"
          class="mr-2 text-gray-600 dark:text-gray-400"
        >
          Updated {{ $moment(blog.updatedAt).fromNow() }}
        </span>
      </div>
      <div class="flex flex-wrap mb-3">
        <NuxtLink
          v-for="tag in blog.tags"
          :key="tag"
          :to="`/tag/${tag}`"
          class="interactable inline-flex items-center bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold mr-2 mb-2 dark:bg-gray-700 capitalize"
          data-type="link"
        >
          {{ tag }}
        </NuxtLink>
      </div>
      <figure
        v-if="blog.cover.thumb"
        v-lazy-container="{ selector: 'img' }"
        class="my-4 w-full"
      >
        <img
          :data-src="require(`@/assets/img/${blog.cover.thumb}`)"
          :data-loading="require(`@/assets/img/${blog.cover.thumb}?lqip`)"
          :alt="blog.cover.alt ? blog.cover.alt : blog.title"
        />
        <!-- eslint-disable -->
        <figcaption
          class="text-sm text-center"
          v-html="sanitizeHtml(blog.cover.caption)"
        />
        <!-- eslint-enable -->
      </figure>
      <h2 id="table-of-content">
        <a href="#table-of-content" aria-hidden="true" tabindex="-1">
          <span class="icon icon-link"></span>
        </a>
        Table of Content
      </h2>
      <nav v-if="blog.toc.length > 1">
        <ul class="px-4 my-4">
          <li
            v-for="link of blog.toc"
            :key="link.id"
            class="list-disc pl-1"
            :class="{ 'ml-5': link.depth === 3 }"
          >
            <NuxtLink
              :to="`#${link.id}`"
              class="interactable no-underline"
              data-type="link"
            >
              {{ link.text }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
      <NuxtContent :document="blog" class="my-8" />
      <PrevNext :prev="prev" :next="next" class="mt-16" />
    </article>
    <GiscusComment
      id="comments"
      repo="szczynk/blog"
      repo-id="R_kgDOG6TUFw"
      category="General"
      category-id="DIC_kwDOG6TUF84CQKD7"
      mapping="pathname"
      reactions-enabled="1"
      emit-metadata="0"
      input-position="top"
      theme="light"
      lang="en"
      loading="lazy"
    />
  </div>
</template>
<script>
import Vue from 'vue'
import sanitizeHtml from 'sanitize-html'

import AppCopyButton from '~/components/AppCopyButton'

export default {
  async asyncData({ $content, params }) {
    const blog = await $content(params.slug).fetch()

    const [prev, next] = await $content()
      .only(['title', 'slug', 'createdAt'])
      .sortBy('createdAt', 'asc')
      .surround(params.slug)
      .fetch()

    return {
      blog,
      prev,
      next,
    }
  },
  head() {
    const baseUrl = this.$config.baseURL
    const url = `${this.$config.blogURL}${this.blog.slug}`

    const dateCreated = new Date(this.blog.createdAt)
    const dateChanged = new Date(this.blog.updatedAt)

    const coverImage =
      this.blog.cover.thumb !== ''
        ? require(`@/assets/img/${this.blog.cover.thumb}`)
        : ''

    let description = this.blog.title
    if (this.blog.description) {
      description = this.blog.description
    }

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': url,
      },
      headline: this.blog.title,
      description,
      image: baseUrl + coverImage,
      author: {
        '@type': 'Person',
        name: this.$config.twitter,
        url: this.$config.githubURL,
      },
      datePublished: dateCreated.toISOString(),
      dateModified: dateChanged.toISOString(),
    }

    const head = {
      title: `${this.blog.title} | ${this.$config.title}`,
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
        content: `${this.blog.title} | ${this.$config.title}`,
      },
      { name: 'description', content: description },

      // Facebook & LinkedIn
      {
        property: 'og:title',
        content: `${this.blog.title} | ${this.$config.title}`,
      },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: url },
      { property: 'og:image', content: baseUrl + coverImage },
      { property: 'og:image:width', content: 1200 },
      { property: 'og:image:height', content: 638 },
      { property: 'og:locale', content: 'en' },
      {
        property: 'og:site_name',
        content: `${this.blog.title} | ${this.$config.title}`,
      },

      // Twitter
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: `@${this.$config.twitter}` },
      { name: 'twitter:creator', content: `@${this.$config.twitter}` },
      {
        name: 'twitter:title',
        content: `${this.blog.title} | ${this.$config.title}`,
      },
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
  mounted() {
    setTimeout(() => {
      const blocks = document.getElementsByClassName('nuxt-content-highlight')
      for (const block of blocks) {
        block.classList.add('flex')
        const CopyButton = Vue.extend(AppCopyButton)
        const component = new CopyButton().$mount()
        block.appendChild(component.$el)
      }
    }, 100)
  },
  methods: {
    sanitizeHtml,
  },
}
</script>
