import { Injectable } from "@angular/core";
import { UserHttpService } from "src/app/services/http-service/user-http-service";
import { LoadingService } from "src/app/services/loading-service/loading.service";
import { User } from "../../interfaces/user.interface";
import { DebugerService } from "src/app/services/debug-service/debug.service";

@Injectable()
export class RegisterPageController {

    constructor(
        private readonly loadingService: LoadingService,
        private readonly userHttpService: UserHttpService
    ) {}

    async registerUser(user:User) {
        this.loadingService.showLoadingModal();
        try {
            DebugerService.log("Requesting HTTP POST Service");
           //return await this.userHttpService.registerUser(user);
        } catch (error) {
            console.error(error);
        } finally {
            this.loadingService.dismiss();
        }
        
    }
}