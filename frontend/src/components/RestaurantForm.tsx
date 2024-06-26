import { SubmitHandler, useForm } from 'react-hook-form';
import ValidatedInput from './ValidatedInput';
import { FormInputs, Restaurant, RestaurantPayload } from '@/types';
import { Button, ButtonGroup, Stack, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

interface FormProps {
  defaults?: Restaurant;
  method: 'POST' | 'PUT';
  id?: string;
}

const RestaurantForm = ({ defaults, method, id }: FormProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormInputs>();

  const hasErrors = Object.keys(errors).length > 0;

  const navigate = useNavigate();

  const toast = useToast();

  const url =
    method === 'POST'
      ? 'http://localhost:3003/api/restaurants/'
      : `http://localhost:3003/api/restaurants/${id}`;

  const onSubmit: SubmitHandler<FormInputs> = async (data: FormInputs) => {
    const payload: Omit<RestaurantPayload, 'id'> | RestaurantPayload = data;
    if (!payload.imageSrc) {
      payload.imageSrc = undefined;
    }
    try {
      const response = await fetch(url, {
        method,
        mode: 'cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const restaurant = await response.json();
      const { id } = restaurant;
      navigate(`/restaurants/${id}`);
      toast({
        title: 'Erledigt!',
        description: `Restaurant wurde erfolgreich ${
          method === 'POST' ? 'angelegt' : 'aktualisiert'
        }`,
        position: 'top',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: 'Ohoh!',
          description:
            method === 'POST'
              ? 'Restaurant konnte nicht angelegt werden!'
              : `${payload.title} konnte nicht geändert werden!`,
          position: 'top',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Stack as='form' onSubmit={handleSubmit(onSubmit)} w='100%'>
      <Stack spacing={4} w='100%'>
        <ValidatedInput
          id='title'
          label='Titel'
          errors={errors}
          defaultValue={defaults?.title}
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
          defaultValue={defaults?.imageSrc}
          errorMsg={errors?.imageSrc?.message}
          registerReturn={register('imageSrc', {
            pattern: {
              value:
                /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi,
              message: 'Bitte einen validen URL angeben',
            },
          })}
        />
        <ValidatedInput
          id='street'
          label='Straße'
          errors={errors}
          defaultValue={defaults?.street}
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
          defaultValue={defaults?.zipCode}
          errorMsg={errors?.zipCode?.message}
          registerReturn={register('zipCode', {
            required: 'Pflichtangabe',
            pattern: {
              value: /^[0-9]{5}$/,
              message: 'Bitte geben Sie eine valide PLZ an.',
            },
          })}
        />
        <ValidatedInput
          isTextArea
          id='description'
          label='Beschreibung'
          errors={errors}
          defaultValue={defaults?.description}
          errorMsg={errors?.description?.message}
          registerReturn={register('description', {
            required: 'Pflichtangabe',
            minLength: {
              value: 5,
              message: 'Beschreibung muss mindestens 5 Zeichen lang sein',
            },
          })}
        />
        <ButtonGroup mt={6}>
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
            as={Link}
            to={method === 'PUT' ? `/restaurants/${id}` : '/'}
          >
            Zurück
          </Button>
        </ButtonGroup>
      </Stack>
    </Stack>
  );
};

export default RestaurantForm;
