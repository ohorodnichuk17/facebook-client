import React, { useEffect } from 'react';
import { Form, Input, Button, Flex, Card, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { LockOutlined } from '@ant-design/icons';
import axios from 'axios';

import resetPasswordImg from '../../../assets/authentication/reset_password.png'
import { useAppSelector } from '../../../hooks/redux';

const ResetPasswordPage: React.FC = () => {
   const account = useAppSelector(state => state.account);
   useEffect(() => { console.log(account) }, [account]);

   const navigate = useNavigate();

   const onFinish = (values: any) => {
      console.log(values);
      values.token = account.token;
      values.email = account.user?.email;
      axios.post('http://localhost:5181/api/Authentication/reset-password', values)
         .then(res => {
            console.log(res);
            if (res.status === 200) {
               message.success("Success")
                  .then(() => navigate('/'));
            }
         })
         .catch(error => {
            console.error(error);
         })
   }

   return (
      <Flex justify='center' align='center' wrap='wrap' className='auth-pages-flex'>
         <div>
            <img src={resetPasswordImg} alt="resetPasswordImage" className='auth-pages-img' />
         </div>
         <Card style={{ width: '400px' }}>
            <h3 style={{ fontSize: 32 }}>Password reset</h3>
            <p style={{ fontSize: 18 }}>
               Enter a new password to reset the password
               on your account
            </p>
            <Form onFinish={onFinish} layout='vertical' requiredMark={false}>

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
                  <Input.Password prefix={<LockOutlined />} />
               </Form.Item>

               <Form.Item
                  label="Confirm password"
                  name="confirmPassword"
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
                     ({ getFieldValue }) => ({
                        validator(_, value) {
                           if (!value || getFieldValue('password') === value) {
                              return Promise.resolve();
                           }
                           return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        },
                     }),
                  ]}
               >
                  <Input.Password prefix={<LockOutlined />} />
               </Form.Item>

               <Form.Item>
                  <Button htmlType="submit" style={{ color: 'white', width: '100%' }}>
                     Confirm
                  </Button>
               </Form.Item>


               <Form.Item>
                  <Flex justify='center'>
                     <Link to='/' style={{ color: '#FF6347' }}>
                        Back to Main page
                     </Link>
                  </Flex>
               </Form.Item>
            </Form>
         </Card>
      </Flex>
   );
};

export default ResetPasswordPage;
