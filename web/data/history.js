document.addEventListener("DOMContentLoaded", () => {
    fetch('/web/data/history.json')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector("tbody");
            tableBody.innerHTML = ""; 
            data.forEach(historial => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>#${historial.id}</td>
                    <td>
                        <div class="client">
                            <div class="client-img bg-img" style="background-image: url(/web/images/user.jpeg)"></div>
                            <div class="client-info">
                                <h4>${historial.name}</h4>
                                <small>${historial.email}</small>
                            </div>
                        </div>
                    </td>
                    <td>$${historial.total}</td>
                    <td>${new Date(historial.fecha).toLocaleDateString()}</td>
                    <td>${historial.items}</td>
                    <td>${historial.comentarios}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error));
});
