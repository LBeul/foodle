import Router from 'express';
import UserModel from '../models/user';
import { User } from '../types';

const authRouter = Router();

authRouter.post('/', async (request, response) => {
  const { username, password } = request.body;

  const user: User | null = await UserModel.findOne({ userId: username });
  const isCorrectPassword = password === user?.password;

  if (!(user && isCorrectPassword)) {
    return response.status(401).json({ error: 'Invalid username or password' });
  }

  const { userId, isAdmin } = user;
  response.status(200).send({ userId, isAdmin });
});

export default authRouter;
