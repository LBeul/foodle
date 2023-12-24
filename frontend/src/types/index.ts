export interface Restaurant extends RestaurantPayload {
  lat: string;
  lon: string;
}

export interface RestaurantPayload {
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

export interface FormInputs {
  title: string;
  street: string;
  description: string;
  zipCode: string;
  imageSrc: string;
}
