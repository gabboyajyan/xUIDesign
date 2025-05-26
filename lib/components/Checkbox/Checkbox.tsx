import dynamic from 'next/dynamic';
import { CheckboxProps } from '../../types/checkbox';

// Dynamically import the client version with "ssr: false" for Next.js
const ClientCheckbox = dynamic(() => import('./Checkbox.client'), { ssr: false });

export default function Checkbox(props: CheckboxProps) {
  return <ClientCheckbox {...props} />;
}
