export interface PasswordDto {
  _id: string;
  password: string;
  domain: string;
  domainAlias: string;
  iconUrl?: string;
  user: string;
}
