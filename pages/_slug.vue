<template>
  <article class="px-4 md:mx-8 md:p-8 lg:mx-16 lg:p-16">
    <h1 class="text-4xl mb-3">
      {{ blog.title }}
    </h1>
    <h2 v-if="blog.lead" class="text-2xl mb-3">
      {{ blog.lead }}
    </h2>
    <div class="text-sm mb-3">
      <a
        href="https://szczynk.github.io/resume/"
        class="text-black font-bold mr-2 dark:text-white"
      >
        szczynk
      </a>
      <span v-if="blog.createdAt" class="text-gray-600 dark:text-gray-400">
        {{ $moment(blog.createdAt).format('LLL') }}
      </span>
    </div>
    <div v-if="blog.tags.length" class="flex flex-wrap mb-3">
      <span
        v-for="tag in blog.tags"
        :key="tag"
        class="
          inline-flex
          items-center
          bg-gray-200
          rounded-full
          px-3
          py-1
          text-xs
          font-semibold
          mr-2
          mb-2
          dark:bg-gray-700
        "
      >
        {{ tag }}
      </span>
    </div>
    <figure
      v-if="blog.cover"
      v-lazy-container="{ selector: 'img' }"
      class="my-4 w-full"
    >
      <img
        :data-src="blog.cover.thumb"
        :data-loading="blog.cover.thumb + '?lqip'"
        :alt="blog.cover.alt ? blog.cover.alt : blog.title"
      />
      <!-- eslint-disable -->
      <figcaption
        class="text-sm text-center"
        v-html="sanitizeHtml(blog.cover.caption)"
      />
      <!-- eslint-enable -->
    </figure>
    <nav v-if="blog.toc.length > 1">
      <ul class="px-4 my-4">
        <li
          v-for="link of blog.toc"
          :key="link.id"
          class="list-disc pl-1"
          :class="{ 'ml-5': link.depth === 3 }"
        >
          <NuxtLink :to="`#${link.id}`" class="no-underline">
            {{ link.text }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
    <NuxtContent :document="blog" class="my-8" />
    <PrevNext :prev="prev" :next="next" class="mt-16" />
  </article>
</template>
<script>
import sanitizeHtml from 'sanitize-html'

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
    const url = `https://szczynk.github.io/blog/${this.blog.slug}`

    const dateCreated = new Date(this.blog.createdAt)
    const dateChanged = new Date(this.blog.updatedAt)

    const structuredData = {
      '@type': 'Article',
      datePublished: dateCreated.toISOString(),
      dateModified: dateChanged.toISOString(),
      headline: this.blog.title,
      image: this.blog.cover ? this.blog.cover : '',
    }

    const head = {
      title: this.blog.title,
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
      meta: [
        {
          hid: 'og:url',
          name: 'og:url',
          property: 'og:url',
          content: url,
        },
        {
          hid: 'og:title',
          name: 'og:title',
          property: 'og:title',
          content: `${this.blog.title} - szczynk.github.io/blog`,
        },
      ],
    }

    let description = this.blog.title
    if (this.blog.description) {
      description = this.blog.description
    }

    head.meta.push(
      {
        hid: 'description',
        name: 'description',
        content: description,
      },
      {
        hid: 'og:description',
        name: 'og:description',
        property: 'og:description',
        content: description,
      }
    )

    if (this.blog.cover) {
      head.meta.push({
        hid: 'og:image',
        name: 'og:image',
        property: 'og:image',
        content: this.blog.cover.image,
      })
    }

    return head
  },
  methods: {
    sanitizeHtml,
  },
}
</script>
