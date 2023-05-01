import express from 'express';
import { signOut, getSession } from '../controllers/sessionController.js';
import { isLogged } from '../middlewares/authMiddlewares.js';

const router = express.Router();

router.use(isLogged);

router.get('/session', getSession);
router.delete('/logout', signOut);

export default router;
