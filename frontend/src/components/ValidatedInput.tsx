import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react';
import { ReactElement } from 'react';
import { FieldErrors, UseFormRegisterReturn } from 'react-hook-form';

interface ValidatedInputProps {
  errors: FieldErrors;
  label: string;
  id: string;
  registerReturn: UseFormRegisterReturn;
  defaultValue?: string | number | readonly string[] | undefined;
  errorMsg: string | undefined;
  isTextArea?: boolean;
}

const ValidatedInput = ({
  label,
  id,
  registerReturn,
  defaultValue,
  errorMsg,
  errors,
  isTextArea = false,
}: ValidatedInputProps): ReactElement => {
  return (
    <FormControl isInvalid={!!errors[id]}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      {isTextArea ? (
        <Textarea
          h={200}
          resize='none'
          id={id}
          placeholder={label}
          defaultValue={defaultValue}
          {...registerReturn}
        />
      ) : (
        <Input
          id={id}
          placeholder={label}
          defaultValue={defaultValue}
          {...registerReturn}
        />
      )}
      <FormErrorMessage>{errorMsg}</FormErrorMessage>
    </FormControl>
  );
};

export default ValidatedInput;
