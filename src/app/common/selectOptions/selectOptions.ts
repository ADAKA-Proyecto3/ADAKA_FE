import { SelectOption } from "../interfaces/option.interface";

export const roleOptions: SelectOption[] = [
    // { value: 'ADMIN', viewValue: 'Admin' },
    { value: 'ROLE_NURSE', viewValue: 'Enfermero' },
    {value: 'ROLE_MEDICAL_DOCTOR', viewValue: 'Médico'}
  ];

  export const statusOptions: SelectOption[] = [
    { value: 'ACTIVE', viewValue: 'Activo' },
    { value: 'INACTIVE', viewValue: 'Inactivo' },
    { value: 'FREEZE', viewValue: 'Expirado' }
  ];

  export const publicOptions: SelectOption[] = [
    { value: 1, viewValue: 'Público' },
    { value: 2, viewValue: 'Privado' }
  ];