async function getPublications() {
    try {
        const response = await fetch('http://localhost:3000/publications', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error fetching publications');
        }

        const publications = await response.json();
        return publications;
    } catch (error) {
        console.error('Error fetching publications:', error);
        throw error;
    }
}


//////////LLAMADO POST//////////

async function postPublications(usuario, titulo, fecha, calificacion, categoria, estado, descripcion, imgName) {
    try {
        const publicationData = {
            usuario,
            titulo,
            fecha,
            calificacion,
            categoria,
            estado,
            descripcion,
            imgName
        };

        const response = await fetch("http://localhost:3000/publications", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(publicationData)
        });

        // Verificar si la respuesta es exitosa (status 2xx)
        if (!response.ok) {
            throw new Error('Error posting publication');
        }

        // Asegúrate de que el servidor devuelve JSON
        return await response.json();

    } catch (error) {
        console.error('Error posting publication:', error);
        throw error;
    }
}



//////////////LLAMADO UPDATE/////////////


async function updatePublications(usuario,id,titulo,fecha,calificacion,categoria,estado,descripcion,imgName) 
{
    try {
     
        const publicationData = {
            usuario,
            titulo,
            fecha,
            calificacion,
            categoria,
            estado,
            descripcion,
            imgName
        
        };


    

        const response = await fetch("http://localhost:3000/publications/"+id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(publicationData)
        });

     
        return await response.json();
    } catch (error) {
        console.error('Error update publication:', error);
        throw error;
    }
}




//////////////LLAMADO DELETE/////////////


async function deletePublications(id) {
    try {
        const response = await fetch(`http://localhost:3000/publications/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error deleting publication with id ${id}`);
        }

        return { message: `publication with id ${id} deleted successfully` };
    } catch (error) {
        console.error('Error deleting publication:', error);
        throw error;
    }
}

export default { getPublications, postPublications, updatePublications, deletePublications };
