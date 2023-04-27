import React, { useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import CSS from 'csstype';
import { authActions } from '../authSlice';
import { useNavigate } from 'react-router-dom';


const style: CSS.Properties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh'
}

const titleStyle: CSS.Properties= {
    fontSize: '24px',
    textTransform: 'uppercase',
    fontWeight: '600'
}

const Login = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate()

    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/dashboard/journal')
        }
    }, [isLoggedIn])

    const onFinish = (values: any) => {
        console.log('Success:', values);
        dispatch(
            authActions.login({
                login: values.login,
                password: values.password,
            })
            );
    };
      
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };


  return (
    <div className='container'>
        <div style={style}>
            <p style={titleStyle}>Авторизация работника</p>
            <Form
            layout={'vertical'}
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            style={{ maxWidth: 800, width: 300}}
            >
            <Form.Item  
                label="Логин"
                name="login"
                rules={[{ required: true, message: 'Пожалуйста, напишите логин!' }]}>
                <Input/>
            </Form.Item>
            <Form.Item
                label="Пароль"
                name="password"
                rules={[{ required: true, message: 'Пожалуйста, напишите пароль!' }]}
                >
                <Input.Password/>
            </Form.Item>
            <Form.Item className="login-form-button">
                <Button style={{width: '120px'}} type="primary" htmlType="submit">Войти</Button>
            </Form.Item>
            </Form>
        </div>  
    </div> 
  );
}

export default Login