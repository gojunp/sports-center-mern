import express from 'express';
import { signup, signin, getUsers, getUser, updateUser,deleteUser, verify } from '../controllers/users';
import auth from '../middleware/auth';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/all', auth,getUsers);
router.get('/user/:id',auth,getUser);
router.patch('/edit-user/:id',auth,updateUser)
router.patch('/verify/:id/:token',verify)
router.delete('/delete/:id',auth,deleteUser)



export default router;