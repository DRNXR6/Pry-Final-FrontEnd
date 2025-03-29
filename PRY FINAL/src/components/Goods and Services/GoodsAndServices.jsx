import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import publicaciones from "../services/publicaciones.js";

function GoodsAndServices() {

  const categoria = JSON.parse(localStorage.getItem("categoria"));
  const [Publications, SetPublications] = useState([])

    useEffect(() => {
        async function fetchDataUsers() {
            const Datos = await publicaciones.getPublications();
            SetPublications(Datos);

        };

        fetchDataUsers()

        
    }, []);
    

    // function FunctionDetails(id) {
    //     setTimeout(() => {
    //         localStorage.setItem("IdItem", JSON.stringify(id));
    //         navigate("/details");
    //     }, 100);
    // }


    return (
        <section>

          {Publications.map((publication, index) => (
            
            
            <article key={index}>
              {publication.titulo}
            </article>

          ))}
       
        </section>
    );
}

export default GoodsAndServices
;

