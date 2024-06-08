const express = require('express');
const connectDB = require('./db');
const authRoutes = require('./routes/auth');
const folderRoutes = require('./routes/folder');
const imageRoutes = require('./routes/image');

const cors = require('cors');

require('dotenv').config();

const app = express();

connectDB();

app.get('/', (req, res) => {
  res.send('Welcome to the backend');
});

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/folder', folderRoutes);
app.use('/api/image', imageRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
