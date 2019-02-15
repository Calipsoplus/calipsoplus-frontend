import { CalipsoExperiment } from './calipso-experiment';

export class CalipsoPaginationExperiment {
  constructor(public count: number,
              public next: string,
              public previous: string,
              public page_size: number,
              public results: CalipsoExperiment[]) { }
}
