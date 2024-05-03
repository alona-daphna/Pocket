import express, { Router } from 'express';
import {
  createEntry,
  deleteEntry,
  getWithPagination,
} from '../controllers/entries';

const router: Router = express.Router();

router.get('/', getWithPagination);
router.post('/', createEntry);
router.delete('/:id', deleteEntry);

export default router;
