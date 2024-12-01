import { useEffect, useState } from 'react';
import AppRouter from './routers/AppRouter';
import { useNavigate } from 'react-router-dom';
import { getUserInfor, refreshToken } from './services/apiUser';
import useAuth from './hooks/useAuth';

function App() {
  const { loggedIn } = useAuth();
  const navigate = useNavigate();
  const [first, setFirst] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserInfor();
        localStorage.setItem('user', JSON.stringify(res.data));
      } catch (error) {
        console.log(error);
        navigate('/login');
      }
    };
    if (!localStorage.getItem('token') && loggedIn) {
      localStorage.clear();
    } else if (loggedIn) {
      fetchUser();
      refreshToken();
      const intervalId = setInterval(refreshToken, 300000); // 5 minutes

      setTimeout(() => {
        setFirst(true);
      }, 1000);
      // Clean up the interval on component unmount
      return () => clearInterval(intervalId);
    }
    setFirst(true);
  }, [loggedIn, navigate]);

  return <>{first ? <AppRouter /> : <></>}</>;
}

export default App;
