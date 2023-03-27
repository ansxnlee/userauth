import { Request, Response } from 'express';
import { FilterQuery, QueryOrder, wrap } from '@mikro-orm/core';
import { createHash } from 'node:crypto';

import { DI, RDS } from '../server';
import { UserEntity } from '../entities/UserEntity';
import { COOKIE_NAME } from '../utils/constants';

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await DI.userRepository.findAll({
      orderBy: {id: QueryOrder.ASC },
      limit: 20,
    });
    return res.status(200).json(users);
  } catch(e: any) {
    return res.status(400).json({ message: e.message });
  }
}

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await DI.userRepository.findOne(req.params.id as FilterQuery<UserEntity>, {});
    if(!user) {
      return res.status(404).json({ message: 'User does not exist' });
    }
    return res.status(200).json(user);
  } catch(e: any) {
    return res.status(400).json({ message: e.message });
  }
}

export const createUser = async (req: Request, res: Response) => {
  if(!req.body.username || !req.body.password) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }
  try {
    const hashedPassword = createHash('sha256').update(req.body.password).digest('hex');
    req.body.password = hashedPassword;
    const user = DI.em.create(UserEntity, req.body);
    await DI.userRepository.persist(user).flush();
    return res.status(200).json(user);
  } catch(e: any) {
    return res.status(400).json({ message: e.message });
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await DI.userRepository.findOne({ username: req.body.username });
    if(!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await DI.userRepository.removeAndFlush(user);
    return res.status(200).json(user);
  } catch(e: any) {
    return res.status(400).json({ message: e.message });
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const user = await DI.userRepository.findOne({ username: req.body.username });
    if(!user) {
      return res.status(404).json({ message: 'User does not exist' });
    }
    // verify entered password
    const hashedPassword = createHash('sha256').update(req.body.password).digest('hex');
    if(hashedPassword != user.password) {
      return res.status(400).json({ message: 'Invalid password' });
    }
    req.session.userid = String(user.id);
    req.session.username = user.username;
    return res.status(200).json({ message: "successfully logged as user: " + user.username });
  } catch(e: any) {
    return res.status(400).json({ message: e.message });
  }
}

export const logout = async (req: Request, res: Response) => {
  try {
    req.session.destroy((err) => {
      if(err) {
        console.log(err);
        return;
      }
      res.clearCookie(COOKIE_NAME);
      return res.status(200).json({ message: "successfully deleted session cookie" });
    })
  } catch(e: any) {
    return res.status(400).json({ message: e.message })
  }
}

export const sessionCheck = async (req: Request, res: Response) => {
  try {
    const sessObj = {
      response: 0,
      username: req.session.username,
    }
    sessObj.response = await RDS.client.exists("sess:" + req.session.id);
    return res.status(200).json(sessObj);
  } catch(e: any) {
    return res.status(400).json({ message: e.message })
  }
}
