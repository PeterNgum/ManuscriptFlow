import { vi } from 'vitest';

export const mockAuthService = {
  signIn: vi.fn(),
  signUp: vi.fn(),
  signOut: vi.fn(),
  getSession: vi.fn(),
  getUserProfile: vi.fn()
};

export const mockAuthContext = {
  user: null,
  loading: false,
  error: null,
  signIn: mockAuthService.signIn,
  signUp: mockAuthService.signUp,
  signOut: mockAuthService.signOut
};