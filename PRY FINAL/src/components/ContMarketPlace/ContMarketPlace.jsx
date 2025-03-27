import "./ContMarketPlace.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import publicaciones from "../services/publicaciones";
import llamados from '../services/llamados.js'

import Swal from 'sweetalert2';

function ContMarketPlace() {

    //   const [refresh, setRefresh] = useState(false);
      
    //   useEffect(() => {
    //     console.log("El estado refresh ha cambiado:", refresh);
    // }, [refresh]);

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

    // Filtrar publicaciones por título
    
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
          navigate("/login")
            // location.reload()

            // history.pushState(null, null, window.location.href);
            // history.back();
            // history.forward();
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

      // async function postUsers(nombre,email,rol,contraseña,publicacionesPosteadas,favoritos,calificacion) {




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

      
      // location.reload();
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
  
    return (
        <section>
            <nav className="dropdown-center">
                <h2>TruequePlus</h2>

                <button className='btn btnCambioContenedor' onClick={btnCambiarContenedores}>
                  {AlternarContenedores} Publicar
                </button>

                <input type="search" value={valueSearch} onChange={FNValueSearch} placeholder='Buscar producto' id="" />

                <div className="ContProfil">
                  <svg onClick={btnChat} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-chat-left-text" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                    <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6m0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
                  </svg>

                  <svg onClick={mostrarProfil} xmlns="http://www.w3.org/2000/svg" width="37" height="37" fill="white" class="bi bi-person" viewBox="0 0 16 16">
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                  </svg>
   
                  <svg onClick={exit} xmlns="http://www.w3.org/2000/svg" width="37" height="37" fill="white" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                    <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                  </svg>
                </div>
            </nav>



            {AlternarContenedores && (

              <main className='ContIPublications'>
                  {filteredConsultas.map((publication, index) => (
                      <article key={index}>
                          <div className="ItemCard">
                              <img onClick={() => FunctionDetails(publication.id)} className="imgCard" src={publication.imgName} alt="" />
                              
                              <footer className="ItemFooter">
                                <p className='pTitle'>{publication.titulo}</p>
                                
                                <div className="ActionsCRUD">
                                  
                                    <svg onClick={e => btnEdit(publication.id)} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                      <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                    </svg>

                                    <svg onClick={e => btnDelete(publication.id)} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                    </svg>

                                </div>

                              </footer>
                          </div>
                      </article>
                ))}

              {filteredConsultas.length === 0 && <p>No se encontraron resultados.</p>}

              </main>
            )}

          {!AlternarContenedores && (


            <div className="FormContPrincipal">
              <div className="form-container">
                <h2>Crear Publicación</h2><br />
                

                <div className="form-group">
                    <label htmlFor="fileInput">Seleccionar imagen:</label>
                    <input id="fileInput" type="file" accept="image/*" onChange={handleFileChange} required className="input-field"/>
                </div><br />

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


                  <button onClick={bntPublic} type="submit" className="submit-button">Publicar</button>
                </form>
                
              </div>

            </div>
          )}


          <div className="card2" style={{display: IsDroProfilVisible ? 'block' : 'none'}}
          >
              <div class="infos">
                  <div className="image">
                    <img src="profil.jpg" alt="" />
                  </div>
                  <div className="info">
                      <div>
                          <h1 className="name">
                              {JSON.parse(localStorage.getItem("usuarioActual"))}
                          </h1>
                    
                      </div>  
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

