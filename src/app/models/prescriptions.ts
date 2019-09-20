export class Prescriptions {
    prescriptionId: string;
    prescriptionDate: Date;
    patientId: string;
    patientName: string;
    doctorName: string;
    patientphoneNumber: string;
    doctorphoneNumber: string;
    symptoms: Array<string>;
    remarks: string;
    prescribedMedicines: Array<PrescribedMedicines>;
    prescription: any;
}
export class PrescribedMedicines {
    MedicineName: string;
    MedicineQuantity: string;
    PrescribedDays: string;
    PrescribedDosage: string;
    PrescribedTimings: Array<string>;
}