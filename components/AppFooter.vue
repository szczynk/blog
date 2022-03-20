<template>
  <footer
    class="
      h-16
      relative
      w-full
      border-t
      z-20
      bg-white
      text-gray-700
      dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300
    "
  >
    <div
      class="
        h-full
        w-full
        container
        mx-auto
        px-4
        lg:px-8
        flex
        items-center
        text-center
        justify-evenly
        text-xs
        md:text-base
      "
    >
      <div class="hidden sm:flex mx-2">
        <a
          href="https://nuxtjs.org"
          target="_blank"
          rel="noopener"
          aria-label="Built With Nuxt"
        >
          <BuiltWithNuxtLight class="h-4 light-img" />
          <BuiltWithNuxtDark class="h-4 dark-img" />
        </a>
      </div>
      <div class="flex px-2">{{ $config.title }} © {{ currentYear }}</div>
      <div class="flex">
        Made with ❤️ by &nbsp;
        <a
          href="https://github.com/sanguinary-bus"
          class="text-blue-700 dark:text-blue-300"
        >
          sanguinary-bus
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  computed: {
    currentYear() {
      const today = new Date()
      return today.getFullYear()
    },
  },
}
</script>

<style>
</style>
