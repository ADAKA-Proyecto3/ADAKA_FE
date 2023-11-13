export interface SensorReading {
    sensor_name: string;
    unit?: string;
    value?: number;
    lower_limit: number;
    upper_limit: number;
    tolerance?: number;
  }