<template>
  <div
    ref="scrollTopButton"
    class="invisible sticky w-full flex justify-end bottom-0 pb-4 pr-4 lg:pr-16 transition"
  >
    <div
      class="rounded-md cursor-pointer border bg-white text-gray-700 border-gray-800 dark:border-gray-300 dark:bg-gray-900 dark:text-gray-300 transition"
    >
      <button
        role="button"
        class="p-3"
        aria-label="scroll to top of the page"
        @click="scrollToTop"
      >
        <IconChevronUp />
      </button>
    </div>

    <div
      v-if="toc"
      class="ml-2 rounded-md cursor-pointer border bg-white text-gray-700 border-gray-800 dark:border-gray-300 dark:bg-gray-900 dark:text-gray-300 transition"
    >
      <NuxtLink
        :to="'#table-of-content'"
        class="p-2 flex items-center justify-center"
        aria-label="scroll to table of content"
      >
        <span>ToC</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  computed: {
    toc() {
      switch (this.$route.name) {
        case 'p':
          return false
        case 'index':
          return false
        default:
          return true
      }
    },
  },

  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },

  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },

  methods: {
    handleScroll() {
      const scrollBtn = this.$refs.scrollTopButton

      if (window.scrollY > 0) {
        scrollBtn.classList.remove('invisible')
      } else {
        scrollBtn.classList.add('invisible')
      }
    },
    scrollToTop() {
      history.replaceState([], '', window.location.href.split('#')[0])
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
  },
})
</script>
