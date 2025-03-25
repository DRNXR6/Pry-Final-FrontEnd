import React, { useState, useEffect } from 'react'
import publicaciones from '../services/publicaciones';
import "./Details.css"
import Swal from 'sweetalert2'

function Details() {


    const IdItem = JSON.parse(localStorage.getItem("IdItem"));
    const [Publications, SetPublications]=useState([])
    const [Calif, SetCalif]=useState()

    let calificacion = "";


    
    useEffect(() => {
        
        async function fetchDataUsers() {
        
        const Datos = await publicaciones.getPublications()
            
        SetPublications(Datos)
        };
    
        fetchDataUsers()
    
    }, [])

    
    function FnCalificar(id, calificacionDada) {
        
        console.log(calificacionDada);
        
    }

    function btnCalificar(id) {

        Swal.fire({
            title: "Calificar",
            html: `
            <button id="BtnCalif1" >⭐</button>
            <button id="BtnCalif2" >⭐</button>
            <button id="BtnCalif3" >⭐</button>
            <button id="BtnCalif4" >⭐</button>
            <button id="BtnCalif5" >⭐</button>
            `,

            showCancelButton: true,
            showConfirmButton: false,
            
            preConfirm: () => {


                const BtnCalif1 = document.getElementById('BtnCalif1');
                const BtnCalif2 = document.getElementById('BtnCalif2');
                const BtnCalif3 = document.getElementById('BtnCalif3');
                const BtnCalif4 = document.getElementById('BtnCalif4');
                const BtnCalif5 = document.getElementById('BtnCalif5');

                BtnCalif1.addEventListener('click', () => {

                })

                FnCalificar(id, calificacion)
   
                return { BtnCalif1, BtnCalif2, BtnCalif3, BtnCalif4, BtnCalif5 };
            }

          })
    }

    for (let index = 0; index < Publications.length; index++) {
        const element = Publications[index];

        if(element.id == IdItem) {

            if(element.calificacion == 0){
                calificacion = "No calificado";
            }
            else if (element.calificacion == 1) {
                calificacion = "⭐";
            }
            else if (element.calificacion == 2) {
                calificacion = "⭐⭐";
            }
            else if (element.calificacion == 3) {
                calificacion = "⭐⭐⭐";
            }
            else if (element.calificacion == 4) {
                calificacion = "⭐⭐⭐⭐";
            }
            else if (element.calificacion == 5) {
                calificacion = "⭐⭐⭐⭐⭐";    
            }
        }

    }


  return (
    <div>       

        <main className='ContIPublicationDetails'>
        
            {(

                Publications.filter(Item => Item.id == IdItem).map((publication, index) => (
        
                    <article key={index}  >

                    
                        <section className="ItemCardDetails">
                            
                            <div className="imgCardDetails">

                                <img className='imgDetails' src={publication.imgName} alt="" />
                            </div>

                            <section className="ContPDetails">

                                <header className='HeaderDetails'>

                                    <div className="calificacion">
                                    
                                        <p className='stars'> {calificacion}</p>
                                    </div>

                                    <div className="actions">
                                        <button onClick={e => btnCalificar(publication.id)} className="Calificar">Calificar</button>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-bookmark" viewBox="0 0 16 16">
                                            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z"/>
                                        </svg> 
                                    </div>
                                </header>



                                <p className='pTitleDetails'>{publication.titulo} </p>
                                <p className='pDateDetails'> Publicado el: {publication.fecha} </p>
                                <p className='pStateDetails'> Estado: {publication.estado} </p>
                                {/* <p className='pPriceDetails'>${publication.precio} </p> */}

                                <p>Descripción:</p>
                                <p className='pDescriptionDetails'>{publication.descripcion} </p>


                                <div className="ContSendsms">
                                    <p>Envía un mensaje al propietario para negociar</p>

                                    <div className="SendSms">
                                        <input type="text" placeholder="Hola, ¿Podrías darme más información?" />
                                        <button>Enviar</button>
                                    </div>
                                </div>

                                <div className="ubicacionDetails">
                                    <p>Ubicación</p>
                                    {/* <p>{publication.ubicacion}</p> */}
                                </div>

                            </section>

                            

                        </section >

                    </article>

                ))

            )}      

        </main>

    </div>
  )
}

export default Details
