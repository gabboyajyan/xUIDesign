import { CheckboxProps } from '../../types/checkbox';
import CheckboxClient from './Checkbox.client';
import './style.css';

export default function CheckboxServer(props: CheckboxProps) {
  return <CheckboxClient {...props} />;
}