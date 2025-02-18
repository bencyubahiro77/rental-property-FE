import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginAction } from "../../redux/action/login"
import { AppDispatch } from '../../redux/store';

export const Login = () =>{
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Check if the access token is in the URL after redirect
    const hash = window.location.hash;
    if (hash.includes('access_token')) {
      const token = new URLSearchParams(hash.substring(1)).get('access_token') as string;
      dispatch(loginAction({ token, navigate }));
    }
  }, [dispatch, navigate]);

  const handleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  }

  return (
    <>
      <button onClick={handleLogin}>Login with Google</button>
    </>
  );
}

export default Login;
