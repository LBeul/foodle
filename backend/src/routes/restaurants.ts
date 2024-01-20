import Router, { NextFunction, Request, Response } from 'express';
import RestaurantModel from '../models/restaurant';
import { Restaurant } from '../types';
import completeAddress from '../services/geoCoding';
import mongoose from 'mongoose';

const restaurantsRouter = Router();

// GET all restaurants
restaurantsRouter.get(
  '/',
  async (_: Request, response: Response): Promise<void> => {
    const allRestaurants: Array<Restaurant> = await RestaurantModel.find({});
    response.json(allRestaurants);
  }
);

// GET restaurant by id
restaurantsRouter.get(
  '/:id',
  async (request: Request, response: Response): Promise<void> => {
    const isValidId = mongoose.Types.ObjectId.isValid(request.params.id);
    if (isValidId) {
      const restaurant = await RestaurantModel.findById(request.params.id);
      if (restaurant) {
        response.json(restaurant);
      }
    }
    response.status(404).end();
  }
);

// POST new restaurant
restaurantsRouter.post(
  '/',
  async (request: Request, response: Response): Promise<void> => {
    const { title, street, zipCode, imageSrc, description } =
      request.body as Restaurant;

    const populatedRestaurant: Restaurant = await completeAddress({
      title,
      street,
      zipCode,
      likeCount: 0,
      imageSrc,
      description,
    });

    const restaurant = new RestaurantModel(populatedRestaurant);
    const savedRestaurant = await restaurant.save();
    response.status(201).json(savedRestaurant);
  }
);

// DELETE restaurant by id
restaurantsRouter.delete(
  '/:id',
  (request: Request, response: Response, next: NextFunction): void => {
    RestaurantModel.findByIdAndRemove(request.params.id)
      .then(() => response.status(204).end())
      .catch((error) => next(error));
  }
);

// UPDATE user by id
restaurantsRouter.put(
  '/:id',
  async (request: Request, response: Response, next: NextFunction) => {
    const { title, street, zipCode, likeCount, imageSrc, description } =
      request.body;

    const restaurant: Restaurant = await completeAddress({
      title,
      street,
      zipCode,
      likeCount,
      imageSrc,
      description,
    });
    try {
      const updatedRestaurant = await RestaurantModel.findByIdAndUpdate(
        request.params.id,
        restaurant,
        { new: true, runValidators: true, context: 'query' }
      );
      response.json(updatedRestaurant);
    } catch (error) {
      next(error);
    }
  }
);

export default restaurantsRouter;
