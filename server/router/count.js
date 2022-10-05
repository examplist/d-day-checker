import express from 'express';
import * as countController from '../controller/count.js';

const router = express.Router();

router.get('/', countController.getCount);

export default router;
