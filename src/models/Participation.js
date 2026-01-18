const db = require('../db/database');

class Participation {
  constructor(id, membre_id, activite_id, present) {
    this.id = id;
    this.membre_id = membre_id;
    this.activite_id = activite_id;
    this.present = present;
  }

  static async create(membre_id, activite_id, present = false) {
    const [result] = await db.execute(
      'INSERT INTO participations (membre_id, activite_id, present) VALUES (?, ?, ?)',
      [membre_id, activite_id, present]
    );
    return new Participation(result.insertId, membre_id, activite_id, present);
  }

  static async getByActivite(activiteId) {
    const [rows] = await db.execute(
      'SELECT * FROM participations WHERE activite_id = ?',
      [activiteId]
    );
    return rows.map(r => new Participation(r.id, r.membre_id, r.activite_id, r.present));
  }

  static async markPresent(id) {
    await db.execute('UPDATE participations SET present = TRUE WHERE id = ?', [id]);
    const [rows] = await db.execute('SELECT * FROM participations WHERE id = ?', [id]);
    if (rows.length === 0) return null;
    const r = rows[0];
    return new Participation(r.id, r.membre_id, r.activite_id, r.present);
  }
}

module.exports = Participation;