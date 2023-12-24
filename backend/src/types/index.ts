export interface Restaurant extends RestaurantPayload {
  lat: string;
  lon: string;
}

export interface RestaurantPayload {
  title: string;
  likeCount: number;
  imageSrc?: string;
  street: string;
  zipCode: string;
  description: string;
}

export interface User {
  userId: string;
  password: string;
  isAdmin: boolean;
}
