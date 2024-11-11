import express from 'express';
import { signup, signin } from '../controllers/auth.controller.js';

const router = express.Router();
router.post('/signin', signin);
router.post('/signup', signup);

export default router;

// import { signin, signup, google, signout } from '../controllers/auth.controller.js';


// router.post('/google', google);
// router.get('/signout', signout);

