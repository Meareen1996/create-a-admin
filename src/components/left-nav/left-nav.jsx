import React,{Component} from 'react'
import './left-nav.less'
import logo from '../../assets/img/1.jpg'
import {Link,withRouter} from 'react-router-dom'
import { Menu, Icon } from 'antd';
import menuList from '../../config/menuConfig'

const { SubMenu } = Menu;
// 左侧导航的组件
class LeftNav extends Component{
  // 根据menu的数据数组生成对应的标签数组
  //使用map加递归调用
  getMenuNodes=(menuList)=>{
     //查找一个与当前路径匹配的子item
     const path =this.props.location.pathname
      return menuList.reduce((pre,item)=>{
      if(!item.children){
        pre.push((
              <Menu.Item key={item.key}>
                <Link to={item.key}>
                <Icon type={item.icon} />
                  <span>{item.title}</span>
                </Link>
              </Menu.Item>
        ))
            
      }else{
       
        const cItem=item.children.find(cItem=>cItem.key===path)
        // 如果存在，当前item的子列表需要展开
        if(cItem){
          this.openKey=item.key
        } 
          pre.push((
      <SubMenu
          key={item.key}
          title={
            <span>
            <Icon type={item.icon} />
              <span>{item.title}</span>
            </span>
          }
        >
        {/* 递归调用 */}
        {this.getMenuNodes(item.children)}
        </SubMenu>
          ))
      }
      return pre;
      },[])
  }
// 为第一次render()准备数据
  componentWillMount(){
    this.menuNodes=this.getMenuNodes(menuList)
  }
render(){
  //得到当前请求的路由路径
  const path =this.props.location.pathname
const openKey=this.openKey
    return (
        <div>
        <div className="left-nav">
        <Link to='/' key='1' className="left-nav-header">
            <img src={logo} alt=''/>
            <h1>我的后台</h1>
        </Link>
        </div>
        <Menu
          defaultSelectedKeys={[path]}
          mode="inline"
          defaultOpenKeys={[openKey]}
        >
        {this.menuNodes}
        </Menu>
        
        </div>
    )
        }

}
// withRouter 高阶组件：
// 包装非路由组件，返回一个新的组件
// 新的组件向非路由组件传递3个属性  history/
export default withRouter(LeftNav)