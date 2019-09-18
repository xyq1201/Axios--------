# Axios--联系人列表

vue-cli3+axios\
vant（vue组件库\
对axios的应用（get,post,put,delete请求）

axios的封装:\
    1.API（url）进行统一管理（将所有url放在一个js文件内——ContactApi.js）\
    2.对所有请求进行统一的封装（1.请求格式\参数的统一；2.添加请求拦截器和响应拦截器3.最后导出）--http.js\
    3.将http 挂载在vue实例上（全局可访问）\
    4.改造时，async+await
    
封装拓展\
    1.可以给请求添加统一的loading\
    2.在header添加token鉴权(base.vue)\
    3.添加统一错误处理（如：登录超时）

接口下载本地后解压，在axios_node_api-master下cmd\
npm install \
node index.js\
本地服务启动...
