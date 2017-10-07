import { Component, OnInit } from '@angular/core';
import { FileUploader } from "ng2-file-upload";
import { AuthService } from '../services/auth.service';
import { AdminService } from '../services/admin.service';
import { NgbDateStruct, NgbCalendar, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../environments/environment';

const BASEURL = environment.BASEURL + "/spot";

const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
!one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
  ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
!one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
  ? false : one.day > two.day : one.month > two.month : one.year > two.year;

const toDay = new Date();

interface ProviderForm{
  userId: string,
  spotName: string,
  dates: Array<object>,
  photos: Array<string>
}

@Component({
  selector: 'app-provider-signup',
  templateUrl: './provider-signup.component.html',
  styleUrls: ['./provider-signup.component.css'],
  providers: [NgbDatepickerConfig]
})
export class ProviderSignupComponent implements OnInit {
  providers: Array<object>;

  formInfo: ProviderForm = {
    userId: '',
    spotName: '',
    dates: [],
    photos: []
  }

  uploader: FileUploader ;
  feedback: string;

  hoveredDate: NgbDateStruct;
  fromDate: NgbDateStruct;
  toDate: NgbDateStruct;

  constructor(private auth: AuthService, private adminService: AdminService,
              private calendar: NgbCalendar, private config: NgbDatepickerConfig) { 
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    config.minDate = {year: toDay.getFullYear(), month: toDay.getMonth(), 
                      day: toDay.getDay()};
    config.maxDate = {year: toDay.getFullYear() + 5, month: 12, day: 31};
    config.outsideDays = 'hidden';
  }

  ngOnInit() {
    this.adminService.getProviders()
    .subscribe(providers => { this.providers = providers });

    this.uploader = new FileUploader({ url: `${BASEURL}/signup` });

    this.uploader.onSuccessItem = (item, response) => {
      this.feedback = JSON.parse(response).message;
    };

    this.uploader.onErrorItem = (item, response, status, headers) => {
      this.feedback = JSON.parse(response).message;
    };
  }

  createSpot() {
    const { userId, spotName } = this.formInfo;
    this.adminService.createSpot(userId, spotName)
    .subscribe();
  }

  addDate(from, to) {
    const dayDiff = to.day - from.day;
    for(let i=0; i<=dayDiff; i++) {
      const day = { year: from.year, mongth: from.month, day: from.day + i }
      this.formInfo.dates.push(day);
    }
  }

  onDateChange(date: NgbDateStruct) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && after(date, this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered = date => this.fromDate && !this.toDate && this.hoveredDate && 
                      after(date, this.fromDate) && before(date, this.hoveredDate);
  isInside = date => after(date, this.fromDate) && before(date, this.toDate);
  isFrom = date => equals(date, this.fromDate);
  isTo = date => equals(date, this.toDate);

  isDisabled(date: NgbDateStruct, current: {month: number}) {
    return date.month !== current.month;
  }


  addSpot() {
    this.uploader.onBuildItemForm = (item, form) => {
      form.append('userId', this.formInfo.userId);
      form.append('spotName', this.formInfo.spotName);
      form.append('dates', this.formInfo.dates);
    };
    this.uploader.uploadAll();
  }
}
