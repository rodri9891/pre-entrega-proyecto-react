import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";

export default function Productos({ category = null }) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = "https://69411cac686bc3ca8165aa45.mockapi.io/api/products";

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (category) {
          data = data.filter((prod) => prod.category === category);
        }
        setProductos(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [category]);

  const handleAgregarAlCarrito = (product) => {
    alert(`Producto ${product.title} agregado al carrito`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-4">
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {productos.map((prod) => (
          <Col key={prod.id} className="d-flex">
            <Card className="h-100 w-100 shadow-sm">
              <Card.Img
                variant="top"
                src={prod.image}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{prod.title}</Card.Title>
                <Card.Text>${prod.price}</Card.Text>
                <Button
                  variant="primary"
                  className="w-100"
                  onClick={() => handleAgregarAlCarrito(prod)}
                >
                  Agregar
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
