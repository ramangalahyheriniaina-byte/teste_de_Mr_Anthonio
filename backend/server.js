const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const API_KEY = "3959c19a9c4c10766c55beaf6b6a0e04";

// 1. Routes API
app.get('/api/weather/:city', async (req, res) => {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${req.params.city}&appid=${API_KEY}&units=metric&lang=fr`;
        const response = await axios.get(url);
        res.json(response.data);
    } catch {
        res.status(404).json({ error: 'Ville non trouvée' });
    }
});

app.get('/api/forecast/:city', async (req, res) => {
    try {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${req.params.city}&appid=${API_KEY}&units=metric&lang=fr`;
        const response = await axios.get(url);
        res.json(response.data);
    } catch {
        res.status(404).json({ error: 'Erreur prévisions' });
    }
});

// 2. Servir les fichiers statiques
app.use(express.static('../frontend'));

// 3. Route par défaut (pas de '*')
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/index.html'));
});

// 4. Route fallback spécifique
app.get('/:any', (req, res) => {
    if (req.path.startsWith('/api/')) {
        res.status(404).json({ error: 'Route non trouvée' });
    } else {
        res.sendFile(path.resolve(__dirname, '../frontend/index.html'));
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Serveur prêt sur http://localhost:${PORT}`);
});
