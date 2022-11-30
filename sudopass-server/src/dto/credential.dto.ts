export class CredentialDto {
  _id?: string;
  readonly domain: string;
  readonly domainAlias: string;
  readonly user: string;
  readonly password: string;
  lastUpdate: Date;
}