import { Restaurant } from '@/types';
import {
  AspectRatio,
  Button,
  Card,
  CardBody,
  CardFooter,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import LikeButton from '../atoms/LikeButton';

interface PropTypes {
  restaurant: Restaurant;
}

const RestaurantCard = ({ restaurant }: PropTypes) => {
  const { title, description, imageSrc, likeCount } = restaurant;

  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow='hidden'
      variant='filled'
      mb={{ base: 8, sm: 4 }}
    >
      <AspectRatio
        ratio={1}
        minW={{ base: '100%', sm: '200px' }}
        minH={{ base: '200px', sm: '100%' }}
      >
        <Image
          objectFit='cover'
          src={imageSrc}
          alt={`Image of ${title}`}
          fallbackSrc='./placeholder.png'
        />
      </AspectRatio>
      <Stack w='100%'>
        <CardBody>
          <Heading size='md'>{title}</Heading>
          <Text py='2'>{description}</Text>
        </CardBody>

        <CardFooter>
          <HStack justifyContent='space-between' w='100%'>
            <Button variant='solid' colorScheme='purple'>
              More info
            </Button>
            {likeCount !== undefined && <LikeButton likeCount={likeCount} />}
          </HStack>
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default RestaurantCard;
