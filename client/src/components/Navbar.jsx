import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Modal } from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Navigation() {
    const navigate = useNavigate();
    const isLogged = localStorage.getItem('username');
    const [showCalendar, setShowCalendar] = useState(false);

    const handleLogout = async (event) => {
        event.preventDefault();
        axios.defaults.withCredentials = true;
        localStorage.removeItem("username");
        try {
            const res = await axios.post('/users/logout', {});
            if (res.data.success) {
                window.location.reload(false);
                navigate('/login');
            }
        }
        catch (err) {
            console.log(err);
        }
    };
    
    const handleCalendar = (value) => {
        const link = value.getFullYear() + "/" + (value.getMonth() + 1);
        navigate(`/budget/${link}`);
        setShowCalendar(!showCalendar);
    }

    const handleShowCalendar = () => {
        setShowCalendar(!showCalendar);
    }

    return (
        <Navbar bg="light" expand="lg" className="py-3">
            <Container>
                <Navbar.Brand href="/">Buddy Budget</Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto">
                        {
                            isLogged ? 
                             (<>
                                <Nav.Link onClick={handleShowCalendar}> Monthly Budget </Nav.Link>
                                <Nav.Link onClick={handleLogout}> Logout </Nav.Link>
                              </>) :
                             (<>
                                <Nav.Link href='/login'>Login</Nav.Link>
                                <Nav.Link href='/signup'>Signup</Nav.Link>
                             </>) 
                        }
                    </Nav>
                </Navbar.Collapse>
                {
                    showCalendar && 
                    <Modal
                    show={showCalendar}
                    onHide={handleShowCalendar}
                    size="lg"
                    centered
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>
                                Choose a Month to Budget
                            </Modal.Title>
                        </Modal.Header>

                        <Modal.Body className="m-auto">
                            <Calendar maxDetail="year" prev2Label={null} next2Label={null} onChange={handleCalendar} />
                        </Modal.Body>
                    </Modal>
                }
            </Container>
        </Navbar>
    )
}

export default Navigation;
