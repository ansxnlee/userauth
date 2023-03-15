import express from 'express';
import {
  getUser,
  getUsers,
  createUser,
  deleteUser,
  login,
  logout
} from '../controllers/UserController';
import { isAuthed } from '../utils/isAuthed';

export const UserRouter = express.Router();

UserRouter.delete('/', deleteUser);
UserRouter.get('/:id', getUser);
UserRouter.get('/', getUsers);
UserRouter.post('/login', login);
UserRouter.post('/logout', isAuthed, logout)
UserRouter.post('/register', createUser);
