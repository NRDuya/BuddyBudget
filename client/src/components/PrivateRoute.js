import axios  from 'axios';
import { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute ({component: Component, ...rest}){
    axios.defaults.withCredentials = true;

    const [logged, setLogged] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:3001/users/verify")
        .then((res) => {
            console.log(res);
            if(res.data.logged === true){
                setLogged(true);
            }
            else{
                return false;
            }
        })
        .catch((err) => {
            console.log(err);
        }); 
    }, [])
    
    return (
        <Route {...rest} render={props => (
            logged ?
                <Component {...props} />
            : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute;