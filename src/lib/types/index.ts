export interface AuthState{
    type: string | null;
    access_token: string | null;
    refresh_token: string | null;
    expires_in: number | null;
    expired_at: number | null;
}
