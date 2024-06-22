import React from 'react';
import { Form, Input, Button, Flex, Card, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { MailOutlined } from '@ant-design/icons';
import axios from 'axios';

import forgotPasswordImage from '../../../assets/authentication/forgot_password_image.png'

const ForgotPasswordPage: React.FC = () => {
   const navigate = useNavigate();
   const onFinish = (values: any) => {
      console.log(values);

      axios.get(`http://localhost:5181/api/Authentication/forgot-password?email=${values.email}`)
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
            <img src={forgotPasswordImage} alt="forgotPasswordImage" className='auth-pages-img' />
         </div>
         <Card style={{ width: '400px' }}>
            <h3 style={{ fontSize: 32 }}>Forgot password?</h3>
            <p style={{ fontSize: 18 }}>
               Enter your email and we’ll send you a link
               to reset your password.
            </p>
            <Form onFinish={onFinish} layout='vertical' requiredMark={false}>
               <Form.Item
                  label="Email"
                  name="email">
                  <Input prefix={<MailOutlined />} placeholder="Email address" />
               </Form.Item>

               <Form.Item>
                  <Button htmlType="submit" style={{ color: 'white', width: '100%' }}>
                     Submit
                  </Button>
               </Form.Item>

               <Form.Item>
                  <Flex justify='center'>
                     <Link to='/login' style={{ color: '#FF6347' }}>
                        Back to Login
                     </Link>
                  </Flex>
               </Form.Item>
            </Form>
         </Card>
      </Flex>
   );
};

export default ForgotPasswordPage;
