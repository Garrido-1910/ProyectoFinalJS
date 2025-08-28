
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const DB_PATH = path.join(__dirname, 'db.json');

app.get('/usuarios', (req, res) => {
    fs.readFile(DB_PATH, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Error leyendo la base de datos' });
        const db = JSON.parse(data);
        res.json(db.usuarios || []);
    });
});


app.post('/usuarios', (req, res) => {
    const nuevoUsuario = req.body;
    fs.readFile(DB_PATH, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Error leyendo la base de datos' });
        const db = JSON.parse(data);
        db.usuarios = db.usuarios || [];
        db.usuarios.push(nuevoUsuario);
        fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), err2 => {
            if (err2) return res.status(500).json({ error: 'Error guardando el usuario' });
            res.status(201).json(nuevoUsuario);
        });
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pages/iniciosecion.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});