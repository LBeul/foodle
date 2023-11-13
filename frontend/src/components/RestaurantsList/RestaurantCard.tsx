import { Restaurant } from '@/types';
import {
  AspectRatio,
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';

interface PropTypes {
  restaurant: Restaurant;
}

const RestaurantCard = ({ restaurant }: PropTypes) => {
  const { title, description, imageSrc } = restaurant;

  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow='hidden'
      variant='outline'
    >
      <AspectRatio
        ratio={1}
        minW={{ base: '100%', sm: '200px' }}
        minH={{ base: '200px', sm: '100%' }}
      >
        <Image objectFit='cover' src={imageSrc} alt='Caffe Latte' />
      </AspectRatio>
      <Stack>
        <CardBody>
          <Heading size='md'>{title}</Heading>
          <Text py='2'>{description}</Text>
        </CardBody>

        <CardFooter>
          <Button variant='solid' colorScheme='purple'>
            More info
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default RestaurantCard;
