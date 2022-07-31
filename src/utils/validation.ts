import {IErrorsType, IFormType} from "../type/types";


const regName = /(^[A-Za-z]{3,30})+(\s)([A-Za-z]{3,30})/;
const validEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
export const validation = (values: IFormType) => {
    const errors: IErrorsType = {};
    Object.keys(values).forEach((field) => {
      if(field === 'fullName') {
        errors[field] = validationName(values[field])
      } else if(field === 'mail') {
        errors[field] = validationMail(values[field])
      } else if(field === 'message') {
        errors[field] = validationLength(values[field], 10, 300)
      } else if(field === 'phone') {
        errors[field] = validationLength(values[field], 18, 18)
      } else {
        errors[field as keyof IFormType] = validateRequired(values[field as keyof IFormType])
      }
    });
    return errors;
};
export  function validationLength(value: string, min: number, max: number ): string {
  return (value.length < min || value.length > max)  ? `поле может содержать от ${min} до ${max} символов` : '';
}
export function validateRequired( value: string): string {
  return  value === '' ? 'Поле не может быть пустым' : ''
}
export function validationMail (value: string): string {
  return  validEmail.test(value) ? '' : 'Неправильная почта'
}
export function validationName (value: string): string {
  const fullName = value.trim();
  let firstName = '';
  let lastName = '';
  let whiteSpace = 0;
  for (let i = 0; i <= fullName.length-1; i++ ) {
    if(fullName[i] === ' ' && whiteSpace === 0){
      whiteSpace++;
    } else {
      whiteSpace !== 0 ? lastName += fullName[i] : firstName += fullName[i];
    }
  }
  let message: string = ''
  if (!regName.test(value)) {
    if(firstName.length < 3 || firstName.length > 30) {
      message = 'Минимальная длина Имя 3 символа, максимальная 30'
    } else if(whiteSpace !== 1){
      message = 'Разделение слов только одним пробелом'
    } else if(lastName.length < 3 || lastName.length > 30) {
      message = 'Минимальная длина Фамилии 3 символа, максимальная 30'
    } else {
      message = 'Поле может состоять из только латинского алфавита'
    }
  } else if(lastName.trim().split(' ').length > 1) {
    message = 'Поле может состоять только из 2-х слов '
  }
  return message
}