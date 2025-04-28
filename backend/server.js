const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const Client = require('./models/Client');

const app = express();
app.use(express.json());
app.use(cors());

// Connexion à MongoDB
mongoose.connect('mongodb://admin:1234@localhost:27017/Clientdb?authSource=admin')
  .then(() => console.log('MongoDB connecté'))
  .catch(err => console.error('Erreur MongoDB:', err));

// Route : Ajouter un client
app.post('/clients', async (req, res) => {
  try {
    const client = new Client(req.body);
    await client.save();
    res.status(201).json(client);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route : Lister tous les clients
app.get('/clients', async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route : Obtenir un client par id
app.get('/clients/:id', async (req, res) => {
  try {
    const client = await Client.findOne({id:req.params.id}); 
    if (!client) return res.status(404).json({ message: 'Client non trouvé' });
    res.json(client);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.delete('/clients/:id',async (req, res) => {
  try{
    await Client.deleteOne({ id : req.params.id});
    res.json({ message: "Utilisateur supprimé" });
  }catch(err){
    res.status(400).json({message: err.message})
  }
});


app.put('/clients/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { nom, age } = req.body;

    const client = clients.find(Client => Client.id === id);

    if (!client) {
      return res.status(404).json({ message: 'Client non trouvé' });
    }

    client.nom = req.body.name;
    client.age = req.body.age;

    res.json({ message: 'Client modifié avec succès' });
  } catch (error) {
    console.error('Erreur lors de la modification du client:', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
});




app.listen(3000, () => {
  console.log('Serveur démarré sur http://localhost:3000');
});
