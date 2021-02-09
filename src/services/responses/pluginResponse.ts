import UserResponse from '@/services/responses/userResponse'

export interface PluginResponse {
  id: number;
  guid: string;
  name: string;
  description: string;
  markdownDescription: string;
  starCount: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  serverDistroId: ServerDistro;
  creator: UserResponse;
}

export interface PluginBuildResponse {
  id: number;
  pluginId: number;
  versionCode: number;
  version: string;
  fileName: string;
  downloadUrl: string;
  deleted: boolean;
}

export enum ServerDistro {
  Unknown,
  Impostor,
  NodePolus
}
