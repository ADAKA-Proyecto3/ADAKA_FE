import { environment } from "./enviroment";


export abstract class Config {

    static readonly BASE_URL: string = environment.enviroment === 'dev'
    ? 'http://localhost:8080'
    : 'http://ADAKA-SPRING-env.eba-239pycbx.us-east-1.elasticbeanstalk.com:8080';

    static readonly DEBUG_MODE: boolean = environment.enviroment === 'dev'
    ? true
    : false;

    
   
}

