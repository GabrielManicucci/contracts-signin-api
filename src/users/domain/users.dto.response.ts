export interface SignInResponse {
  user: {
    id: string;
    name: string;
    email: string;
    companyId: string | null;
  };
  token: string;
}

export interface SignUpResponse {
  id: string;
  name: string;
  email: string;
}
