import "./nav.css"
import React from "react"
import { Link, useNavigate } from 'react-router-dom'

function Navegacion() {
  
  const navigate = useNavigate()

  function ARegistrarse() {
    navigate("/register")
  }

  function AiniciarSesion() {
    navigate("/login")
  }


  return (
    <section>

    <div className='ContNAV'>
      <nav className="NAV">
        <div>
          <h2>TruequePlus</h2>
        </div>

        <ul>
          <li> <Link to="/"> <button className='btn'> Inicio </button> </Link> </li>
          <li> <Link to="/GoodsAndServicesPagePublic"> <button className='btn'> Publicaciones </button> </Link> </li>  
          <li> <Link to="/AboutWeb"> <button className='btnAbout'> Sobre esta web</button> </Link> </li>
          <li> <Link to="/contacto"> <button className='btn'> Contáctenos </button> </Link> </li>  

          <article>
            
            <li><button onClick={ARegistrarse} className='btnARegistrarse' >Registrase</button></li>
            <li><button onClick={AiniciarSesion} className='btnAiniciarSesion' >Iniciar sesión</button></li>
          </article>

        </ul>

        
      </nav>

    </div>

    </section>
    
    

  )
}

export default Navegacion
