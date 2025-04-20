export interface User {
    id: string;
    email: string;
    name: string;
    role: 'employer' | 'candidate';
    verified: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface UserCredentials {
    email: string;
    password: string;
  }
  
  export interface RegisterUser extends UserCredentials {
    name: string;
    role: 'employer' | 'candidate';
  }
  
  export interface AuthResponse {
    user: User;
    token: string;
  }