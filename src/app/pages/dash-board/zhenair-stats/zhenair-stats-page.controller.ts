import { Injectable } from '@angular/core';
import { Utils } from 'src/app/common/utils/app-util';
import { DebugerService } from 'src/app/services/debug-service/debug.service';
import { MetricsService } from 'src/app/services/http-service/metrics-http.service';
import { LoadingService } from 'src/app/services/loading-service/loading.service';

@Injectable()
export class ZhenAirPageController {
  constructor(
    private readonly loadingService: LoadingService,
    private readonly metricsService: MetricsService
  ) {}

  async requestHistoricalData(
    roomId: number,
    startDate: string,
    endDate: string
  ): Promise<any> {
    this.loadingService.showLoadingModal();

    try {
      DebugerService.log('Requesting Historical Data');   
      const result = await this.metricsService.getHistoricalMetricsForRoom(
        roomId,
        startDate,
        endDate
      );

      if (result && result.data[0].dates.length > 0) return result.data[0];

      if (result && result.data[0].dates.length < 1) {
        this.showErrorMessage(
          'No hay datos para mostrar para el rango de fechas seleccionado'
        );
      }
    } catch (error: any) {
      DebugerService.log('Login Error: ' + error.error.error);

      this.showErrorMessage('Ha ocurrido un error');
    } finally {
      this.loadingService.dismiss();
    }
  }

  private showErrorMessage(message: string): void {
    Utils.showNotification({
      icon: 'error',
      text: message,
      title: 'Error',
      showConfirmButton: true,
    });
  }

}
