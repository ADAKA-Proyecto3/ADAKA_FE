import { SelectOption } from "../interfaces/option.interface";

export const roleOptions: SelectOption[] = [
    // { value: 'ADMIN', viewValue: 'Admin' },
    { value: 'NURSE', viewValue: 'Enfermero' },
    {value: 'MEDICAL_DOCTOR', viewValue: 'Médico'}
  ];

  export const statusOptions: SelectOption[] = [
    { value: 'ACTIVE', viewValue: 'Activo' },
    { value: 'INACTIVE', viewValue: 'Inactivo' },
  ];