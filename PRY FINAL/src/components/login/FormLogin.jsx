import { Link, useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import "./login.css"
import llamados from '../services/llamados.js'
import Swal from "sweetalert2"


function FormLogin() {

  const [nombreUsuario, SetNombreUsuario]=useState()
  const [passwordUsuario, SetPasswordUsuario]=useState()
  const [Usuarios, SetUsuarios]=useState()

  
  const navigate = useNavigate()

  useEffect(() => {
    
    async function fetchDataUsers() {
      
      const Datos = await llamados.getUsers()

      SetUsuarios(Datos)
    };

    fetchDataUsers()

  }, [])



  function nombre(evento) {
    SetNombreUsuario(evento.target.value)

  }

  function password(evento) {
    SetPasswordUsuario(evento.target.value)

  }

  function btnIniciarSesion() {

    const encontrado = Usuarios.filter(usuario => usuario.nombre == nombreUsuario && usuario.contraseña == passwordUsuario)

    if(nombreUsuario == undefined || passwordUsuario == undefined) {

      Swal.fire({
        icon: "info",
        text: "¡Por favor, llene todos los campos!",
      });
    }

    else {

      if(encontrado.length === 0 ) {
  
        Swal.fire({
          icon: "error",
          text: "¡El usuario o contraseña es incorrecta, porfavor intentelo de nuevo!",
        });
  
      }

      else {
  
        setTimeout(() => {
          navigate("/MarketPlace")
      }, 300 )
  
      localStorage.setItem("usuarioActual", JSON.stringify(nombreUsuario));
  
        
      }
    }

  }

  function close() {
    setTimeout(() => {
      navigate("/")
    }, 400);
  }

  return (
    <section>

      <div className='ContFormulario2'>
        <img onClick={close} src="bxs-x-circle.svg" alt="" />

        <h1> Inicio de sesion </h1>

          <label>Nombre</label><br/>
          <input value={nombreUsuario} onChange={nombre}  type="text" /><br />
          <label>Password</label><br/>
          <input value={passwordUsuario} onChange={password} type="password" /><br /><br />

          <button onClick={btnIniciarSesion} > Iniciar Sesion </button>
          <p>¿No tienes una cuenta? <Link className='btnPages' to="/register"> Registrarme </Link> </p>



      </div>
      </section>
  )
}

export default FormLogin


