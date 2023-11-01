import { environment } from "./enviroment";


export abstract class Config {

    static readonly BASE_URL: string = environment.enviroment === 'dev'
    ? 'http://localhost:8080'
    : 'http://adaka-spring-env.eba-239pycbx.us-east-1.elasticbeanstalk.com';

    static readonly DEBUG_MODE: boolean = environment.enviroment === 'dev'
    ? true
    : false;

    
   
}

