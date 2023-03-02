<template>
  <nav
    class="fixed top-0 z-40 w-full border-b bg-white text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300"
    :class="{ 'shadow-lg border-transparent dark:shadow-gray-700': scrolled }"
    @click="scrollToTop"
  >
    <div class="container mx-auto flex-1 px-4 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="lg:w-1/5 flex items-center pr-4" @click.stop="noop">
          <NuxtLink
            :to="'/p'"
            class="interactable flex-shrink-0 flex-1 font-bold text-xl"
            :aria-label="`${$config.title} Logo`"
            data-type="link"
          >
            <span
              v-if="!logo"
              class="text-center text-base md:text-lg [text-shadow:0.25rem_0.25rem_0.25rem_rgba(0,0,0,0.25)] dark:[text-shadow:0.25rem_0.25rem_0.25rem_rgba(255,255,255,0.25)]"
            >
              {{ $config.title }}
            </span>

            <img
              v-if="logo"
              :src="logo.light"
              class="h-8 max-w-full light-img"
              :alt="$config.title"
            />
            <img
              v-if="logo"
              :src="logo.dark"
              class="h-8 max-w-full dark-img"
              :alt="$config.title"
            />
          </NuxtLink>
        </div>
        <div class="flex-1 flex justify-start w-4/6">
          <AppSearchP class="hidden sm:block" />
        </div>
        <div
          class="lg:w-1/5 flex items-center justify-between pl-4 lg:pl-8"
          @click.stop="noop"
        >
          <div class="flex items-center">
            <span class="inline-flex">
              <button
                class="rounded-md hover:text-primary-500 focus:outline-none transition ease-in-out duration-150"
                aria-label="Color Mode"
                @click="changeTheme()"
              >
                <client-only placeholder="......">
                  <IconSun
                    v-if="$colorMode.value === 'light'"
                    class="w-6 h-6"
                  />
                  <IconMoon v-else class="w-6 h-6" />
                </client-only>
              </button>
            </span>
            <a
              v-if="$config.twitter"
              :href="`https://twitter.com/${$config.twitter}`"
              target="_blank"
              rel="noopener noreferrer"
              title="Twitter"
              name="Twitter"
              data-type="link"
              class="interactable text-gray-700 dark:text-gray-300 hover:text-primary-500 dark-hover:text-primary-500 ml-4 lg:block"
            >
              <IconTwitter class="w-5 h-5" />
            </a>
            <a
              v-if="$config.github"
              :href="`https://github.com/${$config.github}`"
              target="_blank"
              rel="noopener noreferrer"
              title="Github"
              name="Github"
              data-type="link"
              class="interactable text-gray-700 dark:text-gray-300 hover:text-primary-500 dark-hover:text-primary-500 ml-4 lg:block"
            >
              <IconGithub class="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      scrolled: 0,
      settings: {
        // logo: {
        //   light: '',
        //   dark: '',
        // },
      },
    }
  },
  computed: {
    logo() {
      if (!this.settings.logo) {
        return
      }

      if (typeof this.settings.logo === 'object') {
        return this.settings.logo
      }

      return {
        light: this.settings.logo,
        dark: this.settings.logo,
      }
    },
  },
  beforeMount() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    changeTheme() {
      this.$colorMode.value === 'dark'
        ? (this.$colorMode.preference = 'light')
        : (this.$colorMode.preference = 'dark')

      const g = document.querySelector('iframe.giscus-frame')
      if (g) {
        g.contentWindow.postMessage(
          {
            giscus: {
              setConfig: {
                theme:
                  localStorage.getItem('nuxt-color-mode') === 'dark'
                    ? 'light'
                    : 'dark',
              },
            },
          },
          'https://giscus.app'
        )
      }
    },
    handleScroll() {
      this.scrolled = window.scrollY > 0
    },
    scrollToTop() {
      if (window.innerWidth >= 1280) {
        return
      }
      window.scrollTo(0, 0)
    },
    noop() {},
  },
}
</script>
