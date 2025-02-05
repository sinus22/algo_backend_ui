export interface RefreshToken {
  id: string;
  token: string;
  userId: number;
  expiryTime: Date;
  createdAt: Date;
  updatedAt: Date;
}
