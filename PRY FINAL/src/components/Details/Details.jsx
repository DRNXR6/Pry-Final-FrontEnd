import React, { useState, useEffect } from 'react'
import publicaciones from '../services/publicaciones';

function Details() {

    const IdItem = JSON.parse(localStorage.getItem("IdItem"));
    const [Publications, SetPublications]=useState([])

    
    useEffect(() => {
        
        async function fetchDataUsers() {
        
        const Datos = await publicaciones.getPublications()
            
        SetPublications(Datos)
        };
    
        fetchDataUsers()
    
    }, [])

  return (
    <div>       

        <main className='ContIPublicationDetails'>
        
            {(

                Publications.filter(Item => Item.id == IdItem).map((publication, index) => (
        
                    <article key={index}  >

                    
                        <button  className="ItemCardDetails" onClick={e => FunctionDetails(publication.id)}>
                            
                            <div className="imgCardDetails">

                            </div>

                        <img src={publication.img} alt="" /><br /><br />

                        <p className='pTitleDetails'>{publication.titulo} </p>

                        <p className='pTitleCategory'>{publication.categoria} </p>
                        <p className='pStateDetails'>{publication.estado} </p>
                        <p className='pDescriptionDetails'>{publication.descripcion} </p>

                        <p className='pDescriptionDetails'>{publication.img} </p>

                        </button >

                    </article>

                ))

            )}      

        </main>

    </div>
  )
}

export default Details
