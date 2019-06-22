import React,{Component} from 'react'
import memoryUtils from'../../utils/memoryUtils.js';
import {Redirect,Route,Switch} from 'react-router-dom'
import LeftNav from '../../components/left-nav/left-nav.jsx'
import Header from '../../components/header/header.jsx'
import { Layout } from 'antd';
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'
import Role from '../role/role'
import User from '../user/user'

const { Footer, Sider, Content } = Layout;
//后台管理的路由组件
export default class Admin extends Component{
    render(){
        const user=memoryUtils.user
        //如果内存没有存储user==》当前没有登录
        if(!user||!user._id){
            //自动跳转到登录(zai render()中)
            return <Redirect to='/login'/>
        }
        return (
                <Layout style={{height:'100%'}}>
                    <Sider><LeftNav/></Sider>
                    <Layout>
                    <Header>Header</Header>
                    <Content style={{margin:'20px', backgroundColor:'white'}}>
                    <Switch>
                        <Redirect from='/' exact to='/home'/>
                        <Route path='/home' component={Home}/>
                        <Route path='/category' component={Category}/>
                        <Route path='/product' component={Product}/>
                        <Route path='/user' component={User}/>
                        <Route path='/role' component={Role}/>
                        <Route path="/charts/bar" component={Bar}/>
                        <Route path="/charts/pie" component={Pie}/>
                        <Route path="/charts/line" component={Line}/>
                    </Switch>
                    </Content>
                    <Footer style={{
                        textAlign:'center',
                        color:"#ccc"
                    }}>
                    推荐使用谷歌浏览器，可以获得最佳页面操作体验
                    </Footer>
                    </Layout>
                </Layout>
        )
    }
}