import { OpaqueToken } from "@angular/core";

export let APP_CONFIG = new OpaqueToken("app.config");

export interface IAppConfig {
  apiEndpoint: string;
  phpEndpoint: string;
}

export const AppConfig: IAppConfig = {
  apiEndpoint: "http://139.59.76.168:3000/",
  phpEndpoint: "http://truecvs.com/confunrence/"
  // "http://139.59.76.168:3000/"
  // "http://localhost:3000/"
};
