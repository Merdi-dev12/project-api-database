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
    const groupe = await Groupe.getById(Number(id));
    if (!groupe) return res.status(404).json({ error: 'Groupe non trouvé' });

    const membres = await Membre.getByGroupe(id);
    const activites = await Activite.getByGroupe(id);

    res.json({ groupe, membres, activites });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createGroupe = async (req, res) => {
  try {
    const { nom, description } = req.body;
    if (!nom) return res.status(400).json({ error: 'Le nom est requis' });
    const groupe = await Groupe.create(nom, description || '');
    res.status(201).json(groupe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateGroupe = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, description } = req.body;
    const groupe = await Groupe.update(Number(id), nom, description || '');
    if (!groupe) return res.status(404).json({ error: 'Groupe non trouvé' });
    res.json(groupe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteGroupe = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await Groupe.delete(Number(id));
    if (!success) return res.status(404).json({ error: 'Groupe non trouvé' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllGroupes,
  getGroupeWithDetails,
  createGroupe,
  updateGroupe,
  deleteGroupe
};