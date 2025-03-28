import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import publicaciones from "../services/publicaciones.js";

function GoodsAndServices() {

    useEffect(() => {
        async function fetchDataUsers() {
            const Datos2 = await publicaciones.getPublications();
            SetPublications(Datos2);

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
        <section>
          

          
        </section>
    );
}

export default GoodsAndServices
;

