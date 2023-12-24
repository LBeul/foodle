import RestaurantForm from '@/components/RestaurantForm';
import { FormInputs, RestaurantPayload } from '@/types';
import { Button, HStack, Heading, VStack, useToast } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

function CreatePage() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormInputs>();
  const toast = useToast();

  const navigate = useNavigate();

  const hasErrors = Object.keys(errors).length > 0;

  const onSubmit: SubmitHandler<FormInputs> = async (data: FormInputs) => {
    const payload: Omit<RestaurantPayload, 'id'> = data;
    try {
      const response = await fetch('http://localhost:3003/api/restaurants/', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const restaurant = await response.json();
      const { id } = restaurant;
      navigate(`/restaurants/${id}`);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: 'Ooops!',
          description: 'Restaurant konnte nicht angelegt werden!',
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
        <VStack
          direction={{ base: 'column', sm: 'row' }}
          align='start'
          overflow='hidden'
          mb={{ base: 8, sm: 4 }}
        >
          <VStack align='start' spacing={4}>
            <Heading>Restaurant anlegen</Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
              <RestaurantForm errors={errors} register={register} />
              <HStack mt={4} justify='space-between'>
                <Button
                  colorScheme='purple'
                  isLoading={isSubmitting}
                  isDisabled={hasErrors}
                  type='submit'
                >
                  Anlegen
                </Button>
                <Button
                  colorScheme='purple'
                  variant='outline'
                  onClick={() => navigate('/restaurants/')}
                  type='submit'
                >
                  Zurück
                </Button>
              </HStack>
            </form>
          </VStack>
        </VStack>
      </VStack>
    </main>
  );
}

export default CreatePage;
