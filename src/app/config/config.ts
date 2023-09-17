import { environment } from "./enviroment";


export abstract class Config {

    static readonly BASE_URL: string = environment.enviroment === 'dev'
    ? 'http://localhost:8080/api/'
    : 'https://*******Some AWS host*********/api/';

    static readonly DEBUG_MODE: boolean = environment.enviroment === 'dev'
    ? true
    : false;
   
}