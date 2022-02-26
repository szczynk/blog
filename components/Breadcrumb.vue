<template>
  <div class="pt-40 pb-40">
    <div class="container">
      <div class="row">
        <div class="col-12" data-aos="fade-up" data-aos-delay="300">
          <div class="text-center">
            <!-- Bread Title Start -->
            <div class="bread-title">
              <h1
                class="
                  text-7xl
                  pb-2
                  [text-shadow:0.25rem_0.25rem_0.25rem_rgba(0,0,0,0.5)]
                  dark:[text-shadow:0.25rem_0.25rem_0.25rem_rgba(255,255,255,0.5)]
                "
              >
                {{ title }}
              </h1>
            </div>
            <!-- Bread Title End -->
            <ol class="flex p-0 m-0 rounded list-reset justify-center">
              <li>
                <a href="/" target="_self" class="nuxt-link-active font-bold">
                  Home
                </a>
              </li>
              <li><span class="text-gray-500 mx-2">/</span></li>
              <li>
                <span>Blog</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, default: '' },
  },
}
</script>

<style>
</style>
