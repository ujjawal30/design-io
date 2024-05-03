declare interface ActionsResponse<T> {
  status: boolean;
  message: string;
  data: T | null;
}

declare type RegisterUserParams = {
  name: string;
  email: string;
  password: string;
};

declare type AuthenticateUserParams = {
  email: string;
  password: string;
};

declare type RegisterDesignParams = {
  title: string;
  description: string;
  userId: string;
};
