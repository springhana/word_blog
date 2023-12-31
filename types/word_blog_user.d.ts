export interface AccountsType {
  _id: string;
  provider: string;
  type: string;
  providerAccountId: string;
  access_token: string;
  token_type: string;
  scope: string;
  userId: string;
  deactivate: boolean?;
}

export interface UsersType {
  _id: string;
  name: string;
  email: string;
  image: string;
  intro: string;
  bannerImage: string;
  password: string?;
  emailVerified: string | null;
  deactivate: boolean?;
  auth: boolean?;
}
