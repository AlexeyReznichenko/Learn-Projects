const pkg = require('./package')
const bodyParser = require('body-parser')
const axios = require('axios')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: 'Blog Page',
    // title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: "https://fonts.googleapis.com/css?family=Open+Sans" }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  // loading: { color: '#3B8070' },
  loading: false,

  /*
  ** Global CSS
  */
  css: [
    '~/assets/styles/main.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/core-components.js',
    '~/plugins/date-filter.js',
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios'
  ],

  axios: {
    baseURL: process.env.BASE_URL || 'https://nuxtproject-5917e-default-rtdb.firebaseio.com',
    credentials: false,
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {

    }
  },

  env: {
    fbAPIKey: 'AIzaSyD2CtrgxeYdukK9xITN3xZ19ENhA1YDCRo'
  },

  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        path: '*',
        component: resolve(__dirname, 'pages/index.vue')
      })
    },
    linkActiveClass: 'active'
  },

  // pageTransition: {
  //   name: 'fade',
  //   mode: 'out-in'
  // }
  // axios.get('https://nuxtproject-5917e-default-rtdb.firebaseio.com/posts.json')

  serverMiddleware: [bodyParser.json(), "~/api"],
  generate: {
    routes: function() {
      return axios
        .get("https://nuxtproject-5917e-default-rtdb.firebaseio.com/posts.json")
        .then(res => {
          const routes = [];
          for (const key in res.data) {
            routes.push({
              route: "/posts/" + key,
              payload: {postData: res.data[key]}
            });
          }
          return routes;
        });
    }
  }
}