import { CalipsoSession } from "./calipso-sessions";

export class CalipsoExperiment {
    constructor(public id: number,
                public subject: string,
                public body: string,
                public serial_number:string,
                public beam_line:string,
                public favorite:boolean,
                public sessions:CalipsoSession[]){ }
}
