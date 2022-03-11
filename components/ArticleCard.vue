<template>
  <div class="container mx-auto px-4 py-4">
    <div class="flex flex-wrap justify-center">
      <div class="">
        <div
          class="
            flex
            break-words
            border
            rounded-lg
            shadow-md
            dark:border-gray-700
          "
        >
          <!-- article image -->
          <div v-if="blog.cover" v-lazy-container="{ selector: 'img' }">
            <img
              class="
                rounded-l-lg
                shadow-md
                h-full
                w-[360px]
                md:w-[360px]
                lg:h-60
              "
              :data-src="
                require(`@/assets/img/${blog.cover.thumb}?resize&sizes[]=360`)
              "
              :data-loading="
                require(`@/assets/img/${blog.cover.thumb}?resize&sizes[]=360&lqip`)
              "
              :alt="blog.cover.alt ? blog.cover.alt : blog.title"
            />
          </div>
          <div class="max-w-xs md:max-w-md">
            <div class="flex-auto p-4">
              <NuxtLink
                :to="blog.slug"
                class="
                  block
                  mb-3
                  text-black
                  font-bold
                  dark:text-white
                  hover:text-underline
                  truncate
                  md:whitespace-normal
                  cursor-pointer
                "
              >
                {{ blog.title }}
              </NuxtLink>
              <NuxtLink
                v-if="blog.subtitle"
                :to="blog.slug"
                tag="p"
                class="
                  text-gray-700
                  mb-3
                  dark:text-gray-400
                  truncate
                  md:whitespace-normal
                "
              >
                {{ blog.subtitle }}
              </NuxtLink>
              <div class="text-sm mb-3">
                <a
                  href="https://szczynk.github.io/resume/"
                  class="text-black font-bold mr-2 dark:text-white"
                >
                  szczynk
                </a>
                <span class="text-gray-600 dark:text-gray-400">
                  {{ $moment(blog.createdAt).format('LLL') }}
                </span>
              </div>
              <!-- list of tags -->
              <div class="flex flex-wrap justify-center">
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
                    text-sm
                    font-semibold
                    mr-2
                    mb-2
                    dark:bg-gray-700
                  "
                >
                  {{ tag }}
                </span>
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
}
</script>

<style scoped>
img[lazy='loading'] {
  filter: blur(15px);
}
</style>
