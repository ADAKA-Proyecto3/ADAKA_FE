import { HttpHeaders } from '@angular/common/http';

import Swal from 'sweetalert2';

type NotificationType = 'success' | 'error' | 'warning' | 'info' | 'question';

interface NotificationOptions {
  title: string;
  showTitle?: boolean;
  text: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  showCancelButton?: boolean;
  showConfirmButton?: boolean;
  confirmButtonColor?: string;
  cancelButtonColor?: string;
  icon: NotificationType;
  allowOutsideClick?: boolean;
  allowEscapeKey?: boolean;
  allowEnterKey?: boolean;
}

export class Utils {
  public static showNotification({
    icon,
    text,
    title = '',
    showCancelButton = false,
    showConfirmButton = true,
  }: NotificationOptions) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
      showCancelButton: showCancelButton,
      showConfirmButton: showConfirmButton,
      confirmButtonColor: '#0096d2',
      confirmButtonText: 'Cerrar',
    });
  }

  public static getHttpHeaders() {
    const authToken = sessionStorage.getItem('token');

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `${authToken}`,
        'Content-Type': 'application/json',
      }),
    };

    return httpOptions;
  }
}
