const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000; // o el puerto que desees

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());

// Ruta para servir archivos estáticos
app.use(express.static(path.join(__dirname, '..', 'public')));

// Función auxiliar para leer datos de un archivo JSON
function readJsonFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                return reject(err);
            }
            resolve(JSON.parse(data));
        });
    });
}

// Función auxiliar para escribir datos en un archivo JSON
function writeJsonFile(filePath, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8', (err) => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}

// Ruta GET para obtener usuarios
app.get('/api/users', async (req, res) => {
    try {
        const usersFilePath = path.join(__dirname, '..', 'data', 'users.json');
        const users = await readJsonFile(usersFilePath);
        res.status(200).json(users);
    } catch (error) {
        console.error('Error al leer el archivo de usuarios:', error);
        res.status(500).json({ error: 'Error al leer el archivo de usuarios' });
    }
});

// Ruta POST para crear un nuevo usuario
app.post('/api/users', async (req, res) => {
    const newUser = req.body;
    const usersFilePath = path.join(__dirname, '..', 'data', 'users.json');

    try {
        const users = await readJsonFile(usersFilePath);
        users.push(newUser);
        await writeJsonFile(usersFilePath, users);
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error al manejar el archivo de usuarios:', error);
        res.status(500).json({ error: 'Error al manejar el archivo de usuarios' });
    }
});

// Ruta GET para obtener productos
app.get('/api/products', async (req, res) => {
    try {
        const productsFilePath = path.join(__dirname, '..', 'data', 'products.json');
        const products = await readJsonFile(productsFilePath);
        res.status(200).json(products);
    } catch (error) {
        console.error('Error al leer el archivo de productos:', error);
        res.status(500).json({ error: 'Error al leer el archivo de productos' });
    }
});

// Ruta POST para crear un nuevo producto
app.post('/api/products', async (req, res) => {
    const newProduct = req.body;
    const productsFilePath = path.join(__dirname, '..', 'data', 'products.json');

    try {
        const products = await readJsonFile(productsFilePath);
        products.push(newProduct);
        await writeJsonFile(productsFilePath, products);
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error al manejar el archivo de productos:', error);
        res.status(500).json({ error: 'Error al manejar el archivo de productos' });
    }
});

// Ruta GET para obtener historiales
app.get('/api/history', async (req, res) => {
    try {
        const historyFilePath = path.join(__dirname, '..', 'data', 'history.json');
        const history = await readJsonFile(historyFilePath);
        res.status(200).json(history);
    } catch (error) {
        console.error('Error al leer el archivo de historiales:', error);
        res.status(500).json({ error: 'Error al leer el archivo de historiales' });
    }
});

// Ruta POST para agregar un nuevo historial
app.post('/api/history', async (req, res) => {
    const newHistory = req.body;
    const historyFilePath = path.join(__dirname, '..', 'data', 'history.json');

    try {
        const history = await readJsonFile(historyFilePath);
        history.push(newHistory);
        await writeJsonFile(historyFilePath, history);
        res.status(201).json(newHistory);
    } catch (error) {
        console.error('Error al manejar el archivo de historiales:', error);
        res.status(500).json({ error: 'Error al manejar el archivo de historiales' });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
