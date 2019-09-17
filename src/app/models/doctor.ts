import { TimeSlot } from './time-slot';
export class Doctor {
  doctorId: string;
  doctorFirstName: string;
  doctorLastName: string;
  doctorEmail: string;
  doctorPhone: string;
  doctorCity: string;
  doctorRegNum: string;
  doctorAddress: string;
  pincode: string;
  doctorSpecialization: string;
  doctorExperience: string;
  doctorSlots: TimeSlot[];
}

