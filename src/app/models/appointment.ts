export interface IAppointments {
    slots: any;
    attendees: Array<string>;
    slot: AppointmentTimeSlot;
}
export class AppointmentTimeSlot {
    Date: Date;
    StartTime: Date;
    EndTime: Date;
}
export class Daycalendar {
    UserId: string;
    Date: any;
}
