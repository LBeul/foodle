import { Router, Request, Response } from 'express';
import UserModel from '../models/user';
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';

const authRouter = Router();

authRouter.post('/login', async (request: Request, response: Response) => {
  const { username, password } = request.body;
  const user = await UserModel.findOne({ username });

  const isCorrectPassword = Boolean(
    user && (await bcrypt.compare(password, user.passwordHash))
  );

  if (!user || !isCorrectPassword) {
    return response.status(401).json({ error: 'Invalid username or password' });
  }

  const tokenHolder = { username: user.username, id: user.id };
  const token = jwt.sign(tokenHolder, process.env.SECRET as Secret, {
    expiresIn: 60 * 60,
  });

  response.status(201).send({ token, username: user.username });
});

authRouter.post('/register', async (request: Request, response: Response) => {
  const { username, password } = request.body;

  const existingUser = await UserModel.findOne({ username });
  if (existingUser) {
    return response.status(400).json({ error: 'UserName must be unique' });
  }

  if (password.length < 8) {
    return response
      .status(400)
      .json({ error: 'Password must contain at least 8 characters' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new UserModel({ username, passwordHash });
  const savedUser = await user.save();

  const responsePayload = { username: savedUser.username, id: savedUser.id };

  response.status(201).json(responsePayload);
});

export default authRouter;
