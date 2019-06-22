import React,{Component} from 'react'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Login from './pages/login/login.jsx'
import Admin from './pages/admin/admin.jsx'
import './App.less'
// 应用的根组件

class App extends Component{
   render(){
     return (
     <BrowserRouter>
     <Switch>   {/* 只匹配其中一个 */}
     <Route path='/login' component={Login}></Route>
     <Route path='/' component={Admin}></Route>
     </Switch>
     </BrowserRouter>
    )
  }
}
export default App