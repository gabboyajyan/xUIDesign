import { ButtonProps } from '../../types/button';
import { ButtonClient } from './ButtonClient';

export const Button = (props: ButtonProps) => {
  // Server component can handle initial props processing if needed
  return <ButtonClient {...props} />;
};