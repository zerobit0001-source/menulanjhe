export type Table = {
  id: string;
  branch: string;
  name: string;
  number: number;
  capacity: number;
  qr_token: string;
  public_url: string;
  is_active: boolean;
  created_at: string;
};

export type TableListResponse = {
  ok: boolean;
  count: number;
  total_pages: number;
  current_page: number;
  results: Table[];
};

export type CreateTableRequest = {
  branch: string;
  name: string;
  number: number;
  capacity: number;
};

export type UpdateTableRequest = {
  name?: string;
  number?: number;
  capacity?: number;
  is_active?: boolean;
};
