export interface IUser {
  name: string;
  username: string;
  email: string;
  phone_number: string;
  gender: string;
  industry: string;
  occupation: string;
  birthday: string;
  introduction: string;
  profile_image: string | null;
  current_location: string | null;
}

export interface AuthUser {
  name: string;
  username: string;
  email: string;
  profile_image: string | null;
  current_location: string | null;
  accessToken: string;
  refreshToken: string;
}
