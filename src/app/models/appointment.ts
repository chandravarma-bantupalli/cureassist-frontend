export interface IAppointments {
    slots: any;
    attendees: Array<string>;
    slot: AppointmentTimeSlot;
    startTime?: any;
    endTime?: any;
    bookdate?: any;
}
export class AppointmentTimeSlot {
    Date: Date;
    StartTime: Date;
    EndTime: Date;
    DoctorId?: string;
    DiagnosticCenterId?: string;
}
export class Daycalendar {
    UserId: string;
    Date: any;
}
