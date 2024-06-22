import { Flex } from 'antd';
import confirmedMail from '../../../assets/authentication/confirmemail.png'
import { Link } from 'react-router-dom';

const EmailSuccessfullyConfirmedPage = () => {
   return (
      <>
         <Flex justify='center' align='center'>
            <img src={confirmedMail} alt="" style={{ width: 500, height: 401 }} />
            <h1>Your email was successfully confirmed</h1>
         </Flex>
         <Flex justify='center'>
            <Link to='/login' style={{ color: '#FF6347' }}>
               Back to Login
            </Link>
         </Flex>
      </>
   );
}

export default EmailSuccessfullyConfirmedPage;