async function getSms() {
    try {
        const response = await fetch('http://localhost:3000/sms', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error fetching sms');
        }

        const sms = await response.json();
        return sms;
    } catch (error) {
        console.error('Error fetching sms:', error);
        throw error;
    }
}


//////////LLAMADO POST//////////

async function postSms(usuario,Remitente,smsEnviar,IdItem) {
    try {
     
        const publicationData = {
            usuario,
            Remitente,
            smsEnviar,
            IdItem
        };



        const response = await fetch("http://localhost:3000/sms", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(publicationData)
        });

     
        return await response.json();

        
    } catch (error) {
        console.error('Error posting publication:', error);
        throw error;
    }
}


//////////////LLAMADO UPDATE/////////////


async function updateSms(usuario,Remitente,smsEnviar,IdItem,id)
{
    try {
     
        const publicationData = {
            usuario,
            Remitente,
            smsEnviar,
            IdItem
        };


        


        const response = await fetch("http://localhost:3000/sms/"+id, {
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


async function deleteSms(id) {
    try {
        const response = await fetch(`http://localhost:3000/sms/${id}`, {
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

export default { getSms, postSms, updateSms, deleteSms };
