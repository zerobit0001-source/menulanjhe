export type LoginRequest = {
  phone_number: string;
  password: string;
};

export type LoginResponse = {
  ok: boolean;
  access: string;
  refresh: string;
};

export type AuthUser = {
  id: string;
  phone_number: string;
  email: string | null;
  full_name: string;
  is_active: boolean;
  created_at: string;
};

export type AuthMembership = {
  tenant_id: string;
  tenant_name: string;
  role: string;
  is_active: boolean;
};

export type MeResponse = {
  ok: boolean;
  user: AuthUser;
  memberships: AuthMembership[];
};

export type RefreshRequest = {
  refresh: string;
};

export type RefreshResponse = {
  ok: boolean;
  access: string;
};

export type SelectTenantRequest = {
  tenant_id: string;
};

export type SelectTenantResponse = {
  ok: boolean;
  access: string;
  refresh: string;
  tenant_id: string;
  role: string;
};