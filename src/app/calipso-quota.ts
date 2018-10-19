export class CalipsoQuota {
  constructor(
      public max_simultaneous: number,
      public cpu: number,
      public memory: string,
      public hdd: string) {  }
}
