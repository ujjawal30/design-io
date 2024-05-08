declare interface UserProps extends IUser {
  _id: string;
  name: string;
  photo: string;
}

declare interface DesignProps extends IDesign {
  _id: string;
  title: string;
  description: string;
  creator: UserProps;
  collaborators: UserProps[];
}
