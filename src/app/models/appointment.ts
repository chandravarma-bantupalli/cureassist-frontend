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
    Date?: Date;
    StartTime?: Date;
    EndTime?: Date;
    DoctorId?: string;
    DiagnosticCenterId?: string;
    startTime?: Date;
    endTime?: Date;
    date?: Date;
    symptoms?: any;
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
    //////////////////////////////////
    doctorFirstName?: string;
    doctorLastName?: string;
    doctorPhoneNumber?: string;
    startTime?: any;
    endTime?: any;
    symptoms?: string[];
    ////////////////////////////////
    slots: AppointmentSlot[];
}

export class AppointmentSlot {
    attendees: Attendee[];
    timeSlot: AppointmentTimeSlot;
}
export class Attendee {
    attendeeId: string;
    symptoms: string[];
}
