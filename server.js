require('dotenv').config();
const express = require('express');
const { db, Track } = require('./database/setup');


const app = express();
app.use(express.json());

// Root route for testing
app.get('/', (req, res) => res.send('Music Library API running!'));

// GET all tracks
app.get('/api/tracks', async (req, res) => {
  try {
    const tracks = await Track.findAll();
    res.json(tracks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } 
});

// GET track by id
app.get('/api/tracks/:id', async (req, res) => {
  try {
    const track = await Track.findByPk(req.params.id);
    if (!track) return res.status(404).json({ error: 'Track not found' });
    res.json(track);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new track
app.post('/api/tracks', async (req, res) => {
  const { songTitle, artistName, albumName, genre, duration, releaseYear } = req.body;
  if (!songTitle || !artistName || !albumName || !genre) {
    return res.status(400).json({ error: 'songTitle, artistName, albumName, and genre are required' });
  }
  try {
    const newTrack = await Track.create({ songTitle, artistName, albumName, genre, duration, releaseYear });
    res.status(201).json(newTrack);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update track
app.put('/api/tracks/:id', async (req, res) => {
  try {
    const track = await Track.findByPk(req.params.id);
    if (!track) return res.status(404).json({ error: 'Track not found' });

    const { songTitle, artistName, albumName, genre, duration, releaseYear } = req.body;
    await track.update({ songTitle, artistName, albumName, genre, duration, releaseYear });

    res.json(track);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE track
app.delete('/api/tracks/:id', async (req, res) => {
  try {
    const track = await Track.findByPk(req.params.id);
    if (!track) return res.status(404).json({ error: 'Track not found' });

    await track.destroy();
    res.json({ message: 'Track deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
