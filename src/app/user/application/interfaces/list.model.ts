export interface UserProfile {
  firstName: string;
  lastName: string;
  avatar?: string; // `avatar` es opcional
}

export interface UserList {
  id: string;
  email: string;
  isActive: boolean;
  roles: string[];
  profile: UserProfile;
  createdAt: string;
  updatedAt: string;
  isSelected?: any;
}

export interface Metadata {
  total: number;
  page: number;
  lastPage: number;
}

export interface UserListResponse {
  users: UserList[];
  metadata: Metadata;
}
