import { useNavigate,useState } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === '1234') {
      localStorage.setItem('auth', 'true');
      navigate(`/perfil/${username}`);
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };

  return (
    <Container>
      <h2>Iniciar sesión</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3">
          <Form.Label>Usuario</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">Ingresar</Button>
      </Form>
    </Container>
  );
}