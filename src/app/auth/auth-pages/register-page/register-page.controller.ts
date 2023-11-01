import { Injectable } from "@angular/core";
import { UserHttpService } from "src/app/services/http-service/user-http.service";
import { LoadingService } from "src/app/services/loading-service/loading.service";
import { User } from "../../../models/user.interface";
import { DebugerService } from "src/app/services/debug-service/debug.service";
import { AuthService } from "../../services/auth.service";

@Injectable()
export class RegisterPageController {

    constructor(
        private readonly loadingService: LoadingService,
        private readonly userHttpService: UserHttpService,
        private readonly authHttpService: AuthService
    ) {}

    async registerUser(suscription:any) {
        this.loadingService.showLoadingModal();
        try {
            DebugerService.log("Requesting HTTP POST Service");
           const result = await this.userHttpService.registerAdmin(suscription);
           return result
           
        } catch (error) {
            console.error(error);
        } finally {
            this.loadingService.dismiss();
            return "ok"
        }
        
    }


    async requestLogin(email: string, password: string) {
        this.loadingService.showLoadingModal();
       
        try {
            DebugerService.log("Requesting HTTP login");
            const loginRequest: any = {
                email: email,
                password: password,
            };
            const result = await this.authHttpService.login(loginRequest);
            console.log('result', result);
            return result;

            
        } catch (error) {
            console.error(error);
        } finally {
            this.loadingService.dismiss();
        }
    }
}