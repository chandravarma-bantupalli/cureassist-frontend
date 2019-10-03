export class Patient {
    userId: string;
    patientId?: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    uaid: string;
    email: string;
    phoneNumber: Int32Array;
    emergencyContactNumber: Int32Array;
    gender: string;
    city: string;
    symptoms?: any;
}
export interface ISymptomsBySuggestions {
    specialization: string;
    symptoms: Array<string>;
}
export interface IPincode {
    city: string;
    area: string;
    pincode: string;
}
