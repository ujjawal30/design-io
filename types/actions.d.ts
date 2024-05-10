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
  description?: string;
  userId: string;
};

declare type FetchDesignParams = {
  designId: string;
  populate?: boolean;
};

declare type UpdateDesignMetadataParams = {
  designId: string;
  title: string;
  description?: string;
  path: string;
};

declare type FetchUsersParams = {
  q: string;
  userId: string;
  limit?: number;
};

declare type UpdateCollaboratorsParams = {
  userId: string;
  designId: string;
  action: "add" | "remove";
  path: string;
};

declare type FetchDesignsParams = {
  userId: string;
  limit?: number;
  page?: number;
  order?: "createdAt" | "updatedAt" | "title";
  sort?: "asc" | "desc";
  search?: string;
  type?: DashboardPageType;
};
