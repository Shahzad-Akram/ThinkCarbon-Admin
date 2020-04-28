import axios from 'axios';
export function setAuthorizationToken() {
  const token = localStorage.getItem('loggedIn');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Token ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}
