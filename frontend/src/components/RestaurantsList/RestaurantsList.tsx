import { ReactElement } from 'react';
import RestaurantCard from './RestaurantCard';
import { Restaurant } from '@/types';
import { Stack } from '@chakra-ui/react';

interface PropTypes {
  restaurants: Restaurant[];
}

const RestaurantsList = ({ restaurants }: PropTypes): ReactElement => {
  return (
    <Stack>
      {restaurants.map((r) => (
        <RestaurantCard restaurant={r} key={r.id} />
      ))}
    </Stack>
  );
};

export default RestaurantsList;
