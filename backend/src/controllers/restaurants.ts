import Router from 'express';
import RestaurantModel from '../models/restaurant';
import { Restaurant } from '../types';
import completeAddress from '../services/geoCoding';

const restaurantsRouter = Router();

// GET all restaurants
restaurantsRouter.get('/', (_, response) => {
  RestaurantModel.find({}).then((restaurants) => response.json(restaurants));
});

// GET restaurant by id
restaurantsRouter.get('/:id', async (request, response) => {
  const restaurant = await RestaurantModel.findById(request.params.id);
  if (restaurant) {
    response.json(restaurant.toJSON());
  } else {
    response.status(404).end();
  }
});

// POST new restaurant
restaurantsRouter.post('/', async (request, response) => {
  const { title, street, zipCode, likeCount, imageSrc, description } =
    request.body;

  const populatedRestaurant: Restaurant = await completeAddress({
    title,
    street,
    zipCode,
    likeCount,
    imageSrc,
    description,
  });

  const restaurant = new RestaurantModel(populatedRestaurant);
  const savedRestaurant = await restaurant.save();
  response.status(201).json(savedRestaurant);
});

// DELETE restaurant by id
restaurantsRouter.delete('/:id', (request, response, next) => {
  RestaurantModel.findByIdAndRemove(request.params.id)
    .then(() => response.status(204).end())
    .catch((error) => next(error));
});

// UPDATE user by id
restaurantsRouter.put('/:id', (request, response, next) => {
  const {
    title,
    // street,
    // zipCode,
    // likeCount,
    // imageSrc,
    description,
  } = request.body;
  const restaurant = {
    title,
    // lat,
    // lon,
    // street,
    // zipCode,
    // imageSrc,
    // likeCount,
    description,
  };

  RestaurantModel.findByIdAndUpdate(request.params.id, restaurant, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updatedRestaurant) => response.json(updatedRestaurant))
    .catch((error) => next(error));
});

export default restaurantsRouter;
