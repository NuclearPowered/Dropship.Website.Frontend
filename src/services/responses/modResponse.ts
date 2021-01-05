import UserResponse from './userResponse'

export interface ModResponse {
  id: number;
  guid: string;
  name: string;
  description: string;
  starCount: number;
  imageUrl: string;
  creator: UserResponse;
}

export interface ModBuildResponse {
  id: number;
  modId: number;
  versionCode: number;
  version: string;
  fileName: string;
  downloadUrl: string;
  deleted: boolean;
}
