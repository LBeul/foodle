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
import LikeButton from '@/components/LikeButton';
import { Link } from 'react-router-dom';

interface PropTypes {
  restaurant: Restaurant;
}

const RestaurantCard = ({ restaurant }: PropTypes) => {
  const { title, description, imageSrc, likeCount, street, zipCode, id } =
    restaurant;

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
          src={imageSrc ?? './placeholder.png'}
          alt={`Image of ${title}`}
        />
      </AspectRatio>
      <Stack w='100%'>
        <CardBody>
          <Heading size='md'>{title}</Heading>
          <Text
            fontWeight={600}
            color='purple.400'
            textTransform='uppercase'
            fontSize={14}
            style={{ letterSpacing: '0.05em' }}
            py='2'
          >
            {street} | {zipCode} Berlin
          </Text>
          <Text>{description}</Text>
        </CardBody>

        <CardFooter>
          <HStack justifyContent='space-between' w='100%'>
            <Button
              variant='solid'
              colorScheme='purple'
              as={Link}
              to={`/restaurants/${id}`}
            >
              Details
            </Button>
            {likeCount !== undefined && <LikeButton likeCount={likeCount} />}
          </HStack>
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default RestaurantCard;
