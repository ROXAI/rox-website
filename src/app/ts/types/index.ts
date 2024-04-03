export interface facebookLoginResponse {
  access_token: string;
  token_type: "bearer";
  expires_in: number;
}

export interface FBAcessTokenInspectResponse {
  data: {
    app_id: string;
    type: string;
    application: string;
    data_access_expires_at: number;
    expires_at: number;
    is_valid: boolean;
    issued_at: number;
    scopes: string[];
    user_id: string;
    granular_scopes: any;
  };
}

export interface FBPageMetaData {
  access_token: string;
  category: string;
  name: string;
  id: string;
  tasks: string[];
}

export interface ManageFBPageResponse {
  data: FBPageMetaData[];
}

export type FBPagePickedProperties = {
  id: string;
  name: string;
  // Add more properties here if needed
};

//-----------
export interface ProductsAndSevices {
  _id: string;
  name: string;
  description: string;
  categories: string[];
  subCategories: string[];
}

export interface businessInfoData {
  _id: string;
  profileId: {
    // to be changed to profileData
    _id: string;
    email: string;
  };
  businessName: string;
  description: string;
}

export interface UserBusinessInfoTypes {
  currentSelection: businessInfoData;
  businessInfoData?: { _id: string; businessName: string }[];
}

export interface BusinessProductAndServices {
  products: ProductsAndSevices[];
  services: ProductsAndSevices[];
  // items: ProductsAndSevices[];
}

export interface AuthData {
  uid: string;
  email: string;
  email_verified?: boolean;
  exp: number;
  refreshToken: string;
  accessToken: any;
}

export interface ServerError {
  code: string;
  message: string;
}

export interface ErrorType {
  error: ServerError;
}

export interface UserProfile {
  _id: string;
  uid: string;
  email: string;
  firstName: string;
}

// --------------------------------

export type FormType = "product" | "service";
export type FormActionType = "add" | "remove" | "update";

// ----------------------------------------------------------------
export interface BusinessProfile {
  _id: string;
  businessName: string;
  description: string;
  additionalDetails: string;
  queryString: string;
  postingStatus: "STANDARD" | "PREMIUM" | "NONE";
}