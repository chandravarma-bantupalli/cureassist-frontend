import { Component, OnInit, Inject } from '@angular/core';
import { TestReports } from 'src/app/models/testreports';
import { HealthrecordsService } from 'src/app/services/healthrecords.service';
import { ActivatedRoute } from '@angular/router';
import { OnboardingService } from 'src/app/services/onboarding.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

@Component({
  selector: 'app-view-testreports',
  templateUrl: './view-testreports.component.html',
  styleUrls: ['./view-testreports.component.css']
})
export class ViewTestreportsComponent implements OnInit {

  allTestReports: TestReports[];
  fileUrl: string;
  rxdFileUrl: boolean;
  testreports: any;

 // tslint:disable-next-line:max-line-length
 constructor( private dialog: MatDialog, private service: HealthrecordsService, private route: ActivatedRoute, private onboardservice: OnboardingService
  ) {}
  //  this.route.params.subscribe(params => this.patientid = params.patientid);

 ngOnInit() {
   this.service.getReportofpatient(this.onboardservice.userid).subscribe(data => this.allTestReports = data);
   // this.getUrlOfReport();
 }
 getReports() {
  this.service.getAllTestReports().subscribe( (data) => {
    console.log(data);
    this.allTestReports = data;
  }, (err) => {
    console.log(err);
  });
}


getUrlOfReport(id: string, fileName: string) {
  this.rxdFileUrl = false;
  this.service.getLinkToReport(id, fileName).subscribe( (data) => {
    console.log(data);
    this.fileUrl = data;
    this.rxdFileUrl = true;
  }, (err: Error) => {
    console.error(err);
  });
}
openDialog() {
  // tslint:disable-next-line: no-use-before-declare
  const dialogRef = this.dialog.open(ViewReport, {
    width: '500px',
    data: {fileurl: this.fileUrl, rxdFileUrl: this.rxdFileUrl}
  });

}
}
@Component({
  selector: 'app-view-report',
  templateUrl: './view-report.html',
  providers: [ViewReport]
})

// tslint:disable-next-line:component-class-suffix
export class ViewReport {

  constructor(
    public dialogRef: MatDialogRef<ViewReport>,
    // tslint:disable-next-line:max-line-length
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }
  onNoClick(): void {
    this.dialogRef.close();

  }
}
