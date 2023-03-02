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
          :to="`/p/tag/${tag}`"
          class="interactable inline-flex items-center bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold mr-2 mb-2 dark:bg-gray-700 capitalize"
          data-type="link"
        >
          {{ tag }}
        </NuxtLink>
      </div>
      <figure
        v-if="isCoverExisted"
        v-lazy-container="{ selector: 'img' }"
        class="my-4 w-full"
      >
        <img
          :data-src="coverThumb"
          :data-loading="coverThumbLqip"
          :alt="blog.cover.alt ? blog.cover.alt : blog.title"
        />
        <!-- eslint-disable -->
        <figcaption
          class="text-sm text-center"
          v-html="sanitizeHtml(blog.cover.caption)"
        />
        <!-- eslint-enable -->
      </figure>
      <h2 v-if="blog.toc.length > 1" id="table-of-content">
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
  </div>
</template>
<script>
import Vue from 'vue'
import sanitizeHtml from 'sanitize-html'

import AppCopyButton from '~/components/AppCopyButton'

export default {
  layout: 'p',
  async asyncData({ $content, params }) {
    const blog = await $content('p', params.slug).fetch()
    // const blog = await $content(`p/${params.slug}`).fetch()

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
  data() {
    return {
      imgThumb: '',
    }
  },
  computed: {
    isCoverExisted() {
      return this.imgThumb !== ''
    },
    coverThumb() {
      return this.imgThumb !== ''
        ? require(`@/assets/img/${this.imgThumb}`)
        : ''
    },
    coverThumbLqip() {
      return this.imgThumb !== ''
        ? require(`@/assets/img/${this.imgThumb}?lqip`)
        : ''
    },
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

    if (this.blog.cover) {
      this.imgThumb = this.blog.cover.thumb
    }
  },
  methods: {
    sanitizeHtml,
  },
}
</script>
