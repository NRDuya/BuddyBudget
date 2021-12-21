import axios  from 'axios';
import { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ children }) {
    const auth = useAuth();
    return auth ? children : <Navigate to="/login" />;
  }
  

export default PrivateRoute;