<style lang="stylus">
.news-list {background-color: #fff;border-radius: 2px;}

.news-list {margin: 10px 0;width: 100%;transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
  ul {list-style-type: none;padding: 0;margin: 0;}
}

.slide-left-enter, .slide-right-leave-to {opacity: 0;transform: translate(30px, 0);}
.slide-left-leave-to, .slide-right-enter {opacity: 0;transform: translate(-30px, 0);}
.item-move, .item-enter-active, .item-leave-active {transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);}
.item-enter {opacity: 0;transform: translate(30px, 0);}
.item-leave-active {position: absolute;opacity: 0;transform: translate(30px, 0);}

@media (max-width: 600px) {
  .news-list {margin: 10px 0;}
}
</style>
<template>
  <div class="view">
    <item-list-nav :feed="feed" :page="page" :max-page="maxPage" />

    <lazy-wrapper :loading="loading">
      <transition :name="transition" mode="out-in">
        <div :key="displayedPage" class="news-list">
          <transition-group tag="ul" name="item">
            <item v-for="item in displayedItems" :key="item.id" :item="item" />
          </transition-group>
        </div>
      </transition>
      <item-list-nav :feed="feed" :page="page" :max-page="maxPage" />
    </lazy-wrapper>
  </div>
</template>

<script>
import ItemListNav from "~/components/item-list-nav.vue"
import LazyWrapper from "~/components/lazy-wrapper"
import Item from "~/components/item.vue"

import { feeds, validFeeds } from "~/common/api"
export default {
  components:{
    Item,
    ItemListNav,
    LazyWrapper
  },

  //使用 head 方法设置当前页面的头部标签。
  head() {
    // console.log("============>$$this.$route",this.$route)
    return {
      title: feeds[this.$route.params.feed].title
    }
  },

  //Nuxt.js 可以让你在动态路由对应的页面组件中配置一个校验方法用于校验动态路由参数的有效性。
  validate({params:{feed}} ){
    // console.log("============>$$feed",feed)
    return validFeeds.includes(feed);
  },

  //fetch 方法用于在渲染页面前填充应用的状态树（store）数据， 与 asyncData 方法类似，不同的是它不会设置组件的数据。
  //feed="news" page =1
  fetch({store , params:{feed,page = 1 } }){
    // console.log("============>$$fetch1",store,feed,page);
    return store.dispatch("FETCH_FEED",{feed, page} );
  },

  computed:{
    //话题:news
    feed() {
      return this.$route.params.feed;
    },
    //页数:1
    page() {
      return Number(this.$route.params.page) || 1
    },
    //最大页数
    maxPage() {
      return feeds[this.feed].pages
    },
    //页面数据
    pageData() {
      return this.$store.state.feeds[this.feed][this.page]
    },
    //显示Items
    displayedItems(){
      console.log("_page--------------------->",this.$store.state)
      //返回数组
      return this.pageData.map(id => this.$store.state.items[id]) || []
    },
    //加载中
    loading(){
      return this.displayedItems.length === 0;
    }
  },

  data(){
    return {
      transition: "slide-right",
      displayedPage: Number(this.page) || 1
    }
  },

  mounted(){
    this.pageChanged(this.page);
  },

  methods:{
    pageChanged(to, from = -1) {
      console.log(to, from,"to, from")
      if (to < 0 || to > this.maxPage) {
        this.$router.replace(`/${this.feed}/1`)
        return
      }

      //预取下一页
      this.$store.dispatch("FETCH_FEED", {
          feed: this.feed,
          page: this.page + 1,
          prefetch: true
        })
        .catch((err) => {console.error(err)})

      this.transition = from === -1 ? null : to > from ? "slide-left" : "slide-right"

      this.displayedPage = to
    }
  },

  watch: {
    page: "pageChanged"
  },
}
</script>
