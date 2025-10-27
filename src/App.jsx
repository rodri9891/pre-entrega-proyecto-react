import { useEffect, useState } from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from "./components/Header"
import Footer from "./components/Footer"
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home"
import Clientes from "./pages/Clientes"
import Productos from "./pages/Productos"
import Servicios from "./pages/Servicios"
import Contacto from "./pages/Contacto"
import RutaProtegida from './components/RutaProtegida';
import Login from './pages/Login';
import Administracion from './pages/Administracion';
import NoEncontrado from './pages/NoEncontrado';
import Perfil from './pages/Perfil';

function App(){

  return (
  <Router>
    <Header></Header>
      <Container>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/clientes" element={<Clientes></Clientes>}></Route>
          <Route path="/productos" element={<Productos></Productos>}></Route>
          <Route path="/servicios" element={<Servicios></Servicios>}></Route>
          <Route path="/contactos" element={<Contacto></Contacto>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/perfil/:id' element={<RutaProtegida><Perfil></Perfil></RutaProtegida>}></Route>
          <Route path='/admin' element={
            <RutaProtegida>
              <Administracion>

              </Administracion>
            </RutaProtegida>
          }></Route>
          <Route path='*' element={<NoEncontrado></NoEncontrado>}></Route>
        </Routes>
      </Container>
    <Footer></Footer>
  </Router>
  )
}

export default App
