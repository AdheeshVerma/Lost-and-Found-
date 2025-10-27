import complaintService from '../services/complaintService.js';

// Create a new complaint
const createComplaint = async (req, res, next) => {
  try {
    const complaintData = req.body;
    const createdComplaint = await complaintService.createComplaint(complaintData);
    res.status(201).json({ success: true, data: createdComplaint });
  } catch (error) {
    next(error);
  }
};

// Retrieve a single complaint by ID
const getComplaint = async (req, res, next) => {
  try {
    const { id } = req.params;
    const complaint = await complaintService.getComplaintById(id);
    if (!complaint) {
      return res.status(404).json({ success: false, message: 'Complaint not found' });
    }
    res.json({ success: true, data: complaint });
  } catch (error) {
    next(error);
  }
};

// Retrieve all complaints (optionally with query filters)
const getAllComplaints = async (req, res, next) => {
  try {
    const filters = req.query || {};
    const complaints = await complaintService.getAllComplaints(filters);
    res.json({ success: true, data: complaints });
  } catch (error) {
    next(error);
  }
};

// Update an existing complaint
const updateComplaint = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedComplaint = await complaintService.updateComplaint(id, updateData);
    if (!updatedComplaint) {
      return res.status(404).json({ success: false, message: 'Complaint not found' });
    }
    res.json({ success: true, data: updatedComplaint });
  } catch (error) {
    next(error);
  }
};

// Delete a complaint
const deleteComplaint = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await complaintService.deleteComplaint(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Complaint not found' });
    }
    res.json({ success: true, message: 'Complaint deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export { createComplaint, getComplaint, getAllComplaints, updateComplaint, deleteComplaint };