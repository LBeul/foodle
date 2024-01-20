import RestaurantForm from '@/components/RestaurantForm';
import ProtectedPage from '@/router/ProtectedPage';
import { Restaurant } from '@/types';
import { Heading, Image, Text, VStack } from '@chakra-ui/react';
import { useLoaderData } from 'react-router';

function EditPage() {
  const { restaurant: defaults } = useLoaderData() as {
    restaurant: Restaurant;
  };

  return (
    <ProtectedPage>
      <main>
        <VStack w='80%' mx='auto' align='start'>
          <Image
            width='100%'
            height={{ base: 100, sm: 300 }}
            borderRadius='lg'
            objectFit='cover'
            src={defaults.imageSrc ?? './placeholder.png'}
            alt={`Image of ${defaults.title}`}
          />
          <VStack
            direction={{ base: 'column', sm: 'row' }}
            align='start'
            overflow='hidden'
            w='100%'
            mb={{ base: 8, sm: 4 }}
          >
            <VStack align='start' spacing={4} w='100%' mt={8}>
              <Heading>
                {defaults.title}{' '}
                <Text as='span' fontWeight={400}>
                  bearbeiten
                </Text>
              </Heading>
              <RestaurantForm
                method='PUT'
                defaults={defaults}
                id={defaults.id}
              />
            </VStack>
          </VStack>
        </VStack>
      </main>
    </ProtectedPage>
  );
}

export default EditPage;
