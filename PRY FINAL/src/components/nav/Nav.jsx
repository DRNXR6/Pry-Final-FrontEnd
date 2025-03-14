import "./nav.css"
// import React, { useState } from 'react'
import React from "react"
import {useNavigate } from 'react-router-dom'


const navigate = useNavigate()
// const [AlternarContenedores, setAlternarContenedores] = useState(true);

function Navegacion() {
  
  // const btnCambiarContenedores = () => {
  //   setAlternarContenedores(!AlternarContenedores);
  // };

  function AiniciarSesion() {
    navigate("/login")
  }

  return (
    <section>

    <div className='ContNAV'>
      <nav>
        <div>
          <h2>TruequePlus</h2>
        </div>

        {/* <button className='btnCambioContenedor' onClick={btnCambiarContenedores}>
          {AlternarContenedores ? 'Ver completadas' : 'Ver pendientes'}
        </button> */}

        <ul>
          <li><button className='btn select'> Inicio</button></li>
          <li><button className='btn'> Sobre esta web</button></li>
          <li><button className='btn'> Contactenos</button></li>
          <li><button onClick={AiniciarSesion} className='button' >Iniciar sesión</button></li>    
        </ul>
        
      </nav>

    </div>

    {/* {AlternarContenedores && (
        <div>Holaa</div>
      )}

      {!AlternarContenedores && (
        <div>Holaa2</div>
      )} */}

    </section>
    
    

  )
}

export default Navegacion
