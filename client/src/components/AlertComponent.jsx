import Alert from 'react-bootstrap/Alert';

function AlertComponent({ alert, setAlert }){
    const closeAlert = () => {
        const newAlert = {...alert};
        newAlert.show = false;
        setAlert(newAlert);
    }
    return(
        <>
            <Alert variant={alert.type} onClose={closeAlert} dismissible>
                { alert.message }
            </Alert>
        </>
    )
}

export default AlertComponent;