export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Plant Power',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/firebase',    
  ],
  // firebase FCM starts here

  firebase: {
    lazy: false,
    config: {
      apiKey: "AIzaSyAOwX71ihpi5p4W4yxUy6zzJN9sdZAsGqI",
      authDomain: "plant-power-834e3.firebaseapp.com",
      projectId: "plant-power-834e3",
      storageBucket: "plant-power-834e3.appspot.com",
      messagingSenderId: "246926058220",
      appId: "1:246926058220:web:86829f2317725b009c7bc9",
      measurementId: "G-PTVC5BYXEL"
    },
    onFirebaseHosting: false,
    services: {
      messaging: true,
    }
  },

  messaging: {
    createServiceWorker: true,
    actions: [
      {
        action: 'goHome',
        url: 'https://localhost:3000'
      }
    ],
    fcmPublicVapidKey: 'BI1DOD70puOr8fKDP-zk9rgmcDupnX6cU1qXVQcbyla27O8TMqCHbtDIQKc1vTm7r8-eAPHVJvrveP7I8QiBges' 
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      name: 'Plant Power',
      lang: 'en',
      useWebmanifestExtension: false
    },
    icon: {
      /* icon options */
      iconFileName: 'icon.png'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
