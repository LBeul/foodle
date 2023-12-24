import ValidatedInput from '@/components/ValidatedInput';
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
              <ValidatedInput
                id='title'
                label='Titel'
                errors={errors}
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
                id='imageSrc'
                label='Bild-Link'
                errors={errors}
                errorMsg={errors?.imageSrc?.message}
                registerReturn={register('imageSrc', {
                  required: 'Pflichtangabe',
                  pattern: {
                    value:
                      /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi,
                    message: 'Bitte einen valide HTTP/HTTPS URL angeben',
                  },
                })}
              />
              <ValidatedInput
                id='street'
                label='Straße'
                errors={errors}
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
