import express from 'express';
import * as itemController from '../controller/item.js';

const router = express.Router();

router.get('/', itemController.readItems);

router.post('/', itemController.createItem);

router.put('/:id', itemController.updateItem);

router.delete('/:id', itemController.removeItem);

export default router;
