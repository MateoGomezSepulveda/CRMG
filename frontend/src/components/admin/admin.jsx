import React, { useState, useEffect } from 'react';
import { Navigate , Link } from 'react-router-dom';
import '../../App.css';
import CardCategorias from '../cardCategorias';
// import Button2 from './button';
// import TarjetasProductos from '../Helados/TarjetasHelados';

function Admin() {
    const [categorias, setCategorias] = useState([]);
    const [usuario, setUsuario] = useState(true);
    const nombre = localStorage.getItem('nombre');
    const imagen = localStorage.getItem('imagen');
    const rol = localStorage.getItem('rol');
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseCategorias = await fetch('http://localhost:8021/api/categorias');
                if (!responseCategorias.ok) {
                    throw new Error('Error al obtener los datos de categorías');
                }
                const dataCategorias = await responseCategorias.json();
                setCategorias(dataCategorias.categorias);

                if (!token) {
                    return <Navigate  to="/" />;
                } else {
                    setUsuario(true);
                }
            } catch (error) {
                console.error('Error', error);
            }
        };

        fetchData();
    }, [token]);

    return (
        <div className="contenedor">
            <div className={`parte-izquierda ${usuario ? 'autenticado' : ''}`}>
                {usuario && (
                <div className="perfil">
                {/* IMAGEN CON URL */}
                <img className='form-login-img' src={imagen} alt={`${nombre}'s avatar`}/>
                    {/* IMAGEN CON SVG */}
                    {/* <div className='form-login-card-img' dangerouslySetInnerHTML={{ __html: usuario.imagen }} /> */}
                    <h3>{nombre}</h3>
                </div>
                )}
                <CardCategorias/>
            </div>
            <div className="parte-media">
                <div>
                <Link to="/configurar">Configurar</Link>
                    <h2>Productos</h2>
                </div>
                <table className="table table-custom">
                    <thead>
                        <tr></tr>
                    </thead>
                    <tbody className="cards" id="datosHelados">
                        {/* <TarjetasProductos /> */}
                    </tbody>
                </table>
            </div>
            <div className="parte-derecho" id="detalles">
                
            </div>
        </div>
    );
}

export default Admin;
