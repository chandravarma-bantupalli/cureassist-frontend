import { Component, OnInit } from '@angular/core';
import { TimeSlot } from '../../models/time-slot';
import { TimeSlotService } from '../../services/time-slot.service';

@Component({
  selector: 'app-diagnostic-center-home',
  templateUrl: './diagnostic-center-home.component.html',
  styleUrls: ['./diagnostic-center-home.component.css']
})
export class DiagnosticCenterHomeComponent implements OnInit {

  appointments: any[];
  timeSlots: TimeSlot[];
  diagCenId = '5d824189b35f127a3fb1916b';

  constructor(
    private timeSlotService: TimeSlotService
  ) { }

  ngOnInit() {
    this.getAllDiagCenTimeSlots(this.diagCenId);
    this.appointments = [
    ];
  }

  getAllDiagCenTimeSlots(id: string) {
    this.timeSlotService.getDiagnosticCenterTimeSlots(id).subscribe( (data) => {
      console.log(data);
      this.timeSlots = data;
    });
  }

}
