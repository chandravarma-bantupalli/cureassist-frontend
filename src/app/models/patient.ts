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
}
export interface ISymptomsBySuggestions {
    specialization: string;
    symptoms: Array<string>;
}
