import React, { useState } from 'react'
import "./Contacto.css"
import comentarios from '../services/comentarios.js'
import Swal from "sweetalert2"

function ContactoForm() {

    const [nombreRemitente, SetNombreRemitente]=useState()
    const [emailRemitente, SetEmailRemitente]=useState()
    const [comentarioRemitente, SetComentarioRemitente]=useState()

    function nomRemitente(evento) {
        SetNombreRemitente(evento.target.value.trim())
    }

    function ValueEmailRemitente(evento) {
        SetEmailRemitente(evento.target.value.trim())
    }

    function commentRemitente(evento) {
        SetComentarioRemitente(evento.target.value.trim())
    }

    function contactar() {

        if(nombreRemitente == "" || emailRemitente == "" || comentarioRemitente == "") {

            Swal.fire({
                title: "Por favor completa todos los campos!",
                icon: "info",
            })
      
        }
        else {

            if(!(emailRemitente.includes("@"))) {
                Swal.fire({
                    title: "Porfavor ingresa un correo valido!",
                    icon: "info",
                })
            }
            else {
                comentarios.postComments(nombreRemitente, emailRemitente, comentarioRemitente)

                Swal.fire({
                    title: "Enviado correctamente",
                    icon: "success",
                })
    
                SetNombreRemitente("")
                SetEmailRemitente("")
                SetComentarioRemitente("")
            }
    
        }

    }


    return (
        <section className='ContForm'>

            <div class="form">
                <br />
                <div class="title">Contáctenos</div>
                <br />

                <input value={nombreRemitente} onChange={nomRemitente} type="text" placeholder='Nombre' />
                <input value={emailRemitente} onChange={ValueEmailRemitente} type="text" placeholder="Email" class="input"/>
                <textarea value={comentarioRemitente} onChange={commentRemitente} placeholder="Escribe tu comentario"></textarea>
                
                <div className="btns">
                    <button onClick={contactar} className='btnEnviar'> Enviar</button>
                </div>
            </div>
        </section>

    )
    
}

export default ContactoForm
