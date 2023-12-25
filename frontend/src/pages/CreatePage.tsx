import RestaurantForm from '@/components/RestaurantForm';
import { Heading, VStack } from '@chakra-ui/react';

function CreatePage() {
  return (
    <main>
      <VStack w='80%' mx='auto' align='start'>
        <VStack
          direction={{ base: 'column', sm: 'row' }}
          align='start'
          overflow='hidden'
          mb={{ base: 8, sm: 4 }}
        >
          <VStack align='start' spacing={4}>
            <Heading>Restaurant anlegen</Heading>
            <RestaurantForm method='POST' />
          </VStack>
        </VStack>
      </VStack>
    </main>
  );
}

export default CreatePage;
