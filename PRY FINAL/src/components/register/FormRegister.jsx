import { Link, useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import "./register.css"
import llamados from '../services/llamados.js'
import Swal from "sweetalert2"

function FormRegister() {

  const [nombreUsuario, SetNombreUsuario]=useState("")
  const [EmailUsuario, SetEmailUsuario]=useState("")
  const [passwordUsuario, SetPasswordUsuario]=useState("")
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
    SetNombreUsuario(evento.target.value.trim())
  }

  function email(evento) {
    SetEmailUsuario(evento.target.value.trim())
  }

  function password(evento) {
    SetPasswordUsuario(evento.target.value.trim())

  }

  function btnRegistrarse() {

    if(nombreUsuario === "" || EmailUsuario === "" || passwordUsuario === "") {

      Swal.fire({
        title: "Por favor complete los campos!",
        icon: "info",
      })
    }
    
    else {  
      
      if(!(EmailUsuario.includes("@"))) {
        Swal.fire({
          title: "Porfavor ingresa un correo valido!",
          icon: "info",
        })

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
          let rol = "usuario"
          llamados.postUsers(nombreUsuario, EmailUsuario, rol, passwordUsuario)
  
  
          setTimeout(() => {
            Swal.fire({
                title: "Usuario registrado correctamente!",
                icon: "success",
                
            }).then (( ) => {
              navigate("/login")
            })
            
          }, 400);
  
        }
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
      <div className='ContFormulario'>
      <img onClick={close} src="bxs-x-circle.svg" alt="" />

        <h1>Registrarse</h1>

          <label htmlFor="">Nombre</label><br />
          <input value={nombreUsuario} onChange={nombre}  type="text" /><br />

          <label htmlFor="">Email</label><br />
          <input value={EmailUsuario} onChange={email}  type="email" /><br />

          <label htmlFor="">Password</label><br />
          <input value={passwordUsuario} onChange={password} type="password" /><br /><br />
          <button onClick={btnRegistrarse} > Registrarse </button><br /><br />

          <p>¿Ya tienes una cuenta? <Link className='btnPages' to="/login"> Inicia Sesión</Link> </p>
      </div>

    </section>
  )
}

export default FormRegister
