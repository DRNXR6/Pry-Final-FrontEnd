import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import "./login.css";
import llamados from '../services/llamados.js';
import Swal from "sweetalert2";

function FormLogin() {
  const [nombreUsuario, SetNombreUsuario] = useState('');
  const [passwordUsuario, SetPasswordUsuario] = useState('');
  const [Usuarios, SetUsuarios] = useState([]);
  const navigate = useNavigate(); // Usamos useNavigate para redirigir

  // Cargar usuarios cuando se monta el componente
  useEffect(() => {
    async function fetchDataUsers() {
      const Datos = await llamados.getUsers(); // Obtener los datos de usuarios
      SetUsuarios(Datos);
    }
    fetchDataUsers();
  }, []);

  // Manejar cambios en el nombre del usuario
  function nombre(evento) {
    SetNombreUsuario(evento.target.value);
  }

  // Manejar cambios en la contraseña
  function password(evento) {
    SetPasswordUsuario(evento.target.value);
  }

  // Manejar la acción de iniciar sesión
  function btnIniciarSesion() {
    // Validar que el usuario haya ingresado los campos requeridos
    if (!nombreUsuario || !passwordUsuario) {
      Swal.fire({
        icon: "info",
        text: "¡Por favor, llene todos los campos!",
      });
      return;
    }

    // Buscar al usuario que coincide con las credenciales
    const encontrado = Usuarios.find(usuario => usuario.nombre === nombreUsuario && usuario.contraseña === passwordUsuario);

    if (!encontrado) {
      Swal.fire({
        icon: "error",
        text: "¡El usuario o contraseña son incorrectos, por favor intentalo de nuevo!",
      });
    } else {
      // Almacenar el nombre y rol del usuario en el localStorage
      localStorage.setItem("usuarioActual", JSON.stringify(encontrado.nombre));

      // Redirigir según el rol
      if (encontrado.rol === 'admin') {
        navigate("/MarketPlace"); // Si el usuario es admin, lo redirigimos al MarketPlace
      } else {
        navigate("/"); // Si no es admin, lo redirigimos a la página de inicio
      }
    }
  }

  // Cerrar el formulario y regresar a la página principal
  function close() {
    navigate("/");
  }

  return (
    <section>
      <div className='ContFormulario2'>
        <img onClick={close} src="bxs-x-circle.svg" alt="Cerrar" />
        <h1>Inicio de sesión</h1>

        <label>Nombre</label><br />
        <input value={nombreUsuario} onChange={nombre} type="text" /><br />
        
        <label>Password</label><br />
        <input value={passwordUsuario} onChange={password} type="password" /><br /><br />

        <button onClick={btnIniciarSesion}>Iniciar Sesión</button><br /><br />
        <p>¿No tienes una cuenta? <Link className='btnPages' to="/register">Registrarme</Link></p>
      </div>
    </section>
  );
}

export default FormLogin;
