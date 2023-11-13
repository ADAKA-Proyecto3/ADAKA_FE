import { SensorReading } from "../interfaces/sensor-reading";

export const PM25_SensorConfig: SensorReading = {
    sensor_name: 'PM2.5',
    unit: 'µg/m³',
    lower_limit: 0,
    upper_limit: 200,
    tolerance:35
  };
  export const PM10_SensorConfig: SensorReading = {
    sensor_name: 'PM10',
    unit: 'µg/m³',
    lower_limit: 0,
    upper_limit: 400,
    tolerance:150
  };
  export const CO2_SensorConfig: SensorReading = {
    sensor_name: 'CO2',
    unit: 'ppm',
    lower_limit: 0,
    upper_limit: 5500,
    tolerance:2000
  };
  export const Temperature_SensorConfig: SensorReading = {
    sensor_name: 'Temperatura',
    unit: '°C',
    lower_limit: 0,
    upper_limit: 150,
  };
  export const Humidity_SensorConfig: SensorReading = {
    sensor_name: 'Humedad',
    unit: '%',
    lower_limit: 0,
    upper_limit: 100,
    tolerance:100
  };