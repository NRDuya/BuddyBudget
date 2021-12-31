import axios from 'axios';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.defaults.withCredentials = true;

    axios.get('/users/verify')
      .then((res) => {
        setAuth(res.data.success);
      })
      .catch((err) => {
          console.error("Error fetching data", err);
          //setError(err);
      })
      .finally(() => {
          setLoading(false);
      })
  }, [])

  if(loading) return "Loading...";
  return auth ? children : <Navigate to="/login" />;
}

export default PrivateRoute;