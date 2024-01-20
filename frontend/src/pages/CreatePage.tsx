import RestaurantForm from '@/components/RestaurantForm';
import ProtectedPage from '@/router/ProtectedPage';
import { Heading, VStack } from '@chakra-ui/react';

function CreatePage() {
  return (
    <ProtectedPage>
      <main>
        <VStack w='80%' mx='auto' align='start'>
          <VStack
            direction={{ base: 'column', sm: 'row' }}
            align='start'
            overflow='hidden'
            mb={{ base: 8, sm: 4 }}
            w='100%'
          >
            <VStack align='start' spacing={4} w='100%'>
              <Heading>Restaurant anlegen</Heading>
              <RestaurantForm method='POST' />
            </VStack>
          </VStack>
        </VStack>
      </main>
    </ProtectedPage>
  );
}

export default CreatePage;
