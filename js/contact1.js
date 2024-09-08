document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche l'envoi par défaut du formulaire

    const name = document.getElementById('name').value.trim();
    const surname = document.getElementById('surname').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const address = document.getElementById('address').value.trim();
    const message = document.getElementById('message').value.trim();
    const formMessage = document.getElementById('formMessage');

    // Validation des champs
    if (name === '' || surname === '' || phone === '' || email === '' || address === '' || message === '') {
        formMessage.textContent = 'Tous les champs sont obligatoires.';
        return;
    }

    // Validation de l'email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        formMessage.textContent = 'Veuillez entrer une adresse email valide.';
        return;
    }

    // Validation du numéro de téléphone
    const phonePattern = /^[0-9]{9,15}$/;
    if (!phonePattern.test(phone)) {
        formMessage.textContent = 'Veuillez entrer un numéro de téléphone valide.';
        return;
    }

    // Envoi des données
    const formData = new FormData(this);

    fetch(this.action, {
        method: this.method,
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        formMessage.style.color = 'green';
        formMessage.textContent = data;
        this.reset(); // Réinitialise le formulaire après envoi
    })
    .catch(error => {
        formMessage.textContent = 'Erreur lors de l\'envoi du formulaire.';
        console.error('Erreur:', error);
    });
});
