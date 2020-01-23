export class CalipsoContainer {
  constructor(
    public id: number,
    public calipso_user: string,
    public calipso_experiment: string,
    public container_id: string,
    public container_name: string,
    public container_status: string,
    public container_logs: string,
    public guacamole_username: string,
    public guacamole_password: string,
    public vnc_password: string,
    public creation_date: string,
    public host_port: string,
    public public_name: string,
    public container_info: string
  ) {}
}
