import express from 'express';
import {
  getUser,
  getUsers,
  createUser,
  deleteUser
} from '../controllers/UserController';

export const UserRouter = express.Router();

UserRouter.delete('/:id', deleteUser);
UserRouter.get('/:id', getUser);
UserRouter.get('/', getUsers);
UserRouter.post('/', createUser);
