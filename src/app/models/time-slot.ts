export class TimeSlot {
  slotId: string;
  doctorId?: string;
  diagnosticCenterId?: string;
  slotStartTime: string;
  slotEndTime: string;
  testConductedInSlot?: string;
  slotCapacity: number;
}
