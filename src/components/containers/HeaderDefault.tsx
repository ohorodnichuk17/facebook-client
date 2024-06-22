import React, { useState } from 'react';
import { Button, Input, Layout, Avatar, Tooltip, Dropdown, Menu, Drawer } from 'antd';
import { Link, NavLink } from 'react-router-dom';
import { SearchOutlined, UserOutlined, UserAddOutlined, MenuOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { logout } from '../../store/account/account.slice';
import './HeaderDefault.css';
import logo from '../../assets/authentication/logotype.png';
import home from '../../assets/profile/home.png';
import activeHome from '../../assets/profile/active_home.png';
import friends from '../../assets/profile/friends.png';
import activeFriends from '../../assets/profile/active_friends.png';
import story from '../../assets/profile/story.png';
import activeStory from '../../assets/profile/active_story.png';
import messanger from '../../assets/profile/messanger.png';
import activeMessanger from '../../assets/profile/messanger_active.png';
import glyph from '../../assets/profile/glyph.png';

const { Header } = Layout;

const HeaderDefault = () => {
   const dispatch = useAppDispatch();
   const { isLogin, user } = useAppSelector(state => state.account);
   const [drawerVisible, setDrawerVisible] = useState(false);

   const handleLogout = () => {
      dispatch(logout());
   };

   const menu = (
      <Menu>
         <Menu.Item key="1">
            <NavLink to="/profile">
               Profile
            </NavLink>
         </Menu.Item>
         <Menu.Item key="2">
            <NavLink to="/settings">
               Settings and privacy
            </NavLink>
         </Menu.Item>
         <Menu.Item key="3" onClick={handleLogout}>
            Logout
         </Menu.Item>
      </Menu>
   );

   const showDrawer = () => {
      setDrawerVisible(true);
   };

   const closeDrawer = () => {
      setDrawerVisible(false);
   };

   const drawerMenu = (
      <Menu mode="vertical">
         <Menu.Item key="home" className="burger-menu-item drawer-menu-item">
            <NavLink to="/" activeClassName="active">
               Home
            </NavLink>
         </Menu.Item>
         <Menu.Item key="friends" className="burger-menu-item drawer-menu-item">
            <NavLink to="/friends" activeClassName="active">
               Friends
            </NavLink>
         </Menu.Item>
         <Menu.Item key="story" className="burger-menu-item drawer-menu-item">
            <NavLink to="/story" activeClassName="active">
               Story
            </NavLink>
         </Menu.Item>
         <Menu.Item key="messenger" className="burger-menu-item drawer-menu-item">
            <NavLink to="/messenger" activeClassName="active">
               Messenger
            </NavLink>
         </Menu.Item>
      </Menu>
   );


   return (
      <Header className="custom-header">
         {isLogin ? (
            <>
               <div className="navbar-left">
                  <img src={logo} alt="logo" className="logo" />
                  <Input
                     className="search-bar"
                     placeholder="Search"
                     prefix={<SearchOutlined style={{ color: '#000000' }} />}
                  />
               </div>
               <div className="navbar-center">
                  <Tooltip title="Home">
                     <NavLink to="/" className="nav-icon home-icon-link" activeClassName="active">
                        {({ isActive }) => (
                           <img src={isActive ? activeHome : home} alt="Home" className="nav-icon-img home-icon" />
                        )}
                     </NavLink>
                  </Tooltip>
                  <Tooltip title="Friends">
                     <NavLink to="/friends" className="nav-icon friends-icon-link" activeClassName="active">
                        {({ isActive }) => (
                           <img src={isActive ? activeFriends : friends} alt="Friends" className="nav-icon-img friends-icon" />
                        )}
                     </NavLink>
                  </Tooltip>
                  <Tooltip title="Create New Story">
                     <NavLink to="/story" className="nav-icon group-icon-link" activeClassName="active">
                        {({ isActive }) => (
                           <img src={isActive ? activeStory : story} alt="Story" className="nav-icon-img group-icon" />
                        )}
                     </NavLink>
                  </Tooltip>
                  <Tooltip title="Messenger">
                     <NavLink to="/messenger" className="nav-icon messanger-icon-link" activeClassName="active">
                        {({ isActive }) => (
                           <img src={isActive ? activeMessanger : messanger} alt="Messenger" className="nav-icon-img messanger-icon" />
                        )}
                     </NavLink>
                  </Tooltip>
               </div>
               <div className="navbar-right">
                  <div className="avatar-dropdown-container">
                     <Avatar src={`http://localhost:5181${user?.avatar}`} size={50} />
                     <Dropdown overlay={menu} trigger={['click']}>
                        <Button className="avatar-dropdown-button" icon={<img src={glyph} alt="dropdown" />} />
                     </Dropdown>
                  </div>
               </div>
               <Button className="menu-button" type="primary" icon={<MenuOutlined />} onClick={showDrawer} />
               <Drawer
                  title="Menu"
                  placement="right"
                  onClose={closeDrawer}
                  visible={drawerVisible}
               >
                  {drawerMenu}
               </Drawer>
            </>
         ) : (
            <>
               <div className="left-section">
                  <Input
                     className="search-bar"
                     placeholder="Search"
                     prefix={<SearchOutlined style={{ color: '#000000' }} />}
                  />
               </div>
               <div className="center-section">
                  <img src={logo} alt="logo" className="header-logo" />
                  <div className="header-text">
                     <span className='header-text-regular'>This is</span>
                     <span className="header-text-bold">Quilt</span>
                  </div>
               </div>
               <div className="right-section">
                  <NavLink to="/login" style={{ color: '#FFFAFA', textDecoration: 'none' }}>
                     <Button icon={<UserOutlined />} className="minimalist-button login">
                        Login
                     </Button>
                  </NavLink>
                  <NavLink to="/register" style={{ color: '#FFFAFA', textDecoration: 'none' }}>
                     <Button icon={<UserAddOutlined />} className="minimalist-button register">
                        Register
                     </Button>
                  </NavLink>
               </div>
            </>
         )}
      </Header>
   );
};

export default HeaderDefault;
