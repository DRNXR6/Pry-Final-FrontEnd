import "./NavMarketPlace.css"
import {Link} from "react-router-dom"

import React, { useState } from 'react';
import "./NavMarketPlace.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function NavMarketPlace() {

    function btnPublic() {
        
    }

    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownVisible(prevState => !prevState);
    };

    return (
        <section>
            <nav className="dropdown-center">
                <h2>TruequePlus</h2>
                <button onClick={btnPublic}>Publicar</button>
                <button
                    className="btn btn-secondary"
                    type="button"
                    onClick={toggleDropdown}  
                >
                    <img src="bx-category.svg" alt="icon" /> Categorías
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-down-short" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4"/>
                    </svg>
                    
                </button>

                <ul className={`dropdown-menu ${isDropdownVisible ? 'show' : ''}`}>
                    <li> <Link to={"/login"}> Tecnología </Link> </li>
                    <li>Hogar</li>
                    <li>Ropa y Accesorios</li>
                    <li>Herramientas</li>
                    <li>Libros y material de estudio</li>
                    <li>Servicios</li>
                    <li>Deporte</li>
                    <li>Arte</li>
                    <li>Juguetes y entretenimiento</li>
                </ul>

                <input type="search" name="" placeholder='Buscar producto' id="" />
                <div className="Profil">
                    <svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" fill="white" class="bi bi-person" viewBox="0 0 16 16">
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                    </svg>

                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-bookmark" viewBox="0 0 16 16">
                        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z"/>
                    </svg>  

                </div>

            </nav>

           

        </section>
    );
}

export default NavMarketPlace;
