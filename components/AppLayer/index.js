import React, { useState } from 'react';
const { Header, Content, Footer, Sider } = Layout;
import PropTypes from 'prop-types';
import Link from 'next/link'
import Router from 'next/router'
import { useSelector } from 'react-redux'
import * as ROUTES from '../../constants/routes';
import { Layout, Menu, Icon } from 'antd';
import UserCard from '../UserCard'
import LoadingSpinner from '../Spinner';

const AppLayer = ({ children }) => {
  const userStorage = useSelector(state => (state.User));
  const [isLoading , setIsLoading] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  //라우팅될 때의 이벤트
  Router.events.on('routeChangeStart', url => {
    setIsLoading(true);
  })
  Router.events.on('routeChangeComplete', () => {
    setIsLoading(false);
  })
  Router.events.on('routeChangeError', () => {
    setIsLoading(false);
  })

  const toggle = (e) => {
    setCollapsed(!collapsed)
  }

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          id="MyMenu"
        >
          <Icon
            className="trigger"
            type={collapsed ? "menu-unfold" : "menu-fold"}
            onClick={toggle}
            style={{paddingRight:"20px" ,fontSize: '20px'}}
          />
          <Menu.Item key="1"><Link href="/">trimm</Link></Menu.Item>
        </Menu>
      </Header>
      <Layout>
        {userStorage.auth ? SiderAuth(collapsed) : SiderNonAuth() }
        <Layout id="MyLayout">
          <Content id="MyContent">
            <div id="Children">
              {(isLoading && userStorage.auth) ? <LoadingSpinner isLoaded={true} /> : children}
            </div>
          </Content>
        </Layout>
      </Layout>
      <Footer id="MyFooter">Trimm ©2018 Created by Ratio from South Korea</Footer>
      <style jsx="true">{style}</style>
    </Layout>
  )
};

const SiderAuth = (collapsed) => {
  return (
    <Sider id="MySider" trigger={null} collapsible collapsed={collapsed}>
      <UserCard collapse={collapsed}/>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" >
          <Icon type="home" />
          <span>Home</span>
          <Link href={ROUTES.LANDING}><a><span className="nav-text"></span></a></Link>
        </Menu.Item>
        <Menu.Item key="2" >
          <Icon type="cloud-upload" />
          <span>Strava Upload</span>
          <Link href="/uploadtoStrava"><a><span className="nav-upload"></span></a></Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Icon type="carry-out" />
          <span>Plan Route</span>
          <Link href={ROUTES.ROUTE_PLANNING_PAGE}><a><span className="nav-upload"></span></a></Link>
        </Menu.Item>
      </Menu>
      <style jsx="true">{style}</style>
    </Sider>
  )
}

const SiderNonAuth = () => {
  return (
    <Sider id="MySider">
      <UserCard />
      <style jsx="true">{style}</style>
    </Sider>
  )
}

const style = `
#MyMenu{
  line-height: 64px;
}
#MyFooter{
  text-align: center;
}
#Children{
  overflow: auto;
  height:100%;
  padding: 0px;
  background: #fff;
  text-align: center;
}
#MyContent {
  margin: 0px 0px 0;
  overflow: inherit;
}
#MyLayout {
  overflow: hidden;
  margin-left: 0;
  height : auto;
  width : 100%;
}
#MySider {
  min-height:100%;
  overflow: auto;
  left: 0;
}
#UserCard {
  width: 200;
  margin-bottom: 40;
  margin-top: 40;
  background-color: rgba(255, 255, 255, 0.0);
  border: 0;
}
#SignInButton {
  background-color: rgba(255, 255, 255, 0.0);
  border: 0;
  margin-left: 10;
  font-size: 20;
  color: #08c;
}
#Meta {
  color: #08c;
  marginBottom: 10;
}
`

AppLayer.propTypes = {
  children: PropTypes.object
};

export default AppLayer;
