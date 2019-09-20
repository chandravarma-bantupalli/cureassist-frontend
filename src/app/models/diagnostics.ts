import { TimeSlot } from './time-slot';

export interface IDiagnostics {

  diagnosticCenterId: string;
  diagnosticCenterName: string;
  diagnosticCenterEmail: string;
  diagnosticCenterPhone: string;
  diagnsoticCenterCity: string;
  diagnosticCenterRegNum: string;
  diagnosticCenterAddress: string;
  pincode: string;
  testsConducted: string;
  diagnosticCenterSlots: TimeSlot[];

// tslint:disable-next-line:eofline
}