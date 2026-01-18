// src/models/Activite.js
const db = require('../db/database');

class Activite {
  constructor(id, titre, date_activite, groupe_id) {
    this.id = id;
    this.titre = titre;
    this.date_activite = date_activite;
    this.groupe_id = groupe_id;
  }

  static async getAll() {
    const [rows] = await db.execute('SELECT * FROM activites');
    return rows.map(r => new Activite(r.id, r.titre, r.date_activite, r.groupe_id));
  }

  static async getByGroupe(groupeId) {
    const [rows] = await db.execute(
      'SELECT * FROM activites WHERE groupe_id = ?',
      [groupeId]
    );
    return rows.map(r => new Activite(r.id, r.titre, r.date_activite, r.groupe_id));
  }

  static async create(titre, date_activite, groupe_id) {
    const [result] = await db.execute(
      'INSERT INTO activites (titre, date_activite, groupe_id) VALUES (?, ?, ?)',
      [titre, date_activite, groupe_id]
    );
    return new Activite(result.insertId, titre, date_activite, groupe_id);
  }

  static async delete(id) {
    const [result] = await db.execute('DELETE FROM activites WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Activite;