// User Roles
export type UserRole = "client" | "expert" | "admin";

// User Status
export type UserStatus = "active" | "suspended" | "banned";

// Project Status
export type ProjectStatus = "open" | "in_progress" | "closed" | "cancelled";

// Proposal Status
export type ProposalStatus = "sent" | "accepted" | "rejected" | "withdrawn";

// User Interface
export interface User {
  id: string;
  email: string;
  password_hash?: string; // 서버 사이드만
  name: string;
  role: UserRole;
  status: UserStatus;
  created_at: string;
  last_login_at?: string;
}

// Login Request
export interface LoginRequest {
  email: string;
  password: string;
}

// Signup Request
export interface SignupRequest {
  email: string;
  password: string;
  name: string;
  role: "client" | "expert"; // admin은 signup 불가
}

// Auth Response
export interface AuthResponse {
  user: Omit<User, "password_hash">;
  token: string;
}

