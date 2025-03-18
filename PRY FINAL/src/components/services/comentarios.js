async function getComments() {
    try {
        const response = await fetch('http://localhost:3000/comments', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error fetching comments');
        }

        const comments = await response.json();
        return comments;
    } catch (error) {
        console.error('Error fetching comments:', error);
        throw error;
    }
}


//////////LLAMADO POST//////////

async function postComments(nombre,email,comentario) {
    try {
     
        const commentsData = {
            nombre,
            email,
            comentario
                    
        };

        const response = await fetch("http://localhost:3000/comments", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(commentsData)
        });

     
        return await response.json();

        
    } catch (error) {
        console.error('Error posting comments:', error);
        throw error;
    }
}


//////////////LLAMADO UPDATE/////////////


async function updateComments(nombre,email,comentario,id) 
{
    try {
     
        const commentsData = {
            nombre,
            email,
            comentario
                    
        };

        const response = await fetch("http://localhost:3000/comments/"+id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(commentsData)
        });

     
        return await response.json();
    } catch (error) {
        console.error('Error update commen:', error);
        throw error;
    }
}


//////////////LLAMADO DELETE/////////////


async function deleteComments(id) {
    try {
        const response = await fetch(`http://localhost:3000/comments/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error deleting comments with id ${id}`);
        }

        return { message: `comments with id ${id} deleted successfully` };
    } catch (error) {
        console.error('Error deleting comments:', error);
        throw error;
    }
}

export default { getComments, postComments, updateComments, deleteComments };
