import React, { useState, useEffect } from 'react';
import '../App.css';


function CardCategorias(){

    const [categorias, setCategorias] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseCategorias = await fetch('http://localhost:8022/api/categorias');
                if (!responseCategorias.ok) {
                    throw new Error('Error al obtener los datos de categorías');
                }
                const dataCategorias = await responseCategorias.json();
                setCategorias(dataCategorias.categorias);
            } catch (error) {
                console.error('Error', error);
            }
        };

        fetchData();
    }, [token]);

    return(
    <table className="table table-custom">
        <tbody className="cardsCategoria" id="datosCategoria">
            {categorias.map((categoria, index) => (
                <tr key={index}>
                <td>
                  <a href={`/${categoria.nombre}`} className="card-link">
                    <div className="cards-categoria-img" dangerouslySetInnerHTML={{ __html: categoria.imagen }} />
                    <span>{categoria.nombre}</span>
                  </a>
                </td>
              </tr>
            ))}
        </tbody>
    </table>

    )
}

export default CardCategorias;
