import { Component, OnInit } from '@angular/core';
import { TimeSlot } from '../../models/time-slot';
import { MatDialog } from '@angular/material';
import { TimeSlotComponent } from '../time-slot/time-slot.component';
import { TimeSlotService } from '../../services/time-slot.service';
import { OnboardingService } from 'src/app/services/onboarding.service';

@Component({
  selector: 'app-diagnostic-center-manage-slots',
  templateUrl: './diagnostic-center-manage-slots.component.html',
  styleUrls: ['./diagnostic-center-manage-slots.component.css']
})
export class DiagnosticCenterManageSlotsComponent implements OnInit {

  timeSlots: TimeSlot[];
  timeSlotsExist: boolean;
  addSlotButtonClicked = false;
  userid: string;

  constructor(
    private dialog: MatDialog,
    private timeSlotService: TimeSlotService,
    private onboardingService: OnboardingService
  ) { }

  ngOnInit() {
    this.userid = '45987123-ed2456';
    // this.userid = this.onboardingService.userid;
    this.getAllDiagCenTimeSlots(this.userid);
  }

  getAllDiagCenTimeSlots(id: string) {
    this.timeSlotService.getDiagnosticCenterTimeSlots(id).subscribe((data) => {
      console.log(data);
      this.timeSlots = data;
      if (this.timeSlots.length > 0) {
        this.timeSlotsExist = true;
      }
    });
  }

  getSpecificTimeSlot(dcId: string, id: string) {
    this.timeSlotService.getSingleTimeSlotOfDiagnosticCenter(this.userid, id).subscribe((data) => {
      console.log(data);
    });
    this.timeSlotService.dcId = dcId;
    this.timeSlotService.timeSlotId = id;
    this.openDialog();
  }

  addNewSlot(userid: string) {
    this.timeSlotService.dcId = this.userid;
    this.timeSlotService.timeSlotId = '';
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TimeSlotComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
