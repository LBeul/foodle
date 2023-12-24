import ValidatedInput from '@/components/ValidatedInput';
import usePut from '@/hooks/usePut';
import { Restaurant, RestaurantWithoutCoords } from '@/types';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useLoaderData } from 'react-router';

type Inputs = {
  title: string;
  street: string;
  description: string;
  zipCode: string;
};

function EditPage() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { restaurant: defaults } = useLoaderData() as {
    restaurant: Restaurant;
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const navigate = useNavigate();

  const { put, isLoading, error } = usePut(defaults.id);

  const hasErrors = Object.keys(errors).length > 0;

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    const payload: RestaurantWithoutCoords = { ...defaults, ...data };
    await put(payload);
    if (error) {
      setSubmitError(error.message);
    } else {
      console.log('Success!');
      navigate(`/restaurants/${defaults.id}`);
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
        {submitError && (
          <Alert status='error'>
            <AlertIcon />
            <AlertTitle>Ooops!</AlertTitle>
            <AlertDescription>{submitError}</AlertDescription>
          </Alert>
        )}
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
              <ValidatedInput
                id='title'
                label='Titel'
                errors={errors}
                defaultValue={defaults.title}
                errorMsg={errors?.title?.message}
                registerReturn={register('title', {
                  required: 'Pflichtangabe',
                  minLength: {
                    value: 3,
                    message: 'Titel muss mindestens 3 Zeichen lang sein',
                  },
                })}
              />
              <ValidatedInput
                id='street'
                label='Straße'
                errors={errors}
                defaultValue={defaults.street}
                errorMsg={errors?.street?.message}
                registerReturn={register('street', {
                  required: 'Pflichtangabe',
                  pattern: {
                    value: /^(([a-zA-ZäöüÄÖÜ]\D*)\s+\d+?\s*.*)$/,
                    message: 'Bitte im Format "Straße Nr" angeben',
                  },
                })}
              />
              <ValidatedInput
                id='zipCode'
                label='Postleitzahl'
                errors={errors}
                defaultValue={defaults.zipCode}
                errorMsg={errors?.zipCode?.message}
                registerReturn={register('zipCode', {
                  required: 'Pflichtangabe',
                  pattern: {
                    value: /^[0-9]{5}$/,
                    message: 'Bitte geben Sie eine valide PLZ an',
                  },
                })}
              />
              <ValidatedInput
                isTextArea
                id='description'
                label='Beschreibung'
                errors={errors}
                defaultValue={defaults.description}
                errorMsg={errors?.description?.message}
                registerReturn={register('description', {
                  required: 'Pflichtangabe',
                  minLength: {
                    value: 5,
                    message: 'Beschreibung muss mindestens 5 Zeichen lang sein',
                  },
                })}
              />
              <HStack mt={4} justify='space-between'>
                <Button
                  colorScheme='purple'
                  isLoading={isSubmitting || isLoading}
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
