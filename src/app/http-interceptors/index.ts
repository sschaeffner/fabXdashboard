import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {UnauthorizedInterceptor} from "./UnauthorizedInterceptor";

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: UnauthorizedInterceptor, multi: true }
];
