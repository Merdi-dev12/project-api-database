const Groupe = require('../models/Groupe');
const Membre = require('../models/Membre');
const Activite = require('../models/Activite');

const getAllGroupes = async (req, res) => {
  try {
    const groupes = await Groupe.getAll();
    res.json(groupes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getGroupeWithDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const groupe = await Groupe.getById(id);
    if (!groupe) return res.status(404).json({ error: 'Groupe non trouvé' });

    const membres = await Membre.getByGroupe(id);
    const activites = await Activite.getByGroupe(id);

    res.json({ groupe, membres, activites });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ... autres méthodes (create, update, delete) – similaires à avant

module.exports = { getAllGroupes, getGroupeWithDetails /*, ... */ };