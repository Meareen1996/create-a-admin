//能发送异步ajax请求的函数模块
//函数的返回值是一个Promise对象

// 优化ajax请求：统一处理请求异常
// 解决方案：在外层包一个自己创建的promise对象
// 在请求出错时，不执行reject(),二是出现错误提示
import axios from 'axios'
import {
    message
} from 'antd'

export default function ajax(url, data = {}, type = 'GET') {
    return new Promise((resolve, reject) => {
        // 1.执行异步ajax请求 
        // 2.如果成功了，调用reject(value)
        // 3.如果失败了，不调用reject(reject),而是提示异常信息
        let promise;
        if (type === 'GET') { //发送GET请求
            promise = axios.get(url, {
                params: data
            })
        } else { //发送POST请求
            promise = axios.post(url, data)
        }
        promise.then(response => {
            resolve(response.data)
        }).catch(error => {
            message.error('请求出错了：' + error.message)
        })
    })

}