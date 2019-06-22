import React,{Component} from 'react'
import {Redirect} from 'react-router-dom'
//登录的路由组件(在写样式之前一般会引入一个重置样式的文件)
import './login.less'
import logo from '../../assets/img/2.jpg'
import { Form, Icon, Input, Button,message } from 'antd';
import {reqLogin} from '../../api';
import memoryUtils from'../../utils/memoryUtils.js';
import storageUtils from'../../utils/storageUtils.js';
class Login extends Component{
    handleSubmit=(event)=>{
        //得到form对象
        event.preventDefault(); // 阻止默认事件
      
        this.props.form.validateFields(async(err, values) => {
            if (!err) {
            const {username,password}=values;
            const result=await reqLogin(username,password);

            // 判断是否登录成功
            if(result.status===0){//登陆成功
                message.success("登录成功");
                const user=result.data;
                memoryUtils.user=user; //保存在内存中
                storageUtils.saveUser(user);
                // 跳转到管理界面上(不需要回退到登录)
                this.props.history.replace('/');
            }else{
                message.error(result.msg);
            }
             //快捷键：回退 alt+<
            }else{
                console.log('校验失败')
            }
          });
        // const form=this.props.form
        // 获取表单项的输入数据
        // const values=form.getFieldsValue();
        // console.log(values);
    }
    // 对密码进行自定义验证
    validatePwd=(rule, value, callback)=>{
        console.log('validatePwd()', rule,value)
        if(!value){
            callback('密码不能为空') //验证通过
        }else if(value.length<4){
            callback('密码不能小于4位')
        }else if(value.length>12){
            callback('密码不能大于12位')
        }else if(!/^\w+$/.test(value)){
            callback('请输入数字、字母或者下划线')
        }else{
            callback()
        }
        // callback('xxxx') //验证失败，并指定提示的文本
    }
    render(){
        //如果用户已经登录，跳转到管理页面
        const user=memoryUtils.user
        if(user && user._id){
            return <Redirect to="/"/>
        }

        // 得到具强大功能的form对象
        const form =this.props.form;
        const { getFieldDecorator } = form;
        return (
            <div className="login">
            <header className="login-header">
            <img src={logo} alt='logo'/>
            <h1>React项目:后台管理系统</h1> 
            </header>

            <section className="login-content">
            <h2>用户登录</h2>

            {/* 1.前台表单验证：(1)必须输入 (2)必须大于四位 (3)必须小于12位 (4)必须是数字、英文、下划线组成
            2.收集表单输入数据 */}

            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {
                        getFieldDecorator("username",{
                            //扩展关于配置对象的知识：属性名是一些特定的名称
                            // 使用配置对象及其配置选项来配置组件的最大好处是：
                            // 可以在需要的时候随意添加配置选项，
                            // 而不像一个典型的函数调用那样必须固定参数的个数（除非使用可选参数），
                            // !!!配置选项的顺序是不重要的，!!!
                            // !!!配置选项的数量也是可以变化的!!!
                            initialValue: 'admin',//指定初始值
                            rules: [
                                //声明式验证：直接使用别人定义好的规则进行验证
                                { required: true, whitespace:true, message: "用户名不能为空" },
                                { min:4, message:'用户名不能小于4位' },
                                { max:12, message:'用户名不能大于12位' },
                                { pattern:/^\w+$/, message:'请输入数字、字母或者下划线' }
                            ],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="用户名"/>
                        )
                    }
                </Form.Item>
                <Form.Item>
                    {
                        getFieldDecorator("password",{
                            rules:[
                                {
                                    validator: this.validatePwd
                                }
                            ]
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password" placeholder="密码"/>
                        )
                    }
                    
                </Form.Item>
                <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    登录
                </Button>
                </Form.Item>
            </Form>
            </section>
            </div>
        )
    }
}
// 1.高阶函数:
    // 1).一类特别的函数
            // a.接收函数类型的参数
            // b.返回值是函数
    // 2).常见
            // a.定时器 setTimeout/setInterval
            // b.Promise:Promise(()=>{}) then(value=>{},reason=>{})
            // c.数组遍历相关的方法：forEach/filter()/map()/find()/reduce()
            // d.函数对象的bind()
    // 3).高阶函数更新动态，更具有扩展性
    // 4).Form.create()() /getFieldDecorator()

// 2.高阶组件
    // 1).本质就是一个函数
    // 2).接收一个组件(被包装组件)，返回一个新的组件（包装组件），新组件内部渲染被包装组件
    // 3).包装组件会向被包装组件传入特定属性
    // 4).扩展组件的功能
    // 5).高阶组件也是高阶函数：接收一个组件函数，返回一个新的组件函数

// 包装Form组件生成一个新的组件
// 新组件会向Form组件传递一个强大的
const WrapLogin = Form.create()(Login)
export default WrapLogin


// async 和 await
// 1.作用？
    // 简化promise对象的使用:不用再使用then()来指定成功/失败的回调函数
    // 以同步编码方式实行异步流程
// 2.哪里写await？
    // 在返回promise的表达式左侧写await：不想要promise，想要promise异步执行的成功的value数据
// 3.哪里写async？
    // await 所在函数(最近的)定义的左侧