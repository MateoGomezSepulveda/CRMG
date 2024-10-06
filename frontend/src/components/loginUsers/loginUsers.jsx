import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './loginUsers.css';

export default function LoginUsers() {
    const [usuarios, setUsuarios] = useState([]);
    const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local
    const id = localStorage.getItem('Usuario');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseUsuarios = await axios.get(`http://localhost:8022/api/usuarios/${id}`, {
                    headers: { 'x-token': token }
                });
                setUsuarios(responseUsuarios.data.usuarios);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, [token]);

    return (
        <div className="form-login">
            {usuarios.map((usuario, index) => (
                <div key={index}>
                    <Link to={`/usuarios/${usuario._id}`}>
                        <h3>{usuario.nombre}</h3>
                    </Link>
                </div>
            ))}
        </div>
    );
}
