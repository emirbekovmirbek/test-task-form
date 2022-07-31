import React from 'react';
import {TextInput, DatePicker, Textarea} from 'react-materialize'
import './input.css';
import {onMaskTelephone} from "../../utils/maskTelefon";

interface IPropsType {
  type?: string;
  disabled?: boolean;
  label: string;
  error?: string;
  value: string;
  onChange: (name: string, value:string | Date) => void;
  name: string;
  placeholder?: string;
  icon?: React.ReactNode;
  onValidation?: (values: string) => void;
}

export const Input:React.FC <IPropsType> = (
  {
    type,
    disabled,
    label,
    error,
    value,
    onChange,
    name,
    icon,
    placeholder,
    onValidation
  },
) => {
  const option = {
    autoClose: true,
    format: 'dd.mm.yyyy',
  }
  const onHandleChange = (e: string) => {
    onChange(name, e);
    if (onValidation) {
      onValidation(e);
    }
  };
  const onPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   const result = onMaskTelephone(e.target.value)
    onChange(name, result)
    if (onValidation) {
      onValidation(result);
    }
  };
  if(type === 'datepicker') {
    return (
      <div className="input">
        <div className="input">
          <div className="input__datepick">
            {icon}
            <div className="input__wrapper-date">
              <label htmlFor={name}>{label}</label>
              <DatePicker
                onChange={ (e:Date) => onHandleChange(Intl.DateTimeFormat().format(e))}
                options={option}
                id={name}
              />
            </div>
          </div>
          {error && <span className="red-text input__error-message">{error}</span>}
        </div>
      </div>
    );
  } else if(type ==='phone') {
    return (
      <div className="input">
        <TextInput
          value={value}
          onChange={onPhoneChange}
          type="tel"
          disabled={disabled}
          placeholder={placeholder}
          name={name}
          label={label}
          icon={icon}
        />
        {error && <span className="red-text input__error-message">{error}</span>}
      </div>
    );
  } else if(type ==='textarea') {
    return (
      <div className="input">
        <Textarea
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onHandleChange(e.target.value)}
          disabled={disabled}
          placeholder={placeholder}
          label={label}
          icon={icon}
        />
        {error && <span className="red-text input__error-message">{error}</span>}
      </div>
    );
  }
  return (
    <div className="input">
      <TextInput
        id={name}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onHandleChange(e.target.value)}
        type="text"
        disabled={disabled}
        placeholder={placeholder}
        icon={icon}
        label={label}
      />
      {error && <span className="red-text input__error-message">{error}</span>}
    </div>
  );
};
