import ValidatedInput from '@/components/ValidatedInput';
import { Restaurant } from '@/types';
import { Button, Heading, Image, Text, VStack } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router';

type Inputs = {
  title: string;
  street: string;
  description: string;
  zipCode: string;
};

function EditPage() {
  const { restaurant } = useLoaderData() as { restaurant: Restaurant };
  const defaultValues = restaurant;
  const {
    handleSubmit,
    register,
    // watch,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const hasErrors = Object.keys(errors).length > 0;

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => console.log(data);

  // console.log(watch('title'));

  return (
    <main>
      <VStack w='80%' mx='auto' align='start'>
        <Image
          width='100%'
          height={{ base: 100, sm: 300 }}
          borderRadius='lg'
          objectFit='cover'
          src={defaultValues.imageSrc ?? './placeholder.png'}
          alt={`Image of ${defaultValues.title}`}
        />
        <VStack
          direction={{ base: 'column', sm: 'row' }}
          align='start'
          overflow='hidden'
          mb={{ base: 8, sm: 4 }}
        >
          <VStack align='start' spacing={4}>
            <Heading>
              {defaultValues.title}{' '}
              <Text as='span' fontWeight={400}>
                bearbeiten
              </Text>
            </Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
              <ValidatedInput
                id='title'
                label='Titel'
                errors={errors}
                defaultValue={defaultValues.title}
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
                defaultValue={defaultValues.street}
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
                defaultValue={defaultValues.zipCode}
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
                defaultValue={defaultValues.description}
                errorMsg={errors?.description?.message}
                registerReturn={register('description', {
                  required: 'Pflichtangabe',
                  minLength: {
                    value: 5,
                    message: 'Beschreibung muss mindestens 5 Zeichen lang sein',
                  },
                })}
              />
              <Button
                mt={4}
                colorScheme='purple'
                isLoading={isSubmitting}
                isDisabled={hasErrors}
                type='submit'
              >
                Speichern
              </Button>
            </form>
          </VStack>
        </VStack>
      </VStack>
    </main>
  );
}

export default EditPage;
