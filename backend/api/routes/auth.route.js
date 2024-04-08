import express from 'express';
import { signin, signup, google, signout, forgotPassword,resetPassword,verifyResetPassword } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/google', google);
router.get('/signout', signout);
router.post("/reset-password",resetPassword)
router.post("/verify-reset-password/:token",verifyResetPassword)


export default router;