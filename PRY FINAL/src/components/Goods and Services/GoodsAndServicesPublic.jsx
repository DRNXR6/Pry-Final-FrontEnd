import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';

import publicaciones from "../services/publicaciones.js";


import "./GoodsAndServicesPublic.css";

function GoodsAndServicesPublic() {

  // const PublicCategory = JSON.parse(localStorage.getItem("categoria"));
  const [Publications, SetPublications] = useState([])
  const navigate = useNavigate()

    useEffect(() => {
        async function fetchDataUsers() {
            const Datos = await publicaciones.getPublications();
            SetPublications(Datos);

        };

        fetchDataUsers()

        
    }, []);
    

    function FunctionDetails(id) {
        setTimeout(() => {
            localStorage.setItem("IdItem", JSON.stringify(id));
            navigate("/details");
        }, 100);
    }

    

    return (
        <section className="margin" id="ContgANDs">

          {Publications.map((publication, index) => (
            
        


            <article key={index}>
              <div className="ItemCard2">
                <img onClick={() => FunctionDetails(publication.id)} className="imgCard2" src={publication.imgName} alt="" />
                {/* <img className="imgCard2" src={publication.imgName} alt="" /> */}

              
                <footer className="ItemFooter2">
                  <p className='pTitle2'>{publication.titulo}</p>
                  

                </footer>
              </div>
            </article>              
              
              
  
            


          ))}
       
        </section>
    );
}

export default GoodsAndServicesPublic

