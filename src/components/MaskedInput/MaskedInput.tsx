import React from 'react';
import ReactInputMask from 'react-input-mask';
import './masked-input.css'

interface MaskedInput {
    mask: string;
    placeholder: string;
    value?: string;
    name?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
  
export const MaskedInput = ({mask, placeholder, onChange, value, name}: MaskedInput) => {
    return (
        <ReactInputMask  className='mask-input'  name={name} onChange={onChange} value={value} mask={mask} placeholder={placeholder}></ReactInputMask>
    )
}