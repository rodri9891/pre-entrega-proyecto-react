import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Table, Button, Form, Modal } from "react-bootstrap";

// 🔹 Usamos tu MockAPI en lugar de fakestore
const API_URL = "https://69411cac686bc3ca8165aa45.mockapi.io/api/products";
export default function Perfil() {
  const { id } = useParams(); // usuario logueado
  const [productos, setProductos] = useState([]);
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    image: ""
  });
  const [editId, setEditId] = useState(null);

  // Obtener productos
  const getProductos = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error("Error al obtener productos:", error));
  };

  // Cerrar modal
  const handleClose = () => {
    setShow(false);
    setForm({ title: "", description: "", price: "", image: "" });
    setEditId(null);
  };

  // Abrir modal (nuevo o edición)
  const handleShow = (producto) => {
    setShow(true);
    if (producto) {
      setForm({
        title: producto.title || "",
        description: producto.description || "",
        price: Number(producto.price) || 0,
        image: producto.image || ""
      });
      setEditId(producto.id);
    } else {
      setForm({ title: "", description: "", price: "", image: "" });
      setEditId(null);
    }
  };

  // Crear o editar
  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = {
      ...form,
      price: Number(form.price)
    };

    const method = editId ? "PUT" : "POST";
    const url = editId ? `${API_URL}/${editId}` : API_URL;

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData)
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al guardar el producto");
        return res.json();
      })
      .then(() => {
        handleClose();
        getProductos();
      })
      .catch((error) => console.error("Error:", error));
  };

  // Eliminar
  const eliminarProducto = (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este producto?")) return;

    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error("Error al eliminar el producto");
        getProductos();
      })
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    getProductos();
  }, []);

  return (
    <Container className="mt-4">
      <h2>Perfil del Usuario</h2>
      <p>Bienvenido, {id}</p>

      <div className="d-flex align-items-center justify-content-between my-3">
        <h4 className="mb-0">Tus productos</h4>
        <Button onClick={() => handleShow()}>Agregar producto</Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Título</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((prod) => (
            <tr key={prod.id}>
              <td>{prod.title}</td>
              <td>{prod.description}</td>
              <td>${Number(prod.price).toFixed(2)}</td>
              <td>
                {prod.image?.startsWith("http") ? (
                  <img
                    src={prod.image}
                    alt={prod.title}
                    width={50}
                    height={50}
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <span>{prod.image}</span>
                )}
              </td>
              <td>
                <Button
                  size="sm"
                  variant="warning"
                  onClick={() => handleShow(prod)}
                >
                  Editar
                </Button>{" "}
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => eliminarProducto(prod.id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
          {productos.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center">
                No hay productos cargados.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editId ? "Editar" : "Agregar"} producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label>Título</Form.Label>
              <Form.Control
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                value={form.price}
                onChange={(e) =>
                  setForm({ ...form, price: Number(e.target.value) })
                }
                required
                min="0"
                step="0.01"
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Imagen (URL)</Form.Label>
              <Form.Control
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                required
              />
            </Form.Group>

            <Button type="submit" className="mt-2" variant="primary">
              Guardar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
