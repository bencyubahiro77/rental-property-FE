import { useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

function App() {
  useEffect(() => {
    // Check if the access token is in the URL after redirect
    const hash = window.location.hash;
    if (hash.includes('access_token')) {
      const token = new URLSearchParams(hash.substring(1)).get('access_token') as any;

      // Send the token to the backend using axios
      axios.post('http://localhost:5000/auth/callback', {
        accessToken: token
      })
        .then(response => {
          // Extract and store the details in localStorage
          const { token } = response.data;
          const decoded = jwtDecode(token);
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(decoded));

          return response.data;
        })
        .catch(error => {
          console.error('Error sending token to backend:', error);
        });
    }
  }, []);

  const handleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  }

  return (
    <>
      <button onClick={handleLogin}>Login with Google</button>
    </>
  );
}

export default App;
