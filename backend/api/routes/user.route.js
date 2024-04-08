import express from 'express';
import {
  test,
  updateUser,
  deleteUser,
  getUsers,
  deleteUserById

} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/', test);
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.delete('/deleteUser/:id', verifyToken, deleteUserById);
router.get('/getusers', verifyToken, getUsers);


export default router;
