import { useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';

function AlertComponent({ alert, setAlert }){

    const closeAlert = () => {
        const newAlert = {...alert};
        newAlert.show = false;
        setAlert(newAlert);
    }

    useEffect(() => {
        if (alert.disappear) {
            const timeId = setTimeout(() => {
                closeAlert();
              }, 5000)
          
              return () => {
                clearTimeout(timeId)
              }
        }
    }, []);

    return(
        <>
            <Alert variant={alert.type} onClose={closeAlert} dismissible>
                { alert.message }
            </Alert>
        </>
    )
}

export default AlertComponent;