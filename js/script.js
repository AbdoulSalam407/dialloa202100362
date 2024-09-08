document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorMessage = document.getElementById('errorMessage');

    errorMessage.textContent = '';

    fetch('https://serveur-3988.onrender.com/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (!data.error) {
            console.log(data)
            if (data.user.role === 'admin') {
                window.location.href = '../admin/admin.html'; 
            } else if (data.user.role === 'vendeur') {
                window.location.href = '../seller/seller_home.html'; 
            } else {
                errorMessage.textContent = 'Rôle utilisateur non reconnu.';
            }
        } else {
            errorMessage.textContent = data.message;
        }
    })
    .catch(error => {
        errorMessage.textContent = 'Erreur lors de la tentative de connexion. Veuillez réessayer plus tard.';
    });
});
