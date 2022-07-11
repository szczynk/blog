<template>
  <div
    ref="giscusComments"
    class="comments-container px-4 md:mx-8 md:p-8 lg:mx-16 lg:p-16"
  ></div>
</template>
<script>
export default {
  props: {
    src: { type: String, default: 'https://giscus.app/client.js' },
    repo: { type: String, default: '' },
    repoId: { type: String, default: '' },
    category: { type: String, default: '' },
    categoryId: { type: String, default: '' },
    mapping: { type: String, default: '' },
    reactionsEnabled: { type: String, default: '' },
    emitMetadata: { type: String, default: '' },
    inputPosition: { type: String, default: '' },
    theme: { type: String, default: '' },
    lang: { type: String, default: '' },
    loading: { type: String, default: 'lazy' },
  },
  mounted() {
    const externalScript = document.createElement('script')
    this.setAttributes(externalScript, {
      src: this.src,
      'data-repo': this.repo,
      'data-repo-id': this.repoId,
      'data-category': this.category,
      'data-category-id': this.categoryId,
      'data-mapping': this.mapping,
      'data-reactions-enabled': this.reactionsEnabled,
      'data-emit-metadata': this.emitMetadata,
      'data-input-position': this.inputPosition,
      'data-theme': localStorage.getItem('nuxt-color-mode'),
      'data-lang': this.lang,
      'data-loading': this.loading,
      crossorigin: 'anonymous',
      async: true,
    })
    this.$refs.giscusComments.appendChild(externalScript)
  },
  methods: {
    setAttributes(el, attrs) {
      Object.keys(attrs).forEach((key) => el.setAttribute(key, attrs[key]))
    },
  },
}
</script>
