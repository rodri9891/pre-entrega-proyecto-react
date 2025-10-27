import { useState, useEffect } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";

export default function Productos() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    let url = 'https://fakestoreapi.com/products';

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setProductos(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
<div className="mt-4">
 <Row xs={1} sm={2} md={3} lg={4} className="g-4">
  {productos.map((prod) => (
    <Col key={prod.id} className="d-flex">
      <Card className="h-100 w-100 shadow-sm">
        <Card.Img
          variant="top"
          src={prod.image}
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <Card.Body>
          <Card.Title>{prod.title}</Card.Title>
          <Card.Text>${prod.price}</Card.Text>
          <Button variant="primary">Agregar</Button>
        </Card.Body>
      </Card>
    </Col>
  ))}
</Row>
</div>
  );
}