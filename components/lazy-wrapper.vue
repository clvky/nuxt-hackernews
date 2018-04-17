<script>
import Spinner from "./spinner"
export default {
  //使组件无状态 (没有 data ) 和无实例 (没有 this 上下文)。他们用一个简单的 render 函数返回虚拟节点使他们更容易渲染。
  functional:true,

  props:{
    loading:{
      type: Boolean,
      default: false
    }
  },

  render(h, {props, children}){
    // console.log("++++++++++++++++++lazy-wrapper",props, children)
    return props.loading ?
      h("div",{
        style:{ "text-align": "center" }
      },[
        h(Spinner, { props: { show: true } })
      ]) : children;
  }
}
</script>
