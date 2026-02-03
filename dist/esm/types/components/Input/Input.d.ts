import React from 'react';
import { InputProps } from '../../types/input';
import Textarea from './Textarea/Textarea';
import './style.css';
type InputHandle = {
    focus: () => void;
    input: HTMLInputElement | null;
    blur: () => void;
    nativeElement: HTMLInputElement | null;
    setSelectionRange: (start: number, end: number) => void;
};
declare const InputComponent: React.ForwardRefExoticComponent<Omit<InputProps, "ref"> & React.RefAttributes<InputHandle>>;
declare const Input: typeof InputComponent & {
    TextArea: typeof Textarea;
};
export default Input;
