let base_url = 'https://serveur-3988.onrender.com'

function listerUser() {
    const userList = document.getElementById('liste');
    userList.innerHTML = '';

    fetch(`${base_url}/liste`)
        .then(response => response.json())
        .then(users => {
            users.forEach(user => {
                const row = document.createElement('tr');
                let keys = Object.keys(user);
                console.log(user[keys[0]]);
                row.innerHTML = `
                    <td>${user[keys[0]]}</td>
                    <td>${user.email}</td>
                    <td>${user.username}</td>
                    <td>${user.role}</td>
                    <td>
                        <button onclick='editerUser(${JSON.stringify(user)})'>Modifier</button>
                        <button onclick='deleteUser("${user.username}")'>Supprimer</button>
                    </td>
                `;
                userList.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Erreur lors de la récupération de la liste des utilisateurs:', error);
        });
}


function ajouterUser() {
    const nom = document.getElementById('userNom').value;
    const email = document.getElementById('userEmail').value;
    const username = document.getElementById('userUsername').value;
    const password = document.getElementById('userPassword').value;
    const role = document.getElementById('userRole').value;

    const user = { nom, email, username, password, role };

    fetch(`${base_url}/ajouter`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la sauvegarde de l\'utilisateur');
            }
            return response.json();
        })
        .then(data => {
            console.log(data.message);
            fermerForm();
            listerUser();
        })
        .catch(error => {
            console.error('Erreur:', error);
        });

    return false;
}

function editerUser(user) {
     document.getElementById('userNom').value = user.nom;
     document.getElementById('userEmail').value = user.email;
     document.getElementById('userUsername').value = user.username;
     document.getElementById('userPassword').value = user.password;
     document.getElementById('userRole').value = user.role;
 
     document.getElementById('nouveau').innerText = 'Modifier';
     document.getElementById('sectionUser').classList.remove('hidden');
 
     document.getElementById('userForm').onsubmit = function(event) {
         event.preventDefault();
 
         const updatedUser = {
             nom: document.getElementById('userNom').value,
             email: document.getElementById('userEmail').value,
             password: document.getElementById('userPassword').value,
             role: document.getElementById('userRole').value
         };
 
         fetch(`${base_url}/update/${user.username}`, {
             method: 'PUT',
             headers: {
                 'Content-Type': 'application/json',
             },
             body: JSON.stringify(updatedUser),
         })
         .then(response => {
             if (!response.ok) {
                 throw new Error('Erreur lors de la mise à jour de l\'utilisateur');
             }
             return response.json();
         })
         .then(data => {
             console.log(data.message);
             fermerForm();
             listerUser();
         })
         .catch(error => {
             console.error('Erreur:', error);
         });
     };
}

function deleteUser(username) {
    fetch(`${base_url}/delete/${username}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la suppression de l\'utilisateur');
        }
        return response.json();
    })
    .then(data => {
        console.log(data.message);
        listerUser(); 
    })
    .catch(error => {
        console.error('Erreur:', error);
    });
}

function showUserForm() {
    document.getElementById('sectionUser').classList.remove('hidden');
    document.getElementById('nouveau').innerText = 'Ajouter un utilisateur';
    document.getElementById('userForm').reset();
    editingUserIndex = -1;
}

function fermerForm() {
    document.getElementById('sectionUser').classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
    listerUser();
});