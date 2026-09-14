export type RestaurantProfile = {
  id: string;
  name: string;
  slug: string;
  logo: string | null;
  cover_image: string | null;
  description: string;
  phone: string;
  address: string;
  website: string;
  social_links: Record<string, string>;
  created_at: string;
  updated_at: string;
};

export type RestaurantProfileResponse = {
  ok: boolean;
  id: string;
  name: string;
  slug: string;
  logo: string | null;
  cover_image: string | null;
  description: string;
  phone: string;
  address: string;
  website: string;
  social_links: Record<string, string>;
  created_at: string;
  updated_at: string;
};

export type UpdateRestaurantProfileRequest = {
  name?: string;
  logo?: string | null;
  cover_image?: string | null;
  description?: string;
  phone?: string;
  address?: string;
  website?: string;
  social_links?: Record<string, string>;
};

export type Branch = {
  id: string;
  name: string;
  slug: string;
  address: string;
  phone: string;
  is_active: boolean;
  is_default: boolean;
  created_at: string;
};

export type BranchListResponse = {
  ok: boolean;
  count: number;
  total_pages: number;
  current_page: number;
  results: Branch[];
};

export type CreateBranchRequest = {
  name: string;
  address?: string;
  phone?: string;
};

export type UpdateBranchRequest = {
  name?: string;
  address?: string;
  phone?: string;
  is_active?: boolean;
};
