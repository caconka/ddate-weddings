import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AdminService } from '../services/admin.service';
import { SpotService } from '../services/spot.service';
import { NgbDateStruct, NgbCalendar, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

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
  photos: Array<string>,
  lat: string,
  lng: string,
  guest: string,
  menuPrice: string,
  style: string,
  place: string,
  places: Array<string>,
  services: Array<string>,
  description: string
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
    photos: [],
    lat: '',
    lng: '',
    guest: '',
    menuPrice: '',
    style: '',
    place: '',
    places: [],
    services: [],
    description: ''
  }

  hoveredDate: NgbDateStruct;
  fromDate: NgbDateStruct;
  toDate: NgbDateStruct;

  constructor(private auth: AuthService, private adminService: AdminService,
              private calendar: NgbCalendar, private config: NgbDatepickerConfig,
              private router: Router, private spotService: SpotService) { 
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
  }

  addDate(from, to) {
    const dayDiff = to.day - from.day;
    for(let i=0; i<=dayDiff; i++) {
      const day = { year: from.year, month: from.month, day: from.day + i }
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

  addPlaces(place) {
    this.formInfo.places.push(place);
  }

  addServices(service) {
    this.formInfo.services.push(service);
  }

  addPhoto(photo) {
    this.formInfo.photos.push(photo);
  }

  addSpot(street, country, city) {
    const address = `${street},${country},${city}`;

    this.spotService.getGeoData(address)
    .subscribe(res => {
      if(res.status === 'OK') {
        this.formInfo.lat = res.results[0].geometry.location.lat; 
        this.formInfo.lng = res.results[0].geometry.location.lng; 
        const { userId, spotName, dates, photos, lat, lng, guest, menuPrice, style,
                place, places, services, description } = this.formInfo;
        
        this.adminService.createSpot(userId, spotName, dates, photos, lat, lng, guest, menuPrice,
                                     style, place, places, services, description)
        .subscribe(res => {
          this.formInfo = { userId: '', spotName: '', dates: [], photos: [], lat: '', lng: '',
            guest: '', menuPrice: '', style: '', place: '', places: [], services: [], description: '' };
        });
      }
    })
  }

}
