import { Restaurant } from '@/types';
import {
  Button,
  Center,
  HStack,
  Heading,
  Icon,
  Image,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useLoaderData, useNavigate } from 'react-router';
import { FaRoad, FaCity } from 'react-icons/fa';
import { BiSolidLike } from 'react-icons/bi';

function RestaurantDetailsPage() {
  const { restaurant } = useLoaderData() as { restaurant: Restaurant };
  const { title, description, imageSrc, street, zipCode, id, likeCount } =
    restaurant;
  const navigate = useNavigate();
  const toast = useToast();

  const deleteRestaurant = async () => {
    try {
      await fetch(`http://localhost:3003/api/restaurants/${id}`, {
        method: 'DELETE',
        mode: 'cors',
      });
      toast({
        title: 'Erledigt!',
        description: `"${title}" wurde gelöscht!`,
        position: 'top',
        status: 'info',
        duration: 5000,
        isClosable: true,
      });
      navigate('/');
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: 'Ohoh!',
          description: `"${title}" konnte nicht gelöscht werden!`,
          position: 'top',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <main>
      <VStack w='80%' mx='auto' align='start'>
        <Image
          width='100%'
          height={{ base: 100, sm: 300 }}
          borderRadius='lg'
          objectFit='cover'
          src={imageSrc ?? './placeholder.png'}
          alt={`Image of ${title}`}
        />
        <VStack
          direction={{ base: 'column', sm: 'row' }}
          align='start'
          justify='start'
          overflow='hidden'
          mb={{ base: 8, sm: 4 }}
        >
          <VStack align='start' spacing={4}>
            <Heading size={{ base: 'xl', sm: '3xl' }} textAlign='left' py={4}>
              {title}
            </Heading>
            <HStack>
              <Center bg='purple.400' borderRadius='full' h={8} w={8}>
                <Icon as={BiSolidLike} h={4} w={4} fill='white' />
              </Center>
              <Text>Liked by {likeCount}</Text>
            </HStack>
            <HStack>
              <Center bg='purple.400' borderRadius='full' h={8} w={8}>
                <Icon as={FaRoad} h={4} w={4} fill='white' />
              </Center>
              <Text>{street}</Text>
            </HStack>
            <HStack pb={4}>
              <Center bg='purple.400' borderRadius='full' h={8} w={8}>
                <Icon as={FaCity} h={4} w={4} fill='white' />
              </Center>
              <Text>{`${zipCode} Berlin`}</Text>
            </HStack>
            <Text>{description}</Text>
            <HStack justifyContent='start' w='100%' pt={4}>
              <Button
                variant='outline'
                colorScheme='purple'
                as='a'
                href={`/edit/${id}`}
                w={150}
              >
                Bearbeiten
              </Button>
              <Button
                onClick={deleteRestaurant}
                variant='outline'
                colorScheme='red'
                as='a'
                w={150}
              >
                Löschen
              </Button>
            </HStack>
          </VStack>
        </VStack>
      </VStack>
    </main>
  );
}

export default RestaurantDetailsPage;
