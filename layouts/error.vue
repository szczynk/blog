<template>
  <div
    class="
      flex
      h-screen
      items-center
      justify-center
      bg-white
      text-gray-700
      dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300
    "
  >
    <div class="container">
      <div class="row">
        <div class="col-md-12 text-center">
          <div class="error-image">
            <h1 class="text-6xl pt-8">
              {{ error.statusCode }}
            </h1>
          </div>
          <article class="lg:px-8">
            <h1 class="text-xl mb-8">
              {{ error.message }}
            </h1>
          </article>
          <div class="error-buttons">
            <NuxtLink to="/" class="button">
              <span class="button-text">Go back to homepage</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      required: true,
    },
  },
  head() {
    return {
      title: this.error.message,
    }
  },
}
</script>

<style>
</style>
