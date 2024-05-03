import { Request, Response } from 'express';
import entry from '../models/entry';
import mongoose from 'mongoose';

const getWithPagination = async (req: Request, res: Response) => {
  const page = parseInt(req.body?.page) || 1;
  const limit = parseInt(req.body?.limit) || 50;
  const documentsToSkip = (page - 1) * limit;

  try {
    const entries = await entry.find().skip(documentsToSkip).limit(limit);

    res.json(entries);
  } catch (error) {
    if (error instanceof Error) {
      console.log('Error fetching entries:', error.message);
    }

    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createEntry = async (req: Request, res: Response) => {
  if (!req.body || !req.body.content) {
    return res.status(400).send('Request body is missing or invalid');
  }

  const { content } = req.body;

  await entry.create({
    content,
  });

  res.json('Entry create successfully');
};

const deleteEntry = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send('Invalid entry ID');
    }

    const deletedEntry = await entry.findByIdAndDelete(id);

    if (!deletedEntry) {
      return res.status(404).send('Entry not found');
    }

    res.status(200).send('Entry deleted successfully');
  } catch (error) {
    console.error('Error deleting entry:', error);
    res.status(500).send('Failed to delete entry');
  }
};

const updateEntry = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send('Invalid entry ID');
  }

  if (!req.body?.content) {
    return res.status(400).send('Request body is missing or invalid');
  }

  try {
    await entry.findByIdAndUpdate(id, { content: req.body.content });

    res.status(200).send('Entry updated successfully');
  } catch (error) {
    console.error('Error updating entry:', error);
    res.status(500).send('Failed to update entry');
  }
};

export { getWithPagination, createEntry, deleteEntry, updateEntry };
