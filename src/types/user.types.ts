// ===========================================
// USER TYPES - 1:1 SA BACKEND User.java
// ===========================================

import { AuthProvider } from './enums';

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  createdAt: string; // Date as ISO string
  provider: AuthProvider;
  googleId: string | null;
}
