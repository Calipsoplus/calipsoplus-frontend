export class CalipsoSession {
  constructor(public id: number,
              public body: string,
              public session_number: string,
              public start_date: string,
              public end_date: string,
              public subject: string,
              public data_set_path: string) { }
}

