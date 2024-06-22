import React from 'react';
import { createRoot } from 'react-dom/client';
import styles from './EmailConfirmationRequired.module.css';

const EmailConfirmationRequired: React.FC = () => {
   return (
      <div className={styles.wrapper}>
         <div className={styles.container}>
            <div className={styles.icon}>📧</div>
            <h1 className={styles.h1}>Email Confirmation Required</h1>
            <p className={styles.p}>Thank you for registering! Please check your email to confirm your email address before you can log in.</p>
         </div>
      </div>
   );
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<EmailConfirmationRequired />);

export default EmailConfirmationRequired;
