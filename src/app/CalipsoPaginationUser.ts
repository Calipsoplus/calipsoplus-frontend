import {CalipsoUser} from './calipso-user';

export class CalipsoPaginationUser {
  constructor(public count: number,
              public next: string,
              public previous: string,
              public page_size: number,
              public results: CalipsoUser[]) { }
}
