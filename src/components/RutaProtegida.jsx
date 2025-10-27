import { Navigate } from "react-router-dom";
import { Children } from "react";

export default function RutaProtegida({childrem}){
    const auth = localStorage.getItem('auth')==='true';
    return auth ? childrem: <Navigate to="/login"></Navigate>
}