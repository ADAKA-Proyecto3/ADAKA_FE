import { Device } from 'src/app/models/devices.interface';
import { MedicalCenter } from 'src/app/models/medical-center.interface';
import { Room } from 'src/app/models/rooms.interface';
import { User } from 'src/app/models/user.interface';

export class PlanValidatorService {
  validarUsers(users: User[], plan: string): boolean {
    switch (plan) {
      case 'BASIC':
        return users.length < 45;

      case 'PRO':
        return users.length < 150;

      case 'ENTERPRISE':
        return users.length < 400;

      default:
        return false;
    }
  }

  validarMedicalCenter(medicalCenters: MedicalCenter[], plan: string): boolean {
    switch (plan) {
      case 'BASIC':
        return medicalCenters.length < 1;

      case 'PRO':
        return medicalCenters.length < 5;

      case 'ENTERPRISE':
        return medicalCenters.length < 10;

      default:
        return false;
    }
  }

  validarRoom(rooms: Room[], plan: string): boolean {
    console.log(rooms)
    switch (plan) {
      case 'BASIC':
        return rooms.length < 6;

      case 'PRO':
        return rooms.length < 9;

      case 'ENTERPRISE':
        return rooms.length < 20;

      default:
        return false;
    }
  }

  validarDevices(devices: Device[], plan: string): boolean {
    switch (plan) {
      case 'BASIC':
        return devices.length < 6;

      case 'PRO':
        return devices.length < 10;

      case 'ENTERPRISE':
        return devices.length < 20;

      default:
        return false;
    }
  }
}
