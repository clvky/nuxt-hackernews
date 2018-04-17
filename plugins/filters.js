import Vue from "vue";

//变复数
function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + "s"
}

export function host(url) {
  const host = url.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
  const parts = host.split(".").slice(-3)
  if (parts[0] === "www") parts.shift()
  return parts.join(".")
}
export function timeAgo(time){
  const between = Date.now() / 1000 - Number(time)
  //3600 = 60*60 = 1小时
  if (between < 3600) {
    return pluralize(~~(between / 60), " minute")
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), " hour")
  } else {
    return pluralize(~~(between / 86400), " day")
  }
}

const filters = {
  host,
  timeAgo
}
export default filters

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
