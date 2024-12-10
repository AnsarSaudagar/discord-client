export interface User {
  id: number;
  email: string;
  display_name?: string;
  username: string;
  password: string;
  dob?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  profilePictureColor?: string;
}
