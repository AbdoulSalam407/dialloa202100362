document.addEventListener("DOMContentLoaded", function() {
    fetch("../data/contacts.csv")
        .then(response => response.text())
        .then(data => {
            const lines = data.trim().split("\n");
            const header = lines.shift().split(",");
            const tableBody = document.querySelector("#contactsTable tbody");

            lines.forEach(line => {
                const [nom, prenom, telephone, email, adresse, message] = line.split(",");
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${nom}</td>
                    <td>${prenom}</td>
                    <td>${telephone}</td>
                    <td>${email}</td>
                    <td>${adresse}</td>
                    <td>${message}</td>
                `;

                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error("Erreur lors du chargement des messages de contact :", error);
        });
});
