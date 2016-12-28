import {LightMethods} from "./light-methods.enum";
import {MoveMethods} from "./move-methods.enum";
export interface SocketData {
    method: LightMethods | MoveMethods;
    data?: any;
}