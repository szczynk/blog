export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  router: {
    base: '/blog/',
  },

  render: {
    static: {
      // set maxAge to 97 days in milliseconds
      maxAge: 1000 * 60 * 60 * 24 * 97,
    },
  },

  generate: {
    fallback: '404.html',
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Szczynk Blog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'My personal blog about anything that i need to talk.',
      },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'google', content: 'nositelinkssearchbox' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'author', href: '/humans.txt' },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/css/main.css'],

  // Progress bar: https://nuxtjs.org/docs/2.x/features/loading/
  loading: {
    color: 'gray',
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: '~/plugins/vue-lazyload', ssr: false }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // https://color-mode.nuxtjs.org
    '@nuxtjs/color-mode',
    // https://github.com/nuxt-community/moment-module
    '@nuxtjs/moment',
    // https://marquez.co/docs/nuxt-optimized-images/
    '@aceforth/nuxt-optimized-images',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    // https://github.com/frenchrabbit/nuxt-precompress
    'nuxt-precompress',
    // https://sitemap.nuxtjs.org/
    '@nuxtjs/sitemap',
  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      name: 'Szcznyk Blog',
      short_name: 'Szcznyk Blog',
      background_color: '#ffffff',
    },
    meta: {
      name: 'Szcznyk Blog',
      theme_color: '#115173',
    },
  },

  // Sitemap module configuration: https://sitemap.nuxtjs.org/guide/configuration
  sitemap: {
    hostname: 'https://szczynk.github.io',
    routes: async () => {
      const { $content } = require('@nuxt/content')

      const blogs = await $content().fetch()

      // Setup an empty array we will push to.
      const routes = []

      blogs.forEach((blog) =>
        routes.push({
          url: blog.path,
          priority: 0.6,
          lastmod: blog.updatedAt,
        })
      )

      // return all routes
      return routes
    },
    cache: true,
    gzip: true,
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {
    markdown: {
      prism: {
        theme: 'prismjs/themes/prism-okaidia.css',
      },
    },
  },

  // Color Mode module configuration
  colorMode: {
    classSuffix: '',
  },

  // @nuxtjs/moment module options
  moment: {
    defaultTimezone: 'Asia/Jakarta',
  },

  // nuxt optimized images module configuration
  optimizedImages: {
    optimizeImages: true,
    mozjpeg: {
      quality: 80,
    },
    pngquant: {
      speed: 7,
      quality: [0.65, 0.8],
    },
  },

  // Default options of nuxt-precompress, override if needed
  nuxtPrecompress: {
    enabled: true, // Enable in production
    report: true, // set true to turn one console messages during module init
    test: /\.(js|css|html|txt|xml|svg)$/, // files to compress on build
    // Serving options
    middleware: {
      // You can disable middleware if you serve static files using nginx...
      enabled: false,
    },

    // build time compression settings
    gzip: {
      // should compress to gzip?
      enabled: true,
    },
    brotli: {
      // should compress to brotli?
      enabled: true,
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
