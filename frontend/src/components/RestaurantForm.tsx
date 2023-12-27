import { SubmitHandler, useForm } from 'react-hook-form';
import ValidatedInput from './ValidatedInput';
import { FormInputs, Restaurant, RestaurantPayload } from '@/types';
import { Button, Toast } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

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

  const url =
    method === 'POST'
      ? 'http://localhost:3003/api/restaurants/'
      : `http://localhost:3003/api/restaurants/${id}`;

  const onSubmit: SubmitHandler<FormInputs> = async (data: FormInputs) => {
    const payload: Omit<RestaurantPayload, 'id'> | RestaurantPayload = data;
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
    } catch (error) {
      if (error instanceof Error) {
        Toast({
          title: 'Ooops!',
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
    <form onSubmit={handleSubmit(onSubmit)}>
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
            message: 'Bitte geben Sie eine valide PLZ an',
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
        onClick={() => navigate('/')}
        type='submit'
      >
        Zurück
      </Button>
    </form>
  );
};

export default RestaurantForm;
