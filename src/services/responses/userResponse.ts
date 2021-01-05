/* eslint-disable */
import {ModResponse} from "@/services/responses/modResponse";
import {PluginResponse} from "@/services/responses/pluginResponse";
import {ServerResponse} from "@/services/responses/serverResponse";

export default interface UserResponse {
  id: number;
  username: string;
  email: string;
  mods: ModResponse[];
  plugins: PluginResponse[];
  servers: ServerResponse[];
}
