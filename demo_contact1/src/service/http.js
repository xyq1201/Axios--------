
// 引入axios
import axios from 'axios'
// 将创建好的CONTACT_API引入
import service from './ContactApi'
// 引入vant组件
import {Toast} from 'vant'

//对 service 循环遍历，输出不同的请求方法

// 创建axios实例
let instance = axios.create({
    baseURL:'http://localhost:9000/api',
    timeout:1000
})
// 创建一个对象，用来包裹请求方法的容器
const Http = {}

// 对service循环遍历
// key-代表deleteContact，editContact，newContactForm，getContactList
//1. 请求格式/参数的统一
for(let key in service){
    // 声明一个api，用来放value(其内有url+method)
    let api = service[key]
   
    // axios.get().then(res=>{
    //     axios.get().then(res=>{
    //         // 回调地狱
    //     })
    // }).catch(err=>{

    // })

     // 方法async function--作用：避免进入回调地狱
    Http[key] = async function(
        // 声明async请求--首先需要有参数（根据项目进行封装参数）
        params,//请求参数，get,delete请求中放在url中；
        // put,post,patch请求中对应的参数为data

        // isFormData--标识是否为form-data请求
        isFormData = false,
        // 配置参数
        config = {}
    ){
        // 声明一个新的空的params--当请求数据的格式不为form-data时，newParams = params
        let newParams = {}

        // content-type是否是form-data的判断,
        if(params && isFormData){
            // 是，则对其进行格式转换
            // 创建一个form-data格式的对象
            newParams = new FormData()
            // 遍历params
            for(let i in params){
                newParams.append(i,params[key])
            }
        }else{
            // 若不是form-data格式
            newParams = params
        }

        // 开始请求（不同请求的判断）
        // 声明一个变量，存放请求的返回值
        let response = {}
        // put,post,patch三种请求方法相同
        if(api.method === 'put' || 
        api.method === 'post'||
        api.method === 'patch' ){
            try{
                // 三个参数
                response = await instance[api.method](api.url,newParams,config)
            }catch(err){
                // 请求错误
                response = err
            } 
        }else if(api.method === 'delete' || api.method === 'get'){
            // ???不太理解
            config.params = newParams
            try{
                // 注意：delete只有两个参数
                response = await instance[api.method](api.url,config)
            }catch(err){
                // 请求错误
                response = err
            } 
        }

        // 返回响应值
        return response

        // 声明res
        //let res = null
        // try{//避免进入回调地狱
        //     //res 拿到的为axios.get().then(res)中的内容
        //      res = await axios.get('url')
        // }catch(err){//用来捕捉.catch中的错误内容
        //     // 请求失败
        //     res = err
        // }

        // await --后跟一个异步函数
        // await axios.get('url')
    }
}

    // 2.拦截器的添加
    // 请求拦截器
    instance.interceptors.request.use(config=>{
        // 发起请求前做些什么
        Toast.loading({
            // 参数：mask阴影
            mask:false,
            // 一直存在
            duration:0,
            // 是否禁止点击
            forbidClick:true,
            // 信息
            message:'加载中...'
        })
        return config
    },()=>{
        // 请求错误
        // 清除弹窗
        Toast.clear()
        Toast('请求错误，请稍后重试')
    })
    
    // 响应拦截器
    instance.interceptors.response.use(res=>{
        // 请求成功
        Toast.clear()
        return res.data
    },()=>{
        // 失败
        Toast.clear()
        Toast('请求错误，请稍后重试')
    })

// 将Http(对象，包含请求方法)导出
export default Http

