import React from 'react'
import { useEffect, useState } from 'react';
import "./ChatBox.css"
import publicaciones from '../services/publicaciones';
import SMS from '../services/SMS';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function ChatBox() {

    const [SmsDB, SetSmsDB]=useState([])
    const [Publications, SetPublications]=useState([])

    const IdItem = JSON.parse(localStorage.getItem("IdItem"));

    const UserReceptor = JSON.parse(localStorage.getItem("UserOwner"));
    const UserRemitente = JSON.parse(localStorage.getItem("usuarioActual"));
    let TitleP = "";

    const navigate = useNavigate()


    useEffect(() => {
        
        async function fetchDataUsers() {
        
        const Datos = await SMS.getSms()
        const Datos2 = await publicaciones.getPublications()

        SetSmsDB(Datos)
        SetPublications(Datos2)

        };
    
        fetchDataUsers()
    
    }, [])

    function btnClose() {
        setTimeout(() => {
            
            navigate("/MarketPlace")
        }, 300);
    }
    
    Publications.filter(p => p.id === IdItem).map((TITLE) => (

            TitleP = TITLE.titulo
    ))

    console.log("UserReceptor: " + UserReceptor)
    console.log("UserRemitente: " + UserRemitente)


    async function ChatDelete() {

        SmsDB.filter(DSMS => DSMS.IdItem == IdItem && DSMS.usuario == UserReceptor && DSMS.Remitente == UserRemitente).map((chatDeleteID) => (
            
            console.log(chatDeleteID.id)

            // Swal.fire({
            //     title: '¿Estás seguro de eliminar el chat?',
            //     showCancelButton: true,
            //     confirmButtonText: 'Eliminar',
            //     cancelButtonText: 'Cancelar',
            //     confirmButtonColor: '#FF0000',
            //     cancelButtonColor: 'darkcyan',

            // }).then((result) => {
            //     if (result.isConfirmed) {
            //         Swal.fire({
            //             title: 'Consulta Eliminada',
            //             icon: 'success',
            //             showConfirmButton: false
            //         })
            //         setTimeout(() => {
            //             SMS.deleteSms(IdItem)
                           
            //             location.reload()     

            //         }, 600);
      
    
                    
            //     }
            // })
        ))

    }


  return (
    <div id='ContSms'>

        <div class="card">
            <header class="chat-header">
                <div className='headerChat'>
                    <svg onClick={btnClose} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
                    </svg>


                    <p>{UserReceptor} - {TitleP} </p>
                </div>

                <svg onClick={ChatDelete} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                </svg>
            </header>


            <section className="chat-window">

                {SmsDB.map((sms, index) => (

                    <div key={index} id='ContChat'>
                        

                            {sms.IdItem === IdItem && sms.usuario === UserReceptor && sms.Remitente === UserRemitente && (

                                    <article className=" Box smsReceptor">
                                        <p>{sms.smsEnviar}</p>
                                    </article>

                            )}

                            {sms.IdItem === IdItem && sms.usuario === UserRemitente && sms.Remitente === UserReceptor && (

                            <article className=" Box smsRemitente">
                                <p>{sms.smsEnviar}</p>
                            </article>

                            )}


                    </div>

                ))}
            </section>


            <div class="chat-input">
                <input type="text" class="message-input" placeholder="Type your message here"/>
                <button class="send-button">Send</button>
            </div>
        </div>
  
    </div>
  )
}

export default ChatBox
