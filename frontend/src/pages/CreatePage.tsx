import RestaurantForm from '@/components/RestaurantForm';
import AuthAtom from '@/stores/authStore';
import { Heading, VStack } from '@chakra-ui/react';
import { useAtomValue } from 'jotai';
import { Navigate } from 'react-router';

function CreatePage() {
  const { isLoggedIn } = useAtomValue(AuthAtom);
  if (!isLoggedIn) {
    return <Navigate to='/' replace />;
  }

  return (
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
  );
}

export default CreatePage;
