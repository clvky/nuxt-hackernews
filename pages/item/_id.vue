<style lang="stylus">
.item-view-header {background-color: #fff;padding: 1.8em 2em 1em;box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  h1 {display: inline;font-size: 1.5em;margin: 0;margin-right: 0.5em;}
  .host, .meta, .meta a {color: #595959;}
  .meta a {text-decoration: underline;}
}

.item-view-comments {background-color: #fff;margin-top: 10px;padding: 0 2em 0.5em;}

.item-view-comments-header {margin: 0;font-size: 1.1em;padding: 1em 0;position: relative;
  .spinner {display: inline-block;margin: -15px 0;}
}

.comment-children {list-style-type: none;padding: 0;margin: 0;}

@media (max-width: 600px) {
  .item-view-header {
    h1 {font-size: 1.25em;}
  }
}
</style>
<template>
  <div class="item-view view">
    <div class="item-view-header">
      <a :href="item.url" target="_blank">
        <h1 v-html="item.title" />
      </a>
      <span v-if="item.url" class="host">
        ({{ item.url | host }})
      </span>
      <p class="meta">
        {{ item.points }} points | by
        <router-link :to="'/user/' + item.user">{{ item.user }}</router-link>
        {{ item.time | timeAgo }} ago
      </p>
    </div>
    <div class="item-view-comments">
      <lazy-wrapper :loading="item.loading">
        <p class="item-view-comments-header">
          {{ item.comments ? item.comments.length + ' 条评论' : '暂时没有评论' }}
        </p>
        <ul class="comment-children">
          <comment v-for="comment in item.comments" :key="comment.id" :comment="comment"/>
        </ul>
      </lazy-wrapper>
    </div>
  </div>
</template>

<script>
import Comment from "~/components/comment.vue";
import LazyWrapper from "~/components/lazy-wrapper"
export default {
  name:"ItemView",
  components:{LazyWrapper,Comment},

  //使用 head 方法设置当前页面的头部标签。
  head() {
    // console.log("_id=========>",this.$route)
    return {
      title:this.item.title
    }
  },

  //fetch 方法用于在渲染页面前填充应用的状态树（store）数据， 与 asyncData 方法类似，不同的是它不会设置组件的数据。
  fetch({ store, params: { id } }){
    // console.log("fetch _id---------->",id,store)
    return store.dispatch("FETCH_ITEM", { id })
  },

  computed:{
    id() {
      return this.$route.params.id
    },
    item() {
      return this.$store.state.items[this.id]
    }
  }
}
</script>
