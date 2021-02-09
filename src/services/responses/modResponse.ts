import { GamePlatform } from '@/models/gameVersionPlatform'
import UserResponse from './userResponse'

export interface ModResponse {
  id: number;
  guid: string;
  name: string;
  description: string;
  markdownDescription: string;
  starCount: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  creator: UserResponse;
}

export interface ModBuildResponse {
  id: number;
  modId: number;
  versionCode: number;
  version: string;
  fileName: string;
  gamePlatform: GamePlatform;
  gameVersion: number;
  downloadUrl: string;
  deleted: boolean;
}
