export class TimeSlot {
  slotId: string;
  doctorId?: string;
  diagnosticCenterId?: string;
  slotDate: string;
  slotStartTime: string;
  slotEndTime: string;
  testConductedInSlot?: string;
  slotCapacity: number;
}
