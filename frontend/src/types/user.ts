export interface UpdateUserRequest {
  username?: string;
  email?: string;
  oldPassword?: string;
  newPassword?: string;
  firstName?: string;
  lastName?: string;
}
