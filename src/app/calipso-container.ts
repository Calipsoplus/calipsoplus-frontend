export class CalipsoContainer {
  constructor(
    public id: number,
    public calipso_username: string,
    public calipso_experiment: string,
    public container_id: string,
    public container_name: string,
    public container_status: string,
    public container_info: string,
    public container_logs: string,
    public guacamole_username: string,
    public guacamole_password: string,
    public vnc_password: string
  ) {}
}
