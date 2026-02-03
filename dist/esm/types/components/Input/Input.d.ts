import React from 'react';
import { InputProps } from '../../types/input';
import Textarea from './Textarea/Textarea';
import './style.css';
declare const InputComponent: React.ForwardRefExoticComponent<Omit<InputProps, "ref"> & React.RefAttributes<unknown>>;
declare const Input: typeof InputComponent & {
    TextArea: typeof Textarea;
};
export default Input;
