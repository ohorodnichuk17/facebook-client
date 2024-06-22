import React from 'react';
import { Form, Input, Button, Flex, Card, Divider } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import './LoginPage.css';
import { useAppDispatch } from '../../../hooks/redux';
import { login } from '../../../store/account/account.actions';
import { unwrapResult } from '@reduxjs/toolkit';

const LoginPage: React.FC = () => {
   const navigate = useNavigate();
   const dispatch = useAppDispatch();

   const onFinish = async (values: any) => {
      try {
         const response = await dispatch(login(values));
         console.log(response)
         unwrapResult(response);
         navigate('/');
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <Flex justify='center' align='center' wrap='wrap' gap={30} style={{ minHeight: '80vh' }}>
         <div style={{ marginRight: '50px' }}>
            <h1 style={{ color: '#FF7F50', fontFamily: 'Lilita One', fontSize: 48 }}>Quilt</h1>
            <p style={{ fontFamily: 'Lilita One', fontWeight: 'bold', fontSize: 24 }}>
               Where connections are made,<br />
               and communities are built.
            </p>
         </div>
         <Card style={{ width: '400px' }}>
            <Form onFinish={onFinish} layout='vertical' requiredMark={false}>
               <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                     { required: true, message: 'Email must not be empty' },
                     { pattern: /^[^а-яА-Я]*$/, message: 'Email must not contain Cyrillic characters' },
                     { min: 5, message: 'Email must be at least 5 characters long' },
                     { max: 254, message: 'Email must be less than 254 characters long' },
                     { type: 'email', message: 'Invalid email address format' },
                  ]}
               >
                  <Input prefix={<MailOutlined />} placeholder="Email address" />
               </Form.Item>

               <Form.Item
                  label="Password"
                  name="password"
                  style={{ width: '100%' }}
                  rules={[
                     { required: true, message: 'Password must not be empty' },
                     { min: 8, message: 'Password must be at least 8 characters long' },
                     { max: 24, message: 'Password must be less than 24 characters long' },
                     { pattern: /[A-Z]/, message: 'Password must contain at least one uppercase letter' },
                     { pattern: /[a-z]/, message: 'Password must contain at least one lowercase letter' },
                     { pattern: /\d/, message: 'Password must contain at least one digit' },
                     { pattern: /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/, message: 'Password must contain at least one special character' },
                     { pattern: /^[^£#“”]*$/, message: 'Password must not contain the following characters: £ # “”' },
                     { pattern: /^[^а-яА-Я]*$/, message: 'First name must not contain Cyrillic characters' },
                  ]}
               >
                  <Input.Password prefix={<LockOutlined />}
                  />
               </Form.Item>


               <Form.Item>
                  <Button htmlType="submit" style={{ color: 'white', width: '100%' }}>
                     Sign In
                  </Button>
               </Form.Item>

               <Form.Item>
                  <Flex justify='center'>
                     <Link to='/' style={{ color: '#FF6347' }}>
                        Forgot password?
                     </Link>
                  </Flex>
               </Form.Item>

               <Divider />

               <Form.Item>
                  <Link to='/'>
                     <Button style={{ color: 'white', backgroundColor: '#FF6347', width: '100%' }}>Create account</Button>
                  </Link>
               </Form.Item>
            </Form>
         </Card>
      </Flex>
   );
};

export default LoginPage;
