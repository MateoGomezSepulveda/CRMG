import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CardCategorias from './cardCategorias';
import ProductList from './productoList';


function CategoryPage(idCompañia) {
    const { categoryName } = useParams(); // Obtener el nombre de la categoría desde la URL
    const [productos, setProductos] = useState([]);
    const [usuario, setUsuario] = useState(true);
    const nombre = localStorage.getItem('nombre');
    const imagen = localStorage.getItem('imagen');
    const rol = localStorage.getItem('rol');

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        // Llamada a la API para obtener los productos de la categoría usando el nombre de la categoría
        const response = await fetch(`http://localhost:8022/api/productos?categoria=${categoryName}`);
        if (!response.ok) {
          throw new Error('Error al obtener los productos');
        }
        const data = await response.json();
        setProductos(data.productos); // Suponiendo que la API devuelve un array de productos
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchProductos();
  }, [categoryName]); // Ejecutar cuando el nombre de la categoría cambie

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
            <tbody className="cards" id="productoList">
            <ProductList categoryName={categoryName} /> {/* Usar el nuevo componente */}
            </tbody>
        </table>
    </div>
    <div className="parte-derecho" id="detalles">
        
    </div>
</div>
);
}

export default CategoryPage;
