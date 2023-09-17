import { Config } from "src/app/config/config";


export abstract class DebugerService {
  public static log(data: any): void {
    if (Config.DEBUG_MODE) {
      console.log("[DEBUG] :   " + data);
    }
  }
}