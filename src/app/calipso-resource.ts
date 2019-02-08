export class CalipsoResource {
  constructor(
    public experiment: string,
    public machine_name: string,
    public machine_ip: string,
    public creation_date: string,
    public last_accessed_date: string,
    public expiration_date: string,
    public info:string,
    public public_name:string
  ) {}
}
