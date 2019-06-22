import React,{Component} from 'react'
import './header.less'
import {formateDate} from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import {reqWeather} from '../../api'
import {withRouter} from 'react-router-dom'
import menuList from '../../config/menuConfig'
import { Modal} from 'antd';
import LinkButton from '../link-button/link-button'
const { confirm } = Modal;
class Header extends Component{
    state={
        currentTime:formateDate(Date.now()),//当前时间字符串
        ayPictureUrl:'', // 天气图片url
        weather:'', // 天气的文本
    }
    getTime=()=>{
        //每隔一秒获取当前时间，并更新数据
        this.timer=setInterval(()=>{
            const currentTime=formateDate(Date.now())
            this.setState({
                currentTime
            })
        },1000)
    }

    getWeather=async()=>{
        // 调用接口请求异步获取数据
        const{dayPictureUrl,weather}=await reqWeather('广州')
        this.setState({
            dayPictureUrl,weather
        })
    }
    //在第一次render之后执行，一般在此执行异步操作：发ajax请求。启动定时器
    getTitle=()=>{
        // 获取当前的pathname
    const path=this.props.location.pathname;
    let title;
    menuList.forEach((item)=>{
        // 遍历数据,要做两次遍历
        if(item.key===path){
            title=item.title
        }else if(item.children){
            const cItem=item.children.find(cItem => path.indexOf(cItem.key)===0)
            // 判断子元素有没有，有的话就找到子元素的title
            //如果有值才说明有匹配的
            if(cItem){
                title=cItem.title
            }
        }
    })
    return title
    // console.log(pathnanme);
    }
    //退出登录
    //显示确认框
    logout=()=>{
        confirm({
            content: '确定要退出了吗？',
            okText: '残忍离开',
            okType: 'danger',
            cancelText: '算了，留下吧',
            onOk:()=>{
            //删除保存的user数据
                storageUtils.removeUser()
                memoryUtils.user={}
                // 先删掉数据再过去
                // 跳转到login
                this.props.history.replace('./login')
            }
        });
    }
    
    componentDidMount(){
        //时间更新
        this.getTime()
        //获取当前天气显示
        this.getWeather()
    }
    //在当前组件卸载之前调用
    componentWillUnmount(){
        // 清除定时器
        clearInterval(this.timer);
    }
    render(){
        const {currentTime,dayPictureUrl,weather}=this.state;
        const username=memoryUtils.user.username;
        const title=this.getTitle();
        return (
            <div className="header">
            <div className='header-top'>
            <span>
                欢迎，{username}
            </span>
            <LinkButton onClick={this.logout}>退出</LinkButton>
            </div>
            <div className='header-bottom'>
            <div className='header-bottom-left'>{title}</div>
            <div className='header-bottom-right'>
            <span>{currentTime}</span>
            <img src={dayPictureUrl} alt=""/>
            <span>{weather}</span>
            </div>
            </div>
            </div>
        )
    }

}

export default withRouter(Header)