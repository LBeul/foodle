export interface Restaurant extends RestaurantWithoutCoords {
  lat: string;
  lon: string;
}

export interface RestaurantWithoutCoords {
  id: string;
  title: string;
  likeCount?: number;
  imageSrc: string;
  street: string;
  zipCode: string;
  description: string;
}

export interface User {
  userId: string;
  password: string;
  isAdmin: boolean;
}

export interface NavItem {
  label: string;
  subLabel?: string;
  href: string;
}
