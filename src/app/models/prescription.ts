export class Prescription {
  prescriptionId: string;
  prescriptionDate: string;
  patientId: string;
  patientName: string;
  patientPhoneNumber: string;
  doctorName: string;
  doctorphoneNumber: string;
  symptoms: string[];
  remarks: string;
  suggestedTests: string[];
  allPrescribedMedicines: PrescribedMedicines[];
}

export class PrescribedMedicines {
  medicineName: string;
  prescribedDosage: string;
  prescribedTimings: string[];
  prescribedDays: string;
}
