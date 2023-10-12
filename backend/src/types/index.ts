export type Restaurant = RestaurantWithoutCoords & {
  lat: string;
  lon: string;
};

export type RestaurantWithoutCoords = {
  title: string;
  likeCount?: number;
  imageSrc: string;
  street: string;
  zipCode: string;
  description: string;
};

export type User = {
  userId: string;
  password: string;
  isAdmin: boolean;
};
