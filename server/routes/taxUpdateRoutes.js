// routes/taxUpdateRoutes.js
import express from 'express';
import {
  createTaxUpdate,
  getAllTaxUpdates,
  getTaxUpdate,
  updateTaxUpdate,
  deleteTaxUpdate,
  getCategoryStats
} from '../controllers/taxUpdateController.js';
import taxUpdateUpload from '../utils/taxUpdateUpload.js';
import adminAuth from '../middlewares/adminAuth.js';

const router = express.Router();

// Public routes
router.get('/', getAllTaxUpdates);
router.get('/stats/categories', getCategoryStats);
router.get('/:id', getTaxUpdate);

// Admin routes
router.post('/admin/create', adminAuth, taxUpdateUpload.single('pdf'), createTaxUpdate);
router.put('/admin/:id', adminAuth, taxUpdateUpload.single('pdf'), updateTaxUpdate);
router.delete('/admin/:id', adminAuth, deleteTaxUpdate);

export default router;