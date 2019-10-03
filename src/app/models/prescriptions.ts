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
    prescriptionImage?: File;
    prescribedMedicines: Array<PrescribedMedicines>;
    prescription: any;
    currentLocation: string;
    pincode?: string;
}
export class PrescribedMedicines {
    MedicineName: string;
    MedicinePrice?: number;
    MedicineQuantity: string;
    PrescribedDays: string;
    PrescribedDosage: string;
    PrescribedTimings: Array<string>;
}
export interface ISymptoms {
    symptoms: Array<string>;
}
export interface IMedicine {
    drugs: Array<string>;
}
