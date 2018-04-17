module.exports = {
    /*
  ** 页面Header
  */
    head: {
        title: 'vue2-nuxt-start-cnode hackernews',
        meta: [
            {
              property: "og:image",
              content: "https://user-images.githubusercontent.com/904724/26879447-689b56a8-4b91-11e7-968f-5eea1d6c71b4.png"
            }, {
              property: "twitter:card",
              content: "summary_large_image"
            }, {
              property: "twitter:site",
              content: "@nuxt_js"
            },
            {
                charset: 'utf-8'
            }, {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            }, {
                hid: 'description',
                name: 'description',
                content: 'Nuxt.js project'
            }
        ],
        link: [
            {
                rel: 'icon',
                type: 'image/x-icon',
                href: '/favicon.ico'
            }
        ]
    },
    /*
  ** 自定义进度栏颜色
  */
    loading: {
        color: '#59cc93'
    },
    manifest : {
      name: "Nuxt Hacker News",
      description: "HackerNews clone built with Nuxt.js",
      theme_color: "#188269"
    },
    /**
     * 模块
     */
    modules:[
      "@nuxtjs/component-cache", "@nuxtjs/axios","@nuxtjs/pwa"
    ],
    axios : {
        proxy: true
    },
    proxy : {
        "/api": {
            target: "https://api.hnpwa.com/v0/",
            pathRewrite: {"^/api/": ""}
        }
    },
    plugins : ["~/plugins/filters"],
    /*
  ** 构建配置
  */
    build: {
        /*
    ** 保存时运行 ESLint
    */
        extend(config, {isDev, isClient}) {
            if (isDev && isClient) {
                config.module.rules.push({enforce: 'pre', test: /\.(js|vue)$/, loader: 'eslint-loader', exclude: /(node_modules)/})
            }
        }
    }
}
