import { FieldErrors, UseFormRegister } from 'react-hook-form';
import ValidatedInput from './ValidatedInput';
import { FormInputs, Restaurant } from '@/types';

interface FormProps {
  errors: FieldErrors<FormInputs>;
  defaults?: Restaurant;
  register: UseFormRegister<FormInputs>;
}

const RestaurantForm = ({ errors, defaults, register }: FormProps) => {
  return (
    <>
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
    </>
  );
};

export default RestaurantForm;
