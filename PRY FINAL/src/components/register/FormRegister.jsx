import { Link, useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import "./register.css"
import llamados from '../services/llamados.js'
import Swal from "sweetalert2"

function FormRegister() {

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

  function btnRegistrarse() {

    if(nombreUsuario == "" || passwordUsuario == "") {

      console.log("Porfavor rellena los campos e intenta de nuevo.");

    }
    else {    
    
      const encontrado = Usuarios.filter(usuario => usuario.nombre == nombreUsuario)
      
      if(encontrado.length > 0) {
      
        Swal.fire({
          title: "El usuario ya existe, por favor ingrese otro nuevamente!",
          icon: "info",
        }).then (( ) => {
          location.reload()
        })
      }

      else {
        llamados.postUsers(nombreUsuario,passwordUsuario)


        setTimeout(() => {
          Swal.fire({
              title: "Usuario registrado correctamente!",
              icon: "success",
              
          }).then (( ) => {
            navigate("/")
          })
          
        }, 400);

      }
      
    }

  }

  return (
    <div className='ContFormulario'>
      <h1>Registrarse</h1>

        <label htmlFor="">Nombre</label><br />
        <input value={nombreUsuario} onChange={nombre}  type="text" /><br />

        <label htmlFor="">Password</label><br />
        <input value={passwordUsuario} onChange={password} type="password" /><br /><br />
        <button onClick={btnRegistrarse} > Registrarse </button>

        <p>¿Ya tienes una cuenta? <Link className='btnPages' to="/"> Inicia Sesión</Link> </p>
    </div>
  )
}

export default FormRegister
