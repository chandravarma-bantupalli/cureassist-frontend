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
}
export class Daycalendar {
    UserId: string;
    Date: any;
}
