import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { setAuthorizationToken } from '../helpers/utils';
export const useIsAdmin = () => {
  const history = useHistory();

  useEffect(() => {
    const admin = localStorage.getItem('loggedIn');
    if (admin) {
      return;
    } else {
      setAuthorizationToken();
      history.push('/');
    }
    // eslint-disable-next-line
  }, []);
};
