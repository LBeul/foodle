import RestaurantForm from '@/components/RestaurantForm';
import { FormInputs, Restaurant, RestaurantPayload } from '@/types';
import {
  Button,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useLoaderData } from 'react-router';

function EditPage() {
  const { restaurant: defaults } = useLoaderData() as {
    restaurant: Restaurant;
  };
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormInputs>();
  const toast = useToast();

  const navigate = useNavigate();

  const hasErrors = Object.keys(errors).length > 0;

  const onSubmit: SubmitHandler<FormInputs> = async (data: FormInputs) => {
    const payload: RestaurantPayload = { ...defaults, ...data };
    try {
      await fetch(`http://localhost:3003/api/restaurants/${defaults.id}`, {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      navigate(`/restaurants/${defaults.id}`);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: 'Ooops!',
          description: 'Änderung konnte nicht gesendet werden!',
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
          src={defaults.imageSrc ?? './placeholder.png'}
          alt={`Image of ${defaults.title}`}
        />
        <VStack
          direction={{ base: 'column', sm: 'row' }}
          align='start'
          overflow='hidden'
          mb={{ base: 8, sm: 4 }}
        >
          <VStack align='start' spacing={4}>
            <Heading>
              {defaults.title}{' '}
              <Text as='span' fontWeight={400}>
                bearbeiten
              </Text>
            </Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
              <RestaurantForm
                errors={errors}
                register={register}
                defaults={defaults}
              />
              <HStack mt={4} justify='space-between'>
                <Button
                  colorScheme='purple'
                  isLoading={isSubmitting}
                  isDisabled={hasErrors}
                  type='submit'
                >
                  Speichern
                </Button>
                <Button
                  colorScheme='purple'
                  variant='outline'
                  onClick={() => navigate(`/restaurants/${defaults.id}`)}
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

export default EditPage;
