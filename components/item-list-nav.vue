<style lang="stylus">
.news-list-nav, .news-list {
  background-color: #fff;
  border-radius: 2px;
}
.news-list-nav {
  padding: 15px 30px;
  text-align: center;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

  a {margin: 0 1em;}

  .disabled {opacity: 0.8;}
}
</style>
<template>
  <div class="news-list-nav">
    <router-link v-if="page > 1" :to="`/${feed}/${page - 1}`">&lt; 上一页</router-link>
    <a v-else class="disabled">&lt; 上一页</a>

    &nbsp;<span>{{ page }}/{{ maxPage }}</span>

    <router-link v-if="hasMore" :to="`/${feed}/${page + 1}`"> 下一页 &gt;</router-link>
    <a v-else class="disabled">下一页 &gt;</a>
  </div>
</template>

<script>
export default {
  props:{
    feed: {
      type: String,
      required: true
    },
    page: {
      type: Number,
      required: true
    },
    maxPage: {
      type: Number,
      required: true
    }
  },
  computed:{
    hasMore(){
      return this.page < this.maxPage
    }
  }
}
</script>
