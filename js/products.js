let base_url = 'https://serveur-3988.onrender.com'; // Assurez-vous que le port correspond à celui utilisé par votre serveur

function listerProduits() {
    const productList = document.getElementById('listeProduits');
    productList.innerHTML = '';

    // Mise à jour de la route pour lister les produits
    fetch(`${base_url}/liste-produits`)
        .then(response => response.json())
        .then(products => {
            products.forEach(product => {
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${product.categorie}</td>
                    <td>${product.nom}</td>
                    <td><img src="${product.image}" alt="${product.nom}" style="width: 50px; height: 50px;"></td>
                    <td>${product.description}</td>
                    <td>${product.prix}</td>
                    <td>${product.type}</td>
                    <td>
                        <button onclick='editerProduit(${JSON.stringify(product)})'>Modifier</button>
                        <button onclick='deleteProduit("${product.nom}")'>Supprimer</button>
                    </td>
                `;
                productList.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Erreur lors de la récupération de la liste des produits:', error);
        });
}

function ajouterProduit() {
    const categorie = document.getElementById('productCategory').value;
    const nom = document.getElementById('productName').value;
    const image = document.getElementById('productImage').value;
    const description = document.getElementById('productDescription').value;
    const prix = document.getElementById('productPrice').value;
    const type = document.getElementById('productType').value;

    const product = { categorie, nom, image, description, prix, type };

    // Mise à jour de la route pour ajouter un produit
    fetch(`${base_url}/ajouter-produit`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la sauvegarde du produit');
            }
            return response.json();
        })
        .then(data => {
            console.log(data.message);
            fermerFormProduit();
            listerProduits();
        })
        .catch(error => {
            console.error('Erreur:', error);
        });

    return false;
}

function editerProduit(product) {
    document.getElementById('productCategory').value = product.categorie;
    document.getElementById('productName').value = product.nom;
    document.getElementById('productImage').value = product.image;
    document.getElementById('productDescription').value = product.description;
    document.getElementById('productPrice').value = product.prix;
    document.getElementById('productType').value = product.type;

    document.getElementById('nouveauProduit').innerText = 'Modifier';
    document.getElementById('sectionProduit').classList.remove('hidden');

    document.getElementById('productForm').onsubmit = function(event) {
        event.preventDefault();

        const updatedProduct = {
            categorie: document.getElementById('productCategory').value,
            image: document.getElementById('productImage').value,
            description: document.getElementById('productDescription').value,
            prix: document.getElementById('productPrice').value,
            type: document.getElementById('productType').value
        };

        // Mise à jour de la route pour modifier un produit
        fetch(`${base_url}/update-produit/${product.nom}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProduct),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la mise à jour du produit');
            }
            return response.json();
        })
        .then(data => {
            console.log(data.message);
            fermerFormProduit();
            listerProduits();
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
    };
}

function deleteProduit(nom) {
    // Mise à jour de la route pour supprimer un produit
    fetch(`${base_url}/delete-produit/${nom}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la suppression du produit');
        }
        return response.json();
    })
    .then(data => {
        console.log(data.message);
        listerProduits(); 
    })
    .catch(error => {
        console.error('Erreur:', error);
    });
}

function showProductForm() {
    document.getElementById('sectionProduit').classList.remove('hidden');
    document.getElementById('nouveauProduit').innerText = 'Ajouter un produit';
    document.getElementById('productForm').reset();
}

function fermerFormProduit() {
    document.getElementById('sectionProduit').classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
    listerProduits();
});


function afficherInfosVendeur(username) {
    fetch(`${base_url}/vendeur-info/${username}`)
        .then(response => response.json())
        .then(vendeur => {
            let keys = Object.keys(vendeur);
                
            document.getElementById('sellerFullName').innerText = vendeur[keys[0]]
            document.getElementById('sellerEmail').innerText = vendeur.email;
            document.getElementById('sellerUsername').innerText = vendeur.username;
            document.getElementById('sellerRole').innerText = vendeur.role;
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des informations du vendeur:', error);
        });
}

document.addEventListener('DOMContentLoaded', () => {
    const username = 'goby'; // Remplacez 'nom_du_vendeur' par le nom d'utilisateur réel du vendeur
    afficherInfosVendeur(username);
    listerProduits();
});

