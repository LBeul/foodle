import { Restaurant, RestaurantWithoutCoords } from '../types';

const baseUrl = 'https://nominatim.openstreetmap.org';

const completeAddress = async (
  locationWithoutCoords: RestaurantWithoutCoords
): Promise<Restaurant> => {
  const { street, zipCode } = locationWithoutCoords;
  const addressString = `${street}, ${zipCode} Berlin`;
  const url = `${baseUrl}/search?q=${addressString}&format=json`;

  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status}`);

  const geoData = await response.json();
  const locEntry = geoData?.[0];
  if (!locEntry?.lat) throw new Error('No coordinates for given address.');

  const { lat, lon } = locEntry;
  return { ...locationWithoutCoords, lat, lon };
};

export default completeAddress;
