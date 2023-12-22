import { Restaurant } from '@/types';

async function restaurantLoader({ params }: { params: { id: string } }) {
  try {
    const res = await fetch(
      `http://localhost:3003/api/restaurants/${params.id}`
    );
    const restaurant = (await res.json()) as Restaurant;
    return { restaurant };
  } catch (error) {
    return { restaurant: null };
  }
}

export default restaurantLoader;
