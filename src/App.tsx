import { Route, Routes } from 'react-router-dom';
import RegisterPage from './components/pages/RegisterPage/RegisterPage';
import { ConfigProvider } from 'antd';
import LoginPage from './components/pages/LoginPage/LoginPage';
import ForgotPasswordPage from './components/pages/ForgotPasswordPage/ForgotPasswordPage';
import ChangeEmailPage from './components/pages/ChangeEmailPage/ChangeEmailPage';
import ResetPasswordPage from './components/pages/ResetPasswordPage/ResetPasswordPage';
import ContainerDefault from './components/containers/ContainerDefault';
import SetNewPasswordPage from './components/pages/SetNewPasswordPage/SetNewPasswordPage';
import EmailSuccessfullyConfirmedPage from './components/pages/EmailSuccessfullyConfirmedPage/EmailSuccessfullyConfirmedPage';
import EmailConfirmationRequired from './components/pages/EmailConfirmationRequired/EmailConfirmationRequired';
import { CreateStoryPage } from './components/pages/Story/CreateStoryPage/CreateStoryPage';
import UserProfilePage from './components/pages/UserProfilePage/UserProfilePage';
// import CreateStoryPage from "./components/pages/Story/CreateStoryPage/some";

const App = () => {
   return (
      <ConfigProvider
         theme={{
            token: {
               fontFamily: 'Montserrat'
            },
            components: {
               Button: {
                  defaultBg: '#FF7F50',
                  defaultHoverBg: '#FFA07A',
                  defaultActiveBg: '#FF6347',
                  colorText: 'white',
                  defaultColor: 'white',
                  defaultHoverColor: 'white',
                  defaultActiveColor: 'white',
                  colorPrimaryActive: 'white',
                  defaultBorderColor: '#FF7F50',
                  defaultHoverBorderColor: '#FFA07A',

                  colorPrimaryBg: '#FF7F50',
                  colorPrimaryText: 'white',

                  primaryColor: 'white',
                  colorBgMask: 'white',
                  colorPrimaryBorder: '#FF7F50',
                  colorPrimaryBorderHover: '#FFA07A',
                  colorPrimaryHover: '#FFA07A',
                  colorPrimaryBgHover: '#FFA07A',

                  fontFamily: 'Montserrat'
               },
               Input: {
                  colorBorder: '#FF7F50',
                  hoverBorderColor: '#FFA07A',
                  activeBorderColor: '#FF6347'
               }
            },
         }}
      >

         <Routes>
            <Route path='/' element={<ContainerDefault />}>
               <Route path='login' element={<LoginPage />} />
               <Route path='register' element={<RegisterPage />} />
               <Route path='profile' element={<UserProfilePage />} />
               <Route path='forgot-password' element={<ForgotPasswordPage />} />
               <Route path='reset-password' element={<ResetPasswordPage />} />
               <Route path='change-email' element={<ChangeEmailPage />} />
               <Route path='set-new-password' element={<SetNewPasswordPage />} />
               <Route path='email-confirmed' element={<EmailSuccessfullyConfirmedPage />} />
               <Route path='email-confirmation-required' element={<EmailConfirmationRequired />} />

               <Route path='story'>
                  <Route index element={<CreateStoryPage />} />
               </Route>
            </Route>
         </Routes>
      </ConfigProvider>
   );
};

export default App;
