import "./ContMarketPlace.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import publicaciones from "../services/publicaciones";

function ContMarketPlace() {
    const [Publications, SetPublications] = useState([]);

    const [image, setImage] = useState(null);
    const [message, setMessage] = useState('');
    const [titulo, setTitulo] = useState('');
    const [categoria, setCategoria] = useState('');
    const [estado, setEstado] = useState('');
    const [descripcion, setDescripcion] = useState('');


    const navigate = useNavigate();

    useEffect(() => {
        async function fetchDataUsers() {
            const Datos = await publicaciones.getPublications();
            SetPublications(Datos);
        };
        fetchDataUsers();
    }, []);

  

    function btnPublic() {
      // Mostrar el form Publications
    }

    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownVisible(prevState => !prevState);
    };

    function FunctionDetails(id) {
        setTimeout(() => {
            localStorage.setItem("IdItem", JSON.stringify(id));
            navigate("/details");
        }, 100);
    }


    const handleFileChange = (e) => {
      setImage(e.target.files[0]);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!image) {
        setMessage('Por favor selecciona una imagen primero.');
        return;
      }
  
      const formData = new FormData();
      formData.append('image', image);
  
      try {
        const response = await fetch('http://localhost:3001/upload', {
          method: 'POST',
          body: formData,
        });
  
        const data = await response.json();
        if (response.ok) {
          setMessage(`Archivo subido correctamente: ${data.filename}`);
        } else {
          setMessage('Error al subir el archivo.');
        }
      } catch (error) {
        console.error(error);
        setMessage('Error al subir el archivo.');
      }
    };

    async function bntPublic() {
      
      
      let imgUrl ="./uploads/" + image.name;
  
      publicaciones.postPublications(titulo, categoria, estado, descripcion, imgUrl);
      
    }

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
                    <li><Link to={"/login"}>Tecnología</Link></li>
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

            <main className='ContIPublications'>
                {Publications.map((publication, index) => (
                    <article key={index}>
                        <button className="ItemCard" onClick={() => FunctionDetails(publication.id)}>
                            <img className="imgCard" src={publication.imgName} alt="" />
                            <p className='pTitle'>{publication.titulo}</p>
                        </button>
                    </article>
                ))}
            </main>

            <div className="FormContPrincipal">
              <div className="form-container">
                <h2>Crear Publicación</h2>

                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="titulo">Título:</label>
                    <input type="text" id="titulo"value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Título" required className="input-field"/>
                  </div>

                  <div className="form-group">
                    <label htmlFor="categoria">Categoría:</label>
                    <select id="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)} required className="input-field">
                      <option value="">Selecciona una categoría</option>
                      <option value="tecnologia">Tecnología</option>
                      <option value="hogar">Hogar</option>
                      <option value="ropa-y-accesorios">Ropa y Accesorios</option>
                      <option value="herramientas">Herramientas</option>
                      <option value="libros">Libros y materiales de estudio</option>
                      <option value="servicios">Servicios</option>
                      <option value="deportes">Deporte</option>
                      <option value="arte">Arte</option>
                      <option value="juguetes">Juguetes y entretenimiento</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="estado">Estado:</label>
                    <select id="estado" value={estado} onChange={(e) => setEstado(e.target.value)} required className="input-field">
                      <option value="">Selecciona un estado</option>
                      <option value="Nuevo">Nuevo</option>
                      <option value="Como Nuevo">Usado - Como nuevo</option>
                      <option value="Aceptable">Usado - Aceptable</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="descripcion">Descripción:</label>
                    <textarea id="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Descripción" required className="input-field"/>
                  </div>

                  <div className="form-group">
                    <label htmlFor="fileInput">Seleccionar imagen:</label>
                    <input id="fileInput" type="file" accept="image/*" onChange={handleFileChange} required className="input-field"/>
                      
                      
                      
                  </div>

                  <button onClick={bntPublic} type="submit" className="submit-button">Publicar</button>
                </form>
              </div>

            </div>
            
        </section>
    );
}

export default ContMarketPlace;

