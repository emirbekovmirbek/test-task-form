export interface IFormType {
  fullName: string;
  mail: string;
  phone: string;
  birthday: string;
  message: string;
}
export interface IErrorsType {
  fullName?: string;
  mail?: string;
  phone?: string;
  birthday?: string;
  message?: string;
}