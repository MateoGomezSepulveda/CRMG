import React, { useState} from 'react';
import '../../App.css';
import CardCategorias from '../cardCategorias';
// import TarjetasProductos from '../Helados/TarjetasHelados';

function User({idCompañia}) {
    const [usuario, setUsuario] = useState(true);
    const nombre = localStorage.getItem('nombre');
    const imagen = localStorage.getItem('imagen');
    const rol = localStorage.getItem('rol');

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
                    <CardCategorias companyId={idCompañia}/>
            </div>
            <div className="parte-media">
                <div>
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

export default User;