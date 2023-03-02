<template>
  <div class="container mx-auto px-4 py-4">
    <div>
      <div class="flex justify-center">
        <div
          class="flex break-words box-border border-2 rounded-lg shadow-md border-gray-300 dark:border-gray-700"
        >
          <!-- article image -->
          <div
            v-if="isCoverExisted"
            v-lazy-container="{ selector: 'img' }"
            class="article-img"
          >
            <img
              class="rounded-l-lg shadow-md h-full w-[360px] md:w-[360px] lg:h-60"
              :data-src="coverThumb"
              :data-loading="coverThumbLqip"
              :alt="blog.cover.alt ? blog.cover.alt : blog.title"
            />
          </div>
          <div class="max-w-[300px] md:max-w-md">
            <div class="flex-auto p-4">
              <NuxtLink
                :to="{ name: 'slug', params: { slug: blog.slug } }"
                class="interactable block mb-3 text-black font-bold dark:text-white hover:text-underline truncate md:whitespace-normal cursor-pointer"
                data-type="link"
              >
                {{ blog.title }}
              </NuxtLink>
              <NuxtLink
                v-if="blog.subtitle"
                :to="{ name: 'slug', params: { slug: blog.slug } }"
                class="interactable"
                data-type="link"
              >
                <p
                  class="text-gray-700 mb-3 dark:text-gray-400 truncate md:whitespace-normal"
                >
                  {{ blog.subtitle }}
                </p>
              </NuxtLink>
              <div class="text-sm mb-3">
                <a
                  :href="$config.githubURL"
                  class="text-black font-bold mr-2 dark:text-white"
                >
                  {{ $config.twitter }}
                </a>
                <span class="text-gray-600 dark:text-gray-400">
                  {{ $moment(blog.createdAt).format('LLL') }}
                </span>
              </div>
              <!-- list of tags -->
              <div class="flex flex-wrap justify-center">
                <NuxtLink
                  v-for="tag in blog.tags"
                  :key="tag"
                  :to="`/tag/${tag}`"
                  class="interactable inline-flex items-center bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 dark:bg-gray-700 capitalize"
                  data-type="link"
                >
                  {{ tag }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    blog: {
      type: Object,
      default: () => {},
    },
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
        ? require(`@/assets/img/${this.imgThumb}?resize&sizes[]=360`)
        : ''
    },
    coverThumbLqip() {
      return this.imgThumb !== ''
        ? require(`@/assets/img/${this.imgThumb}?resize&sizes[]=360&lqip`)
        : ''
    },
  },
  mounted() {
    if (this.blog.cover) {
      this.imgThumb = this.blog.cover.thumb
    }
  },
}
</script>
