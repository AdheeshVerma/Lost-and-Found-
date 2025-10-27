import LostItem from '../models/lostItem.js';

/**
 * Retrieve all lost items.
 */
export const getAllLostItems = async (req, res) => {
  try {
    const items = await LostItem.find();
    res.status(200).json(items);
  } catch (error) {
    console.error('Error fetching lost items:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Retrieve a single lost item by its ID.
 */
export const getLostItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await LostItem.findById(id);
    if (!item) {
      return res.status(404).json({ message: 'Lost item not found' });
    }
    res.status(200).json(item);
  } catch (error) {
    console.error(`Error fetching lost item ${id}:`, error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Create a new lost item record.
 */
export const createLostItem = async (req, res) => {
  const { name, description, location, dateLost, contactInfo } = req.body;
  try {
    const newItem = new LostItem({
      name,
      description,
      location,
      dateLost,
      contactInfo,
    });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    console.error('Error creating lost item:', error);
    res.status(400).json({ message: 'Invalid data provided' });
  }
};

/**
 * Update an existing lost item.
 */
export const updateLostItem = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const updatedItem = await LostItem.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });
    if (!updatedItem) {
      return res.status(404).json({ message: 'Lost item not found' });
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    console.error(`Error updating lost item ${id}:`, error);
    res.status(400).json({ message: 'Invalid update data' });
  }
};

/**
 * Delete a lost item.
 */
export const deleteLostItem = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedItem = await LostItem.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Lost item not found' });
    }
    res.status(200).json({ message: 'Lost item deleted successfully' });
  } catch (error) {
    console.error(`Error deleting lost item ${id}:`, error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
