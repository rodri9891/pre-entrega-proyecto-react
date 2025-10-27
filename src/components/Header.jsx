import { Link, useNavigate } from "react-router-dom";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import Productos from "../pages/Productos";
import Clientes from "../pages/Clientes";

export default function Header(){
    const navigate = useNavigate();
    const isAuth = localStorage.getItem('auth')==='true';

    const cerrarSesion=()=>{
        localStorage.removeItem('auth');
        navigate('/login');
    }
    return(
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
            <Container>
                <Navbar.Brand as ={Link} to="/">
                    Proyecto 2025
                </Navbar.Brand>
                    <Navbar.Collapse>
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
                            <Nav.Link as={Link} to="/productos" element={<Productos></Productos>}>Productos</Nav.Link>
                            <Nav.Link as={Link} to="/clientes" element={<Clientes></Clientes>}>Productos</Nav.Link>
                            <Nav.Link as={Link} to="/servicios" element={<Servicios></Servicios>}>Servicios</Nav.Link>
                            <Nav.Link as={Link} to="/contactos" element={<Contacto></Contacto>}>Contactos</Nav.Link>

                            {/*enlaces que se muestran si hay auth*/}
                            {isAuth && (
                                <Nav.Link as={Link} to="/Admin">Perfil</Nav.Link>
                            )}
                        </Nav>
                            {/* ctrl k c mostrar button por auth */}
                            {!isAuth ?(
                                <Nav.Link as={Link} to="/Login">Login</Nav.Link>
                            ): (
                                <Button variant="outline-light" onClick={cerrarSesion}>Cerrar sesion</Button>
                            )}
                    </Navbar.Collapse>
                {/* <Nav.Link as = {Link} to="/">
                    Home
                </Nav.Link> */}
                <Nav.Link as = {Link} to="/clientes">
                    Clientes
                </Nav.Link><Nav.Link as = {Link} to="/productos">
                    Productos
                </Nav.Link><Nav.Link as = {Link} to="/servicios">
                    Servicios
                </Nav.Link><Nav.Link as = {Link} to="/contactos">
                    Contactos
                </Nav.Link>
            </Container>
        </Navbar>
    )
}