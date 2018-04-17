import Vue from "vue";

import { validFeeds } from  "~/common/api"
import { lazy } from "~/common/utils"

import { CancelToken } from "axios"
import { serverUrl } from "~/service/config"

export default {
  state: () => {
    const state = {
      items: {
        /* [id: number]: Item */
      },
      users: {
        /* [id: string]: User */
      },
      feeds: {
        /* [page: number] : [ [id: number] ] */
        /*"news":[
          1:[...ids]
        ]*/
      }
    }
    validFeeds.forEach(feed => {
      state.feeds[feed] = {}
    });
    console.log(state ,"state")
    return state
  },

  actions:{
    //获取feed
    FETCH_FEED({ commit,state },{feed,page,prefetch}){
      console.log("store===================>$$$feed,page,prefetch@@",state,feed,page,prefetch);
      //不要优先考虑已获取的提要
      if(state.feeds[feed][page] && state.feeds[feed][page].length){
        prefetch = true
      }

      //预取
      if(!prefetch){
        if (this.feedCancelSource) {
          this.feedCancelSource.cancel("priorotize feed: " + feed + " page: " + page);
        }
        this.feedCancelSource = CancelToken.source();
      }

      //(commit,task,optimistic,enabled)
      return lazy(
        items => {
          const ids = items.map(item => item.id)
          //设置值为Ids
          commit("SET_FEED", { feed, ids, page })
          //设置值为items
          commit("SET_ITEMS", { items })
        },
        () =>
          //您可以使用取消令牌取消请求。
          this.$axios.$get(serverUrl + `/${feed}/${page}.json`, {
            cancelToken: this.feedCancelSource && this.feedCancelSource.token
          }),
        //返回items
        (state.feeds[feed][page] || []).map(id => state.items[id])
      )
    },

    //获取Items
    FETCH_ITEM({ commit, state }, { id }) {
      //(commit,task,optimistic,enabled)
      return lazy(
        item => commit("SET_ITEM", { item }),
        () => this.$axios.$get(serverUrl + `/item/${id}.json`),
        Object.assign({ id, loading: true, comments: [] }, state.items[id])
      )
    },

    FETCH_USER({ state, commit }, { id }) {
      console.log(state, commit,id);
      return lazy(
        user => commit("SET_USER", { id, user }),
        () => this.$axios.$get(serverUrl + `/user/${id}.json`),
        Object.assign({ id, loading: true }, state.users[id])
      )
    }
  },

  mutations:{
    //设置feed
    SET_FEED:(state, {feed, ids, page} ) => {
      Vue.set(state.feeds[feed], page, ids);
      console.log("store================>@@",state,page, ids)
    },

    //设置item
    SET_ITEM:(state, {item }) => {
      if (item) {
        Vue.set(state.items, item.id, item)
      }
    },

    //设置Items
    SET_ITEMS:(state, { items }) => {
      items.forEach( item => {
        if(item){
          Vue.set(state.items, item.id, item);
        }
      })
    },

    //设置user
    SET_USER:(state, { id, user } ) => {
      // false表示用户未找到
      Vue.set(state.users, id, user || false)
    }
  }
}
