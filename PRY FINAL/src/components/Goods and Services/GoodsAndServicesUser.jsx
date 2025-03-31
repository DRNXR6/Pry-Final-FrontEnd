import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Swal from "sweetalert2";

import publicaciones from "../services/publicaciones.js";

import "./GoodsAndServicesPublic.css";

function GoodsAndServicesUser() {

  const navigate = useNavigate();
  const PublicCategory = JSON.parse(localStorage.getItem("categoria"));
  const [Publications, SetPublications] = useState([]);
  const [valueSearch, SetValueSearch] = useState("");

  useEffect(() => {
    async function fetchDataUsers() {
      const Datos = await publicaciones.getPublications();
      SetPublications(Datos);
    };

    fetchDataUsers();
  }, []);

  function FNValueSearch(evento) {
    SetValueSearch(evento.target.value);
  }

  function btnChat() {
    navigate("/chatPage");
  }

  const mostrarProfil = () => {
    setIsDroProfilVisible(prevState => !prevState);
  };

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
        localStorage.clear();
        navigate("/login");
      }
    });
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
            if (id === Public.id) {
              publicaciones.updatePublications(Public.usuario, Public.id, PublicEdit, Public.fecha, Public.calificacion, Public.categoria, Public.estado, Public.descripcion, Public.imgName);
              location.reload();
            }
          });
        }, 500);
        return { PublicEdit };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Publicación Actualizada',
          icon: 'success',
          showConfirmButton: false
        });
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
    }).then((result) => {
      if (result.isConfirmed) {
        publicaciones.deletePublications(id);
        setTimeout(() => {
          location.reload();
        }, 100);
      }
    });
  }

  function FunctionDetails(id) {
    setTimeout(() => {
      localStorage.setItem("IdItem", JSON.stringify(id));
      navigate("/details");
    }, 100);
  }

  const filteredPublications = Publications.filter((publication) => {
    return (
      (PublicCategory ? publication.categoria === PublicCategory : true) &&
      (valueSearch ? publication.titulo.toLowerCase().includes(valueSearch.toLowerCase()) : true)
    );
  });

  function BtnVolver() {
    navigate(-1)
  } 

  return (
    <main>
      <nav className="dropdown-center">
        <h2>TruequePlus</h2>


        <input type="search" value={valueSearch} onChange={FNValueSearch} placeholder='Buscar producto' />

        <div className="btn-group">
          <button type="button" className="btn" data-bs-toggle="dropdown" aria-expanded="false">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
            </svg>
          </button>
          <div id="DropMenu">
            <ul className="dropdown-menu">
              <li onClick={btnChat}>
                <p className="dropdown-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" className="bi bi-chat-left-text" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                    <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6m0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
                  </svg>
                  Chats
                </p>
              </li>
              <li onClick={mostrarProfil}>
                <p className="dropdown-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" className="bi bi-person" viewBox="0 0 16 16">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                  </svg>
                  Perfil
                </p>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li onClick={exit}>
                <p className="dropdown-item">
                  Salir
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
                    <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                  </svg>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </nav>

        <section id="container">
          <div className="svgBack">
            <div onClick={BtnVolver} className="BntSvgBack">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
              </svg>
              <h4>Volver</h4>
            </div>
          </div>


          <div id="ContgANDs">

            {filteredPublications.length === 0 ? (
              <p className="NoFound"> No hay publicaciones disponibles en esta categoría.</p>
            ) : (
              filteredPublications.map((publication, index) => (

                <article key={index}>
                  <div className="ItemCard2">
                    <img onClick={(e) => FunctionDetails(publication.id)} className="imgCard2" src={publication.imgName} alt="" />
                    
                    <footer className="ItemFooter2">
                      <p className="pTitle2">{publication.titulo}</p>
                    </footer>

                  </div>
                </article>
                
              ))
            )}
          </div>
        </section>

    </main>
  );
}

export default GoodsAndServicesUser;
