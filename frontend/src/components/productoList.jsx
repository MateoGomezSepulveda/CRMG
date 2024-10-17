import React, { useEffect, useState } from 'react';

function ProductList({ categoryName }) {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  // Obtener las categorías
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const responseCategorias = await fetch(`http://localhost:8022/api/categorias`);
        if (!responseCategorias.ok) {
          throw new Error('Error al obtener los datos de categorías');
        }
        const dataCategorias = await responseCategorias.json();
        setCategorias(dataCategorias.categorias);
      } catch (error) {
        console.error('Error', error);
      }
    };

    fetchCategorias();
  }, []);

  // Obtener los productos basados en el ID de la categoría
  useEffect(() => {
    // Solo proceder si ya hemos cargado las categorías
    if (categorias.length > 0) {
      // Buscar la categoría cuyo nombre coincide con el `categoryName`
      const categoriaSeleccionada = categorias.find(categoria => categoria.nombre === categoryName);
      console.log(categoriaSeleccionada);
      
      // Verificar si encontramos la categoría
      if (categoriaSeleccionada) {
        const fetchProductos = async () => {
          try {
            // Corregir la URL del endpoint
            const response = await fetch(`http://localhost:8022/api/productos?categoriaId=${categoriaSeleccionada.nombre}`);
            if (!response.ok) {
              throw new Error('Error al obtener los productos');
            }
            const data = await response.json();
            setProductos(data.productos);
          } catch (error) {
            console.error('Error:', error);
          }
        };

        fetchProductos();
      }
    }
  }, [categoryName, categorias]); // Ejecutar cuando el nombre de la categoría o las categorías cambien

  return (
    <div>
      {productos.length > 0 ? (
        <div className="productos-list">
          {productos.map((producto) => (
            <div key={producto.id} className="producto-card">
                <img className='producto-img' src={producto.imagen} alt="cards" />  
                <h3>{producto.nombre}</h3>
            </div>
          ))}
        </div>
      ) : (
        <p>No hay productos en esta categoría.</p>
      )}
    </div>
  );
}

export default ProductList;
