import React from 'react';
import {IErrorsType, IFormType} from "../../type/types";
import {Input} from "../input/Input";
import {Icon} from 'react-materialize';
import {
  validateRequired,
  validation,
  validationLength,
  validationMail,
  validationName
} from "../../utils/validation";
import {Button, Container} from 'react-materialize'
import {toast} from "../../utils/toast";
import Loader from "../loader/Loader";


const Form: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [form, setForm] = React.useState<IFormType>({
    fullName: '',
    mail: '',
    phone: '',
    birthday: '',
    message: ''
  });
  const [error, setErrors] = React.useState<IErrorsType | null>(null)
  const onSetErrors = (name: string, value: string): void => {
    setErrors((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const handleChange = (name: string, value: string | Date): void => {
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const isEmpty = (values: IFormType | IErrorsType): boolean => {
    const empty = Object.values(values).filter(item => item !== '').length
    return empty === 0;
  }
  const sendForm = async () => {
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(form),
    };
    try {
      setIsLoading(true);
      await fetch('https://httpbin.org/post', options);
        setIsLoading(false);
        toast('Форма отправлена');
        setForm({
          fullName: '',
          mail: '',
          phone: '',
          birthday: '',
          message: ''
        })
    }
    catch (e) {
      toast('Ошибка: что то пошло не так');
    }
    finally {
      setIsLoading(false);
    }
  }
  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const getErrors = validation(form);
    setErrors(getErrors)
    if (isEmpty(getErrors)) {
      await sendForm();
    }
  };
  return (
    <div>
      <Container className="form">
        <h3 className="card-title">Форма для отправки</h3>
        <form action="" onSubmit={submitForm}>
          <Input
            label="Имя Фамилия"
            value={form.fullName}
            onChange={handleChange}
            name="fullName"
            placeholder="JON SNOW"
            icon={<Icon className="material-icons prefix">account_circle</Icon>}
            onValidation={(value) => onSetErrors('fullName', validationName(value))}
            error={error?.fullName}
          />
          <Input
            label="Почта"
            value={form.mail}
            onChange={handleChange}
            name="mail"
            type="email"
            placeholder="email@example.com"
            icon={<Icon className="material-icons prefix">email</Icon>}
            onValidation={(value) => onSetErrors('mail', validationMail(value))}
            error={error?.mail}
          />
          <Input
            label="Телефон"
            value={form.phone}
            onChange={handleChange}
            name="phone"
            placeholder="+7 (___) ___ __ __"
            icon={<Icon className="material-icons prefix">phone</Icon>}
            type="phone"
            error={error?.phone}
            onValidation={(value) => onSetErrors('phone', validationLength(value, 18, 18))}
          />
          <Input
            type="datepicker"
            label="Дата рождение"
            value={form.birthday}
            onChange={handleChange}
            name="birthday"
            icon={<Icon className="material-icons prefix">date_range</Icon>}
            onValidation={(value) => onSetErrors('birthday', validateRequired(value))}
            error={error?.birthday}
          />
          <Input
            type="textarea"
            label="Сообщение"
            value={form.message}
            onChange={handleChange}
            name="message"
            placeholder="Сообщение"
            icon={<Icon className="material-icons prefix">message</Icon>}
            onValidation={(value) => onSetErrors('message', validationLength(value, 10, 300))}
            error={error?.message}
          />
          <Button
            tooltip="Отправить форму"
          >Отправить</Button>
        </form>
      </Container>
        <Loader loading={isLoading}/>
    </div>
  );
};

export default Form;