import express from 'express';
const router = express.Router();
import { getProduct, getProductById ,createProduct, updateProduct, deleteProduct} from '../controller/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js'; // Uncomment if you need authentication for product routes

router.route('/').get(getProduct).post(protect, admin, createProduct);
router.route('/:id').get(getProductById).put(protect, admin, updateProduct).delete(protect, admin, deleteProduct);

export default router;
 