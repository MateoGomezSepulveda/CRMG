import React, {useEffect, useState} from 'react'
import {useNavigate,  Link} from 'react-router-dom'
import axios from "axios";
import Logo from "../../img/Logo.jpg"
import './login.css'

export default function Login(){
    const [isLoading, setIsLoading] = useState(true);
    const [showForm, setShowForm] = useState(true);

    // Estados para contraseña email y token
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [token, setToken] = useState("");

    const manejoEnvio = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post(
          "http://localhost:8022/api/auth/login",
          {
            email: email,
            password: password,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "CRMG-api-token-jwt": "",
            }
          }
        );
        if (response.status === 200) {
          const data = response.data;
          const token = data.token;
          const imagen = data.compañia.imagen;
          const nombre = data.compañia.nombre;
          const id = data.compañia._id;
          setToken(token);
          localStorage.setItem("nombre", nombre);
          localStorage.setItem("token", token);
          localStorage.setItem("Usuario", id);
          localStorage.setItem("imagen", imagen);
          switch (id){
            default:
              navigate(`/login/users`);
              break;
          }
        } 
      } catch (error) {
        if (error.response) {
          setError(error.response.data.msg || "Error al iniciar sesión");
        } else {
          setError("Error al iniciar sesión");
        }
      }
    };
    useEffect(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 3000); 
      }, []);
    
      useEffect(() => {
        if (!isLoading) {
          setTimeout(() => {
            setShowForm(true);
          }, 100); 
        }
      }, [isLoading]);

      return(
        <form onSubmit={manejoEnvio}>
            <div className={`contenedor-login ${showForm ? 'form-show' : ''}`}>
        <div className="overlay-login"></div>
        <div className={`formulario-login ${showForm ? 'form-show' : ''}`}>
          <div className="logo-form">
            <img src={Logo} alt="Logo del formulario" />
          </div>
          <h1>Bienvenido a CRMG tu cash register</h1>
          <p>Por favor, ingrese los siguientes datos para ingresar la plataforma.</p>
          <div>
          <div className="input-container">
              <label htmlFor="username">  </label>
              <input  id="username" name="username" type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='email'
                required/>
          </div>
          <div className="input-container">
            <label htmlFor="password"></label>
            <input type="password" id="password" name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='password'
                required />
          </div>
          </div>
          <button className="login-button" type="submit" >
                Ingresar
          </button>
          {error && (
            <div>
              <p className="login-error">{error}</p>
            </div>
          )}
          <p className="small-text">
             <Link to = '/recuperar'>Tienes problemas para ingresar? Por favor conectarse con asistencia técnica lo más pronto posible.</Link>
          </p>
          </div>
        </div>
      </form>
      )
}