export interface User {
  id: string;
  email: string;
  role: 'admin' | 'author' | 'reviewer' | 'advisor' | 'guest';
  firstName: string;
  lastName: string;
  organization: string | null;
  expertise_areas: string[];
  created_at: string;
  updated_at: string;
}

export interface SignUpData {
  firstName: string;
  lastName: string;
  organization?: string;
  role: User['role'];
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<User>;
  signUp: (email: string, password: string, data: SignUpData) => Promise<User>;
  signOut: () => Promise<void>;
}