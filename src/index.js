// 入口文件
import React from 'react'
import ReactDom from 'react-dom'
// 注意引入细节：引入第三方模块不需要./
// 引入自定义模块需要./
import App from './App'
import memoryUtils from './utils/memoryUtils'
import storageUtils from './utils/storageUtils'
//读取local中保存user,保存到内存中
const user =storageUtils.getUser();
memoryUtils.user=user;
// 将App组件标签渲染到index页面的div上
ReactDom.render(<App />,document.getElementById('root'))
