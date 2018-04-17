/**
 * [lazy description]
 * @param  {[Function]} commit     [提交mutations]
 * @param  {[Promise]} task       [一个请求任务返回Promise]
 * @param  {[Array]} optimistic [返回Items]
 * @param  {[Boolean]} enabled    [是否延迟]
 * @return {[type]}            [异步返回结果]
 */
export const lazy = (commit,task,optimistic,enabled) => {

  // console.log("utils=====================>",commit,"||",task,"||",optimistic)
  //默认情况下，仅在客户端执行延迟操作。process下找不到client但是结果却是true,有Browser属性
  if(enabled === undefined){
    enabled = process.client
  }

  //非懒惰模式
  if(!enabled){
    return task().then(commit)
  }

  //在后台做真正的任务，进行数据请求
  Promise.resolve(task(optimistic))
    .then(commit)
    .catch(console.error)

  // 提交 optimistic值并resolve
  return Promise.resolve(commit(optimistic))
}
