import { jwtDecode } from 'jwt-decode';

export const handleAuthToken = (token, user, navigate) => {
  if (!token || !user) {
    navigate('/login');
    return;
  }

  try {
    const decoded = jwtDecode(token);
    const exp = decoded.exp * 1000; // convert to milliseconds
    const now = Date.now();
    const timeLeft = exp - now;

    if (timeLeft <= 0) {
      sessionstoragege.removeItem('token');
      sessionstorage.removeItem('user');
      navigate('/login');
    } else {
      setTimeout(() => {
        sessionstorage.removeItem('token');
        sessionstorage.removeItem('user');
        navigate('/login');
      }, timeLeft);
    }
  } catch (err) {
    console.error('Token decoding failed:', err);
    navigate('/login');
  }
};
