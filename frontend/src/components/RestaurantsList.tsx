import { ReactElement } from 'react';

interface Restaurant {
  title: string;
  likeCount?: number;
  imageSrc: string;
  street: string;
  zipCode: string;
  description: string;
}

export default function RestaurantsList({
  restaurants,
}: {
  restaurants: Restaurant[];
}): ReactElement {
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
}
