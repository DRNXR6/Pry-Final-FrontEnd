import React, { useState, useEffect } from 'react'  // Importación de React y hooks necesarios
import publicaciones from '../services/publicaciones';  // Servicio para obtener publicaciones
import SMS from '../services/SMS';  // Servicio para enviar SMS
import "./Details.css"  // Estilos para el componente
import Swal from 'sweetalert2'  // Librería para mostrar alertas
import { useNavigate } from 'react-router-dom';  // Hook para la navegación

function Details() {

    // Hook para navegación entre páginas
    const navigate = useNavigate()

    // Recuperamos los datos del item y usuario del localStorage
    const IdItem = JSON.parse(localStorage.getItem("IdItem"));
    const Remitente = JSON.parse(localStorage.getItem("usuarioActual"));
    const UserReceptor = JSON.parse(localStorage.getItem("UserOwner"));

    // Estado para almacenar las publicaciones
    const [Publications, SetPublications] = useState([]);
    const smsDefault = "Hola, ¿Podrías darme más información?";  // Mensaje predeterminado para el SMS

    // Estado para manejar el texto del SMS
    const [valueSMS, SetvalueSMS] = useState();

    // Función para actualizar el texto del SMS
    function FNValueSMS(evento) {
        SetvalueSMS(evento.target.value);
    }

    // Usamos useEffect para cargar las publicaciones al montar el componente
    useEffect(() => {
        async function fetchDataUsers() {
            const Datos = await publicaciones.getPublications();  // Obtenemos las publicaciones desde el servicio
            SetPublications(Datos);  // Actualizamos el estado con las publicaciones obtenidas
        };
    
        fetchDataUsers();  // Llamamos la función para obtener las publicaciones
    }, []);  // Este efecto se ejecuta solo una vez cuando el componente se monta

    // Función que se ejecuta cuando se envía un SMS
    function chatear() {
        Publications.map((publicationDetails) => {
            if (publicationDetails.id == IdItem) {
                // Guardamos el usuario propietario de la publicación en localStorage
                localStorage.setItem("UserOwner", JSON.stringify(publicationDetails.usuario));

                // Usamos el valor del SMS ingresado o el mensaje por defecto si está vacío
                let smsEnviar = valueSMS ? valueSMS : smsDefault;

                // Si hay un remitente, enviamos el SMS
                if (Remitente) {
                    SMS.postSms(publicationDetails.usuario, Remitente, smsEnviar, IdItem);
                }
            }
        });
        navigate("/chatPage");  // Navegamos a la página del chat
    }

    // Función para cerrar el componente y volver a la página anterior
    function btnClose() {
        setTimeout(() => {
            navigate(-1);  // Navegamos hacia atrás
        }, 300);
    }

    return (
        <div>       
            <main className='ContIPublicationDetails'>
                {Publications.filter(Item => Item.id == IdItem).map((publication, index) => (
                    <section id='ContItemDetails' key={index}>
                        <article>
                            <section className="ItemCardDetails">
                                {/* Ícono para volver atrás */}
                                <svg onClick={btnClose} className='svgg' xmlns="http://www.w3.org/2000/svg" width="40" height="30" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
                                </svg>

                                {/* Sección con los detalles de la publicación */}
                                <div className="imgCardDetails">
                                    <p className='pCategoryDetails'>{publication.categoria} </p>
                                    <p className='pTitleDetails'>{publication.titulo} </p>
                                    <img className='imgDetails' src={publication.imgName} alt="Producto" />
                                    <p className='pDateDetails'> Publicado el: {publication.fecha} </p>
                                </div>

                                {/* Detalles de la publicación */}
                                <section className="ContPDetails">
                                    <div>
                                        {Remitente !== publication.usuario ? (
                                            <div>
                                                <header className='HeaderDetails'>
                                                    {/* Ícono de marcador de la publicación */}
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" className="bi bi-bookmark" viewBox="0 0 16 16">
                                                        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z"/>
                                                    </svg> 
                                                </header>

                                                <p className='pStateDetails'> Estado: {publication.estado} </p>
                                                <p>Descripción:</p>
                                                <div className='pDescriptionDetails'> {publication.descripcion}</div>

                                                {/* Sección para enviar un mensaje */}
                                                <div className="ContSendsms">
                                                    <p>Envía un mensaje al propietario para negociar</p>
                                                    <div className="SendSms">
                                                        {/* Input para escribir el SMS */}
                                                        <input type="text" value={valueSMS} onChange={FNValueSMS} placeholder={smsDefault} />
                                                        <button onClick={chatear} >Enviar</button>
                                                    </div>
                                                </div>

                                                <div className="UserDetail">
                                                    {/* Mostramos el nombre del propietario */}
                                                    <p>{publication.usuario}</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <section>
                                                <br /><br /><br /><br />
                                                <p className='pStateDetails'> Estado: {publication.estado} </p>
                                                <p>Descripción:</p>
                                                <div className='pDescriptionDetails'> {publication.descripcion}</div>
                                                <br /><br />
                                                <div className="UserDetail">
                                                    {/* Si es el usuario que creó la publicación, mostramos que es "Tú" */}
                                                    <p> {publication.usuario} (Tú)</p>
                                                </div>
                                            </section>
                                        )}
                                    </div>
                                </section>
                            </section>
                        </article>
                    </section>
                ))}
            </main>
        </div>
    )
}

export default Details;
