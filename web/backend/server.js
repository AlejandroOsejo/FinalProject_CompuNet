const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000; // o el puerto que desees

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());

// Ruta para servir archivos estáticos
app.use(express.static(path.join(__dirname, '..', 'public')));

// Ruta POST para crear un nuevo usuario
app.post('/api/users', (req, res) => {
    const newUser = req.body;

    // Ruta al archivo JSON
    const usersFilePath = path.join(__dirname, '..', 'data', 'users.json');

    // Leer usuarios existentes
    fs.readFile(usersFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo de usuarios:', err);
            return res.status(500).json({ error: 'Error al leer el archivo de usuarios' });
        }

        const users = JSON.parse(data);
        users.push(newUser);

        // Guardar el nuevo usuario en el archivo JSON
        fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
            if (err) {
                console.error('Error al escribir en el archivo de usuarios:', err);
                return res.status(500).json({ error: 'Error al guardar el usuario' });
            }

            res.status(201).json(newUser);
        });
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
