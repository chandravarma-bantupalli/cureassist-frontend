export class Prescriptions {
    orderId: any;
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
    currentLocation: string;
}
export class PrescribedMedicines {
    MedicineName: string;
    MedicinePrice?: number;
    MedicineQuantity: string;
    PrescribedDays: string;
    PrescribedDosage: string;
    PrescribedTimings: Array<string>;
}
