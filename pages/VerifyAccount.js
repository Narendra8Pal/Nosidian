import { useEffect } from 'react';
import { useRouter } from 'next/router';

const VerifyAccountPage = () => {
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    const verifyAccount = async () => {
      if (token) {
        try {
          const response = await fetch(`/api/components/VerifyAccount?token=${token}`);

          if (response.ok) {
            console.log('Account verified successfully');
            router.push('/')
          } else {
            console.log('Invalid verification token');
          }
        } catch (error) {
          console.error('Error verifying account:', error);
        }
      }
    };

    verifyAccount();
  }, [token]);

  return (
  <>
  
  <div>Verifying account...</div>;
  </>
  )
};

export default VerifyAccountPage;
