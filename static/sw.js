importScripts('/_nuxt/workbox.3de3418b.js')

const workboxSW = new self.WorkboxSW({
  "cacheId": "vue2-nuxt-start",
  "clientsClaim": true,
  "directoryIndex": "/"
})

workboxSW.precache([
  {
    "url": "/_nuxt/app.64493c2a74df5f2d5dc3.js",
    "revision": "234a0eeed626513c3e2a9c5bab592edb"
  },
  {
    "url": "/_nuxt/layouts_default.5d7862abe05eb77202cb.js",
    "revision": "eab2d4aea7c4e59f7e5ffb10381c074e"
  },
  {
    "url": "/_nuxt/manifest.2a8a479a3c39fa44af91.js",
    "revision": "9c190b9470821450e8ed51586df29f37"
  },
  {
    "url": "/_nuxt/pages__feed__page.6253636651a7c4c1268f.js",
    "revision": "e83dd04f2af81689f3a2172841a51c5e"
  },
  {
    "url": "/_nuxt/pages_index.5095e682a49a805cf90c.js",
    "revision": "a897476f0515853209ac89da496c28ea"
  },
  {
    "url": "/_nuxt/pages_item__id.f0695b61d541742da8b2.js",
    "revision": "906b59554e4223ebf8d898f059a2c15a"
  },
  {
    "url": "/_nuxt/pages_user__id.d30807cab7a798134148.js",
    "revision": "cbc5a100e61409e9a4ca83837195c9ad"
  },
  {
    "url": "/_nuxt/vendor.4bfbb2d5b02300f68e33.js",
    "revision": "3f3122c434ec803da4a8298df40afbe1"
  }
])


workboxSW.router.registerRoute(new RegExp('/_nuxt/.*'), workboxSW.strategies.cacheFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('/.*'), workboxSW.strategies.networkFirst({}), 'GET')

