import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
export const useIsAdmin = () => {
  const history = useHistory();

  useEffect(() => {
    const admin = localStorage.getItem('loggedIn');
    if (admin) {
      return;
    } else {
      history.push('/');
    }
  }, []);
};
