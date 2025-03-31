import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import publicaciones from "../services/publicaciones";
import llamados from '../services/llamados.js'

import "./ContMarketPlace.css";
import Swal from 'sweetalert2';

function ContMarketPlace() {

    const UsuarioIngresado = JSON.parse(localStorage.getItem("usuarioActual"));
    const [Users, SetUsers] = useState([]);

    const [Publications, SetPublications] = useState([]);


    const [image, setImage] = useState(null);
    const [message, setMessage] = useState('');
    const [titulo, setTitulo] = useState('');
    const [categoria, setCategoria] = useState('');
    const [estado, setEstado] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const [AlternarContenedores, setAlternarContenedores] = useState(true);

    let imgUrl = "";
    let countPublications = 0;

    const [ContadorPublic, SetContadorPublic] = useState()

    const navigate = useNavigate();
    const [valueSearch, SetValueSearch] = useState("");
    
    useEffect(() => {
      async function fetchDataUsers() {
          const Datos = await llamados.getUsers();
          SetUsers(Datos);
      };

      fetchDataUsers()

      
  }, []);

    useEffect(() => {
        async function fetchDataUsers() {
            const Datos2 = await publicaciones.getPublications();
            SetPublications(Datos2);

        };

        fetchDataUsers()

        
    }, []);
    
    const [IsDroProfilVisible, setIsDroProfilVisible] = useState(false);

    const mostrarProfil = () => {
      
      setIsDroProfilVisible(prevState => !prevState);
    };

    function FNValueSearch(evento) {
      SetValueSearch(evento.target.value)
    }
    
    const filteredConsultas = Publications.filter((consulta) =>
      
      consulta.titulo.toUpperCase().includes(valueSearch.toUpperCase()) || consulta.categoria.toUpperCase().includes(valueSearch.toUpperCase()) ||  consulta.descripcion.toUpperCase().includes(valueSearch.toUpperCase())

    );



    function exit() {

      Swal.fire({
        title: "Cerrar sesión?",
        text: "",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Aceptar!"

    }).then((result) => {

        if (result.isConfirmed) {
          localStorage.clear()
          navigate("/login")
        }
    })

    }

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



    function bntPublic() {
      
      let [nameIMG, extIMG] = image.name.split("."); 


      let NameImg = nameIMG;
      let ExtImg = extIMG;

      let IMGExistente = false;
      let counterExist = false;

      let counter = 1;
      let NewCounter = 1;




      let contador = 0;




      Publications.map((publication) => {
  

        if (publication.imgName.includes(image.name) && publication.imgName.includes("(")) {    //Con (n)
          
          let [nameCounter, counterE] = publication.imgName.split("("); 

          NameImg = nameCounter;
          

          let NumINT = counterE.match(/\d+/g);
          
          let Num = NumINT.map(num => parseInt(num, 10)); 
          
          NewCounter = (Num.length > 0 ? Num[0] : 0) + 1;
          console.log("NewCounter " + NewCounter);
          
          IMGExistente = true;
          counterExist = true;
        }

        else if(counterExist == false && publication.imgName.includes(image.name) ){ //Sin (n)          
          IMGExistente = true;

        }


        Users.map((User) => {


          if(User.nombre == UsuarioIngresado) {

            console.log(User.nombre);

                 
            
            
            llamados.updateUsers(User.nombre,User.email,User.rol,User.contraseña,contador,User.favoritos,User.calificacion)
          }

      }) 


      })
      
      if(IMGExistente == true && counterExist == true){
      
        imgUrl = "uploads/" + NameImg + "(" + NewCounter + ")" + "." + ExtImg;
        console.log("imgUrl " + imgUrl);

      }

      else if (IMGExistente == true) {

        imgUrl ="uploads/" + NameImg + "(" + counter + ")" + "." + ExtImg;
        counter++;

      }
      else {

        imgUrl = "uploads/" + image.name
        counter++;

      }

      let fecha = new Date().toLocaleString('es-ES', { hour12: false, second: '2-digit', minute: '2-digit', hour: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' }).slice(0, -3);
      let calificacion = 0;

      publicaciones.postPublications(UsuarioIngresado,titulo,fecha,calificacion, categoria, estado, descripcion, imgUrl);

      //usar el useState para actualizar los cambios, recibiendo la respuesta del servidor del db.Json
      location.reload();
  }
  
  function btnEdit(id) {
  
    Swal.fire({
      title: 'Editar Publicación',
      html: `
         
          <textarea id="PublicEdit" class="swal2-textarea" placeholder="Nuevo titulo"></textarea>

      `,
      confirmButtonText: 'Enviar',
      showCancelButton: true,

      focusConfirm: false,
      preConfirm: () => {

          const PublicEdit = document.getElementById('PublicEdit').value;
          

          if (!PublicEdit) {
              Swal.showValidationMessage('Por favor, complete el campo.');
          }
          setTimeout(() => {
            
            let fecha = new Date().toLocaleString('es-ES', { hour12: false, second: '2-digit', minute: '2-digit', hour: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' }).slice(0, -3);

            Publications.map((Public) => {

              if(id == Public.id){

                console.log("imgName " + Public.imgName);
  
                console.log(id);
                
                
                publicaciones.updatePublications(Public.usuario,Public.id, PublicEdit, Public.fecha,Public.calificacion, Public.categoria, Public.estado, Public.descripcion, Public.imgName);
             
                location.reload();
              }
            })

          }, 500);
          
          return { PublicEdit };
      }
    }).then((result) => {
        
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Publicación Actualizada',
                icon: 'success',
                showConfirmButton: false
            })
            
        }
    });

  }

  async function btnDelete(id) {


    Swal.fire({
      title: "Deseas eliminar esta publicación?",
      text: "",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar",

      // customClass: {
      //   popup: 'popup',
      //   title: 'title',
      //   actions: 'actions',
      //   icon:"icon",
      //   confirmButton: 'btnConfirm',
      //   cancelButton: 'btnCancel',
      // },

    }).then((result) => {

        if (result.isConfirmed) {
            publicaciones.deletePublications(id);

            setTimeout(() => {
              location.reload();
            }, 100)
        }
    })


    // await fetch('http://localhost:3001/delete-image', {
    //   method: 'DELETE',
    //   headers: {
    //       'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ imageName: 'mi-imagen.jpg' }),
    // });
  


  }

  function btnChat() {
    navigate("/chatPage")
  }

  const btnCambiarContenedores = () => {
    setAlternarContenedores(!AlternarContenedores);
  };

  function IrAProductos(categoria) {
    localStorage.setItem("categoria", JSON.stringify(categoria));
    navigate("/GoodsAndServicesPageUser")    
  }
  
    return (
        <section>
            <nav className="dropdown-center">
                <h2>TruequePlus</h2>

                <button className='btn btnCambioContenedor' onClick={btnCambiarContenedores}>
                  {AlternarContenedores} Publicar
                </button>

                <input type="search" value={valueSearch} onChange={FNValueSearch} placeholder='Buscar producto' id="" />

                <div class="btn-group">
                  <button type="button" class="btn" data-bs-toggle="dropdown" aria-expanded="false">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                    </svg>
                  </button>

                  <div id="DropMenu">
                    <ul class="dropdown-menu">
                      <li onClick={btnChat}>
                        <p class="dropdown-item">
                          <svg  xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" class="bi bi-chat-left-text" viewBox="0 0 16 16">
                            <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                            <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6m0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
                          </svg>
                            Chats
                        </p>
                      </li>
                      
                      <li onClick={mostrarProfil}>
                        <p class="dropdown-item">
                        
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" class="bi bi-person" viewBox="0 0 16 16">
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                          </svg>
                          Perfil
                        </p>
                      </li>

                      <li><hr class="dropdown-divider"/></li>

                      <li onClick={exit}>
                        <p class="dropdown-item">
                            Salir
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                              <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                              <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                            </svg>
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
            </nav>

            {AlternarContenedores && (

              <div id="contMain">
                <br />
                <br />
                <br />
                <br />
                <main className='ContIPublications'>
               
                    {filteredConsultas.map((publication, index) => (
                        <article key={index}>
                            <div className="ItemCard">
                                <img onClick={() => FunctionDetails(publication.id)} className="imgCard" src={publication.imgName} alt="" />
                                
                                <footer className="ItemFooter">
                                  <p className='pTitle'>{publication.titulo}</p>

                                </footer>
                            </div>
                        </article>
                  ))}

                {filteredConsultas.length === 0 && <h4 className="NoFound">No se encontraron resultados.</h4>}

                </main>

              </div>
            )}

          {!AlternarContenedores && (


            <div className="FormContPrincipal">
              <div className="form-container">
                <h2>Crear Publicación</h2><br />
                

                <div className="form-group">
                    <input id="fileInput" type="file" accept="image/*" onChange={handleFileChange} required className="input-field"/>
                </div><br />

                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input type="text" id="titulo"value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Título" required className="input-field"/>
                  </div>

                  <div className="form-group">
                    <select id="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)} required className="input-field">
                      <option value="">Selecciona una categoría</option>
                      <option value="tecnologia">Tecnología</option>
                      <option value="hogar">Hogar</option>
                      <option value="RyP">Ropa y Accesorios</option>
                      <option value="herramientas">Herramientas</option>
                      <option value="libros">Libros y materiales de estudio</option>
                      <option value="servicios">Servicios</option>
                      <option value="deportes">Deporte</option>
                      <option value="arte">Arte</option>
                      <option value="juguetes">Juguetes y entretenimiento</option>
                      <option value="otro">Otro</option>

                    </select>
                  </div>

                  <div className="form-group">
                    <select id="estado" value={estado} onChange={(e) => setEstado(e.target.value)} required className="input-field">
                      <option value="">Selecciona un estado</option>
                      <option value="Nuevo">Nuevo</option>
                      <option value="Como Nuevo">Usado - Como nuevo</option>
                      <option value="Aceptable">Usado - Aceptable</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <textarea id="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Descripción" required className="input-field"/>
                  </div>


                  <button onClick={bntPublic} type="submit" className="submit-button">Publicar</button>
                  <p id="Message">{message}</p>
                </form>
                
              </div>

            </div>
          )}

            <h2 className="h2">Filtrar por categoria</h2>
            <section id='ContCategories'>
              <article onClick={e => IrAProductos("tecnologia")} className="ItemCategory">
                  <h1>Tecnología</h1>
                  <img src="Tecnologia.webp" alt="" />
              </article>

              <article onClick={e => IrAProductos("hogar")} className="ItemCategory">
                  <h1>Hogar</h1>
                  <img src="Hogar.jpg" alt="" />

              </article>

              <article onClick={e => IrAProductos("RyP")} className="ItemCategory">
                  <h1>Ropa y Accesorios</h1>
                  <img src="RyA.jpg" alt="" />
              </article>
              
              <article onClick={e => IrAProductos("herramientas")} className="ItemCategory">
                  <h1>Herramientes</h1>
                  <img src="Herramientas.jpg" alt="" />
              </article>

              <article onClick={e => IrAProductos("libros")} className="ItemCategory">
                  <h1>Libros y más..</h1>
                  <img src="LibrosyM.jfif" alt="" />
              </article>

              <article onClick={e => IrAProductos("servicios")} className="ItemCategory">
                  <h1>Servicios</h1>
                  <img src="Servicios.jpg" alt="" />
              </article>

              <article onClick={e => IrAProductos("deportes")} className="ItemCategory">
                  <h1>Deporte</h1>
                  <img src="Deporte.jpg" alt="" />

              </article>

              <article onClick={e => IrAProductos("arte")} className="ItemCategory">
                  <h1>Arte</h1>
                  <img src="Arte.avif" alt="" />
              </article>

              <article onClick={e => IrAProductos("juguetes")} className="ItemCategory">
                  <h1>Juguetes y entretenimiento</h1>
                  <img src="Juguetes.avif" alt="" />
              </article>

              <article onClick={e => IrAProductos("otro")} className="ItemCategory">
                  <h1>Otro</h1>
                  <img src="Otros.png" alt="" />
              </article>
          
            </section>


          <div className="card2" style={{display: IsDroProfilVisible ? 'block' : 'none'}} 
          >
  
              <div class="infos">
            
                  <div className="image">
                    <img src="profil.jpg" alt="" />
                  </div>

                  <div className="info">                          
                    <h1 className="name">
                        {JSON.parse(localStorage.getItem("usuarioActual"))}
                    </h1>
                    
                    
                      <div className="stats">
                              <p className="flex flex-col">
                                  Publicaciones
                                  <span className="state-value">
                                      {countPublications}
                                  </span>
                              </p>
                              <p className="flex">
                                  Favoritos
                                  <span className="state-value">
                                      455
                                  </span>
                              </p>
                              
                      </div>
                  </div>
              </div>
              
             
          </div>



        </section>
    );
}

export default ContMarketPlace;

