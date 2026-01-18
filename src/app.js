const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/groupes', require('./routes/groupes.routes'));
app.use('/api/membres', require('./routes/membres.routes'));
app.use('/api/activites', require('./routes/activites.routes'));

app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route non trouvée' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API lancée sur http://localhost:${PORT}`);
  console.log(`Connecté à MySQL via WAMP`);
});