export interface ContentType {
  tone: string;
  products: string[];
  services: string[];
  adQuantity: number;
}

export interface adContent {
  _id: string;
  sourceArticle: string;
  text: string;
}

export interface facebookLoginResponseParams {
  error: string;
  error_description: string;
  code: string;
}

export interface PageReqMetaData {
  searchParams: facebookLoginResponseParams;
  params: any;
}

interface tokenManager {
  accessToken: string;
  exp: number;
  isValid: boolean;
}

export interface SocialAccount {
  _id: string;
  businessProfileId: string;
  userId: string;
  tokenManager: tokenManager;
  isConnected: boolean;
}
