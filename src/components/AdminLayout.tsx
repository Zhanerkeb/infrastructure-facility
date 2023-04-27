
import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import CSS from 'csstype';
import { authActions } from '.././features/auth/authSlice';
import type { MenuProps } from 'antd';
import { Button, Layout, Menu, theme } from 'antd';
import { User } from '../models/user';
  
const { Content, Sider } = Layout;
const titleStyle: CSS.Properties = {
    fontWeight: '700',
    fontSize: '24px',
   
}



type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(<NavLink to={'journal'}>Журнал</NavLink>, '1', <img width={20} src='/images/journal.svg'/>),
  getItem(<NavLink to={'new-journal'}>Новая запись</NavLink>, '2', <img width={20} src='/images/new-note.svg'/>),
  getItem(<NavLink to={'scheme'}>Cхема</NavLink>, '3',  <img width={20} src='/images/map.svg'/>),
];

export const AdminLayout = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const [selectedKey, setSelectedKey] = useState<string>()
    const paths = [
        {name: '/dashboard/journal', key: '1'}, 
        {name: '/dashboard/new-journal', key: '2'}, 
        {name: '/dashboard/scheme', key: '3'}
    ]
    const user: any = localStorage.getItem('user')
    const parsedUser: User = JSON.parse(user)
   
    useEffect(() => {
      const item = paths.filter(item => window.location.pathname.includes(item.name))[0]
      setSelectedKey(item ? item.key : '1')
    }, [window.location.pathname])

    const {
      token: { colorTextSecondary },
    } = theme.useToken();

    const logout = () => {
        dispatch(
            authActions.logout()
        );
        navigate('/')
    }
  return (
    <div>
        <Layout style={{ minHeight: '100vh' }}>
            <Sider style={{backgroundColor: '#fff'}}>
                <div style={{ margin: 16, padding: 16}}>
                   <p style={titleStyle}> ТОО  “ILC”</p>
                   <div style={{textAlign: 'center', marginTop: '10px'}}>
                        <img src='/images/user.svg'/>
                        <p>{parsedUser.full_name ? parsedUser.full_name : ''}</p>
                        <p style={{color: colorTextSecondary}}>{parsedUser.position ? parsedUser.position : ''}</p>
                   </div>
                </div>
              
                <Menu selectedKeys={[selectedKey ? selectedKey.toString() : '9']} mode="inline" items={items} />
                <Button type='ghost' style={{position: 'absolute', bottom: 0, margin: 16, display: 'flex', alignItems: 'center'}} onClick={logout}>
                    <img src='/images/exit.svg'/>
                    <span style={{marginLeft: '10px'}}>Выйти</span>
                </Button>
            </Sider>
            <Layout className="site-layout">
                <Content style={{ margin: '40px 16px', }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    </div>
  )
}