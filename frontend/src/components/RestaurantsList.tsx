import { ReactElement } from 'react';

interface Restaurant {
  title: string;
  likeCount?: number;
  imageSrc: string;
  street: string;
  zipCode: string;
  description: string;
}

interface props {
  restaurants: Restaurant[];
}

const RestaurantsList = ({ restaurants }: props): ReactElement => {
  return (
    <>
      {restaurants.map((r) => (
        <div>
          <h3>{r.title}</h3>
          <p>{r.street}</p>
        </div>
      ))}
    </>
  );
};

export default RestaurantsList;
