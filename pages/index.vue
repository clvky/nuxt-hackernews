<script>
import { validFeeds } from "~/common/api"
export default {
  //fetch 方法用于在渲染页面前填充应用的状态树（store）数据， 与 asyncData 方法类似，不同的是它不会设置组件的数据。
  fetch({redirect}){
    redirect("/" + validFeeds[0]);
  }
}
</script>
