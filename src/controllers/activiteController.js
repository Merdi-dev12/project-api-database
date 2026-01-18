const Activite = require('../models/Activite');
const Participation = require('../models/Participation');
const Membre = require('../models/Membre');

const getAllActivites = async (req, res) => {
  try {
    const activites = await Activite.getAll();
    res.json(activites);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getActiviteWithParticipants = async (req, res) => {
  try {
    const { id } = req.params;
    const participations = await Participation.getByActivite(id);
    const membres = [];
    for (const p of participations) {
      const membre = await Membre.getById(p.membre_id);
      if (membre) {
        membres.push({ ...membre, present: p.present });
      }
    }
    res.json({ activite_id: id, participants: membres });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createActivite = async (req, res) => {
  try {
    const { titre, date_activite, groupe_id } = req.body;
    if (!titre || !groupe_id) {
      return res.status(400).json({ error: 'Titre et groupe_id requis' });
    }
    const activite = await Activite.create(titre, date_activite, groupe_id);
    res.status(201).json(activite);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteActivite = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await Activite.delete(id);
    if (!success) return res.status(404).json({ error: 'Activité non trouvée' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addParticipant = async (req, res) => {
  try {
    const { membre_id, activite_id, present = false } = req.body;
    const participation = await Participation.create(membre_id, activite_id, present);
    res.status(201).json(participation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const markPresent = async (req, res) => {
  try {
    const { id } = req.params;
    const participation = await Participation.markPresent(Number(id));
    if (!participation) return res.status(404).json({ error: 'Participation non trouvée' });
    res.json(participation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllActivites,
  getActiviteWithParticipants,
  createActivite,
  deleteActivite,
  addParticipant,
  markPresent
};