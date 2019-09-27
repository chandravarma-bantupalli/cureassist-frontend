export interface IAppointments {
    slots: any;
    attendees: string[];
    slot: AppointmentTimeSlot;
    startTime?: any;
    endTime?: any;
    bookdate?: any;
    doctorDetail?: any;
    diagnosticDetail?: any;
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

export class AppointmentDayCalendar {
    dayCalenderId: string;
    date: Date;
    moment: string;
    userId: string;
    slots: AppointmentSlot[];
}

export class AppointmentSlot {
    attendees: string[];
    timeSlot: AppointmentTimeSlot;
}
