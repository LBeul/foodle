import { Schema, model } from 'mongoose';
import { Restaurant } from '../types';

const restaurantSchema = new Schema<Restaurant>({
  title: { type: String, required: true },
  lat: { type: String, required: true },
  lon: { type: String, required: true },
  likeCount: { type: Number, required: true },
  imageSrc: { type: String, required: true },
  street: { type: String, required: true },
  zipCode: { type: String, required: true },
  description: { type: String, required: false },
});

restaurantSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const RestaurantModel = model('RestaurantModel', restaurantSchema);
export default RestaurantModel;
