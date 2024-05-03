import express, { Router } from 'express';
import {
  createEntry,
  deleteEntry,
  getWithPagination,
  updateEntry,
} from '../controllers/entries';

const router: Router = express.Router();

router.get('/', getWithPagination);
router.post('/', createEntry);
router.delete('/:id', deleteEntry);
router.patch('/:id', updateEntry);

export default router;
