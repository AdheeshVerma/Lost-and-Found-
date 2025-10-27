import express from 'express';

const router = express.Router();

// In-memory data store for lost items (replace with a DB in production)
let lostItems = [];
let nextId = 1;

// Helper to find item index by ID
const findIndexById = (id) => lostItems.findIndex(item => item.id === id);

// GET /lost-items - Retrieve all lost items
router.get('/lost-items', (req, res) => {
  res.json(lostItems);
});

// GET /lost-items/:id - Retrieve a specific lost item by ID
router.get('/lost-items/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const item = lostItems.find(i => i.id === id);
  if (!item) {
    return res.status(404).json({ message: 'Lost item not found' });
  }
  res.json(item);
});

// POST /lost-items - Create a new lost item
router.post('/lost-items', (req, res) => {
  const { name, description, dateLost, location, contactInfo } = req.body;
  if (!name || !dateLost || !location) {
    return res.status(400).json({ message: 'Name, dateLost, and location are required' });
  }
  const newItem = {
    id: nextId++,
    name,
    description: description || '',
    dateLost,
    location,
    contactInfo: contactInfo || ''
  };
  lostItems.push(newItem);
  res.status(201).json(newItem);
});

// PUT /lost-items/:id - Update an existing lost item
router.put('/lost-items/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = findIndexById(id);
  if (index === -1) {
    return res.status(404).json({ message: 'Lost item not found' });
  }
  const { name, description, dateLost, location, contactInfo } = req.body;
  const updatedItem = {
    ...lostItems[index],
    name: name !== undefined ? name : lostItems[index].name,
    description: description !== undefined ? description : lostItems[index].description,
    dateLost: dateLost !== undefined ? dateLost : lostItems[index].dateLost,
    location: location !== undefined ? location : lostItems[index].location,
    contactInfo: contactInfo !== undefined ? contactInfo : lostItems[index].contactInfo
  };
  lostItems[index] = updatedItem;
  res.json(updatedItem);
});

// DELETE /lost-items/:id - Remove a lost item
router.delete('/lost-items/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = findIndexById(id);
  if (index === -1) {
    return res.status(404).json({ message: 'Lost item not found' });
  }
  const removed = lostItems.splice(index, 1)[0];
  res.json({ message: 'Lost item deleted', item: removed });
});

export default router;
