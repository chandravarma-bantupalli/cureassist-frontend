import { TimeSlot } from './time-slot';

export class DiagnosticCenter {
  diagnosticCenterId: string;
  userid: string;
  diagnosticCenterName: string;
  diagnosticCenterEmail: string;
  diagnosticCenterPhone: string;
  diagnosticCenterCity: string;
  diagnosticCenterRegNum: string;
  diagnosticCenter: string;
  pincode: string;
  testsConducted: string;
  diagnosticCenterSlots: TimeSlot[];
}
