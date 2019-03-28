export class CalipsoImage {
  constructor(
      public public_name: string,
      public image: string,
      public protocol: string,
      public flavor: string,
      public cpu: number,
      public memory: string,
      public hdd: string,
      public resource_type: string) {  }
}
