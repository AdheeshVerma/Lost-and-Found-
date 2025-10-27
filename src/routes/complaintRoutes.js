import express from 'express';
import {
  getAllComplaints,
  getComplaintById,
  createComplaint,
  updateComplaint,
  deleteComplaint
} from '../controllers/complaintController.js';

const router = express.Router();

// Retrieve all complaints
router.get('/', async (req, res, next) => {
  try {
    const result = await getAllComplaints();
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// Retrieve a single complaint by ID
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getComplaintById(id);
    if (!result) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// Create a new complaint
router.post('/', async (req, res, next) => {
  try {
    const complaintData = req.body;
    const created = await createComplaint(complaintData);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
});

// Update an existing complaint
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const complaintData = req.body;
    const updated = await updateComplaint(id, complaintData);
    if (!updated) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// Delete a complaint
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await deleteComplaint(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export default router;
