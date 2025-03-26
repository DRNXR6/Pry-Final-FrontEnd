import React from 'react'
import { useEffect, useState } from 'react';
import "./ChatBox.css"
import SMS from '../services/SMS';

function ChatBox() {

    const [SmsDB, SetSmsDB]=useState([])
    const IdItem = JSON.parse(localStorage.getItem("IdItem"));

    const UserReceptor = JSON.parse(localStorage.getItem("UserOwner"));
    const Remitente = JSON.parse(localStorage.getItem("usuarioActual"));



    console.log("IdItem  " + IdItem);

    console.log("UserReceptor  " + UserReceptor);
    console.log("Remitente  " + Remitente);



    useEffect(() => {
        
        async function fetchDataUsers() {
        
        const Datos = await SMS.getSms()
            
        SetSmsDB(Datos)
        };
    
        fetchDataUsers()
    
    }, [])

  return (
    <div id='ContSms'>
        <div class="card">
            <header class="chat-header">
                Chat
                <button>Close</button>
            </header>

            {SmsDB.map((sms, index) => (

                <div key={index} class="chat-window">

                   
                    <div className="DivReceptor">
                        
                    {sms.IdItem === IdItem && sms.usuario === UserReceptor} {
                            
                        <article className=" Box smsReceptor">
                            <p>{sms.usuario}</p>
                            {sms.smsEnviar}
                        </article>
                    }
                

                  
                    </div>

                    

{/* 
                    <div className="DivRemitente">
                        
                        {sms.IdItem === IdItem && sms.usuario === Remitente} {
                            
                        <article className=" Box smsRemitente">
                            <p>{sms.Remitente}</p>
                            {sms.smsEnviar}
                        </article>
                        }
                        
                    </div> */}

                </div>
            ))}
            <div class="chat-input">
                <input type="text" class="message-input" placeholder="Type your message here"/>
                <button class="send-button">Send</button>
            </div>
        </div>
  
    </div>
  )
}

export default ChatBox
