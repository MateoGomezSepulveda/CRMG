import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './loginUsers.css';
import { useNavigate } from 'react-router-dom';

export default function LoginUsers() {
    const [usuarios, setUsuarios] = useState([]);
    const id = localStorage.getItem('Usuario');
    const [passwords, setPasswords] = useState({});
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseUsuarios = await axios.get(`http://localhost:8022/api/usuarios/${id}`);
                setUsuarios(responseUsuarios.data.usuarios);
            } catch (error) {
                console.error('Error al obtener usuarios:', error);
            }
        };

        fetchData();
    }, []);

    const handlePasswordChange = (e, usuarioId) => {
        const newPassword = e.target.value;
        setPasswords((prevPasswords) => ({
            ...prevPasswords,
            [usuarioId]: newPassword
        }));
    };

    const handleLogin = async (e, usuarioId, nombre) => {
        e.preventDefault();
        const password = passwords[usuarioId];
        try {
            const response = await axios.post(
                `http://localhost:8022/api/auth/loginUsers`,
                { nombre, password },
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            );
            if (response.status === 200) {
                const { token, usuario } = response.data;
                localStorage.setItem("nombre", usuario.nombre);
                localStorage.setItem("token", token);
                localStorage.setItem("Usuario", usuario._id);
                localStorage.setItem("imagen", usuario.imagen);
                localStorage.setItem("rol", usuario.rol);
                if (usuario.rol === "ADMIN") {
                    navigate("/admin");
                } else {
                    navigate("/usuario");
                }
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [usuarioId]: "Error al iniciar sesión"
                }));
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            setErrors((prevErrors) => ({
                ...prevErrors,
                [usuarioId]: error.response?.data.msg || "Error al iniciar sesión"
            }));
        }
    };

    return (
        <div className="form-login">
            {usuarios.map((usuario, index) => (
                <div key={index} className='form-login-card'>
                    {/* IMAGEN CON URL */}
                    <img className='form-login-img' src={usuario.imagen} alt={`${usuario.nombre}'s avatar`}/>
                    {/* IMAGEN CON SVG */}
                    {/* <div className='form-login-card-img' dangerouslySetInnerHTML={{ __html: usuario.imagen }} /> */}
                    <h3>{usuario.nombre}</h3>
                    <form onSubmit={(e) => handleLogin(e, usuario._id, usuario.nombre)}>
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={passwords[usuario._id] || ''}
                            onChange={(e) => handlePasswordChange(e, usuario._id)}
                            required
                        />
                        <button type="submit">Ingresar</button>
                    </form>
                    {errors[usuario._id] && <div className="error">{errors[usuario._id]}</div>}
                </div>
            ))}
        </div>
    );
}
