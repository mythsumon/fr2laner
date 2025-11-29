// 공통 Status Enums

export type UserStatus = "active" | "suspended" | "banned";
export type UserRole = "client" | "expert" | "admin";

export type ServiceStatus = "draft" | "pending_review" | "active" | "rejected" | "disabled";

export type ProjectStatus = "open" | "in_progress" | "closed" | "cancelled";

export type OrderStatus =
  | "pending_payment"
  | "in_progress"
  | "delivered"
  | "completed"
  | "cancelled"
  | "dispute";

export type ProposalStatus = "sent" | "accepted" | "rejected" | "withdrawn";

export type ReviewStatus = "visible" | "hidden" | "deleted";

// User Model
export interface User {
  id: string;
  email: string;
  password_hash?: string; // Only on server side
  name: string;
  role: UserRole;
  status: UserStatus;
  created_at: string;
  last_login_at?: string;
}

// Auth Response
export interface AuthResponse {
  user: Omit<User, "password_hash">;
  token: string;
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


