import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.css']
})
export class DiaryComponent implements OnInit {
  diary;
  cal;
  thisMonth: Array<Array<string>> = [];
  toDay = new Date();
  year: number = this.toDay.getFullYear();
  month: number = this.toDay.getMonth();
  monthName: string; 
  months: Array<string> = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                           'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre',
                           'Diciembre'];

  constructor( private router: Router, private route: ActivatedRoute,
               private userService: UserService, private location: Location) { }

  ngOnInit() {
  //   this.route.params
  //   .subscribe(params => {
  //     this.userService.getDiary(params['id'])
  //     .subscribe(diary => { 
  //       this.diary = diary;
  //       this.cal = new Calendar(1);
  //       this.monthName = this.months[this.month];
  //       const m = this.cal.monthDays(this.year, this.month);
  //       for (let i=0; i<m.length; i++) this.thisMonth.push(m[i]);
  //       spot.dates.forEach(date => {
  //         if(date.month === this.month + 1) {
  //           this.thisMonth.forEach((week, i) => {
  //             week.forEach((d, j) => {
  //               if(date.day === d) this.thisMonth[i][j] = `${d}`;
  //             });
  //           });
  //         }
  //       }); 
  //     });
  //   });

  //   var CalendarException = function CalendarException(message) {
  //     this.message = message;
  //     this.toString = function() {
  //       return this.constructor.name + ": " + this.message
  //     };
  //   }
   
  //   var Calendar = function Calendar(firstWeekDay) {
  //     this.firstWeekDay = firstWeekDay || 0;
  //   };
   
  //   Calendar.prototype = {
  //     constructor : Calendar,
  //     weekStartDate : function weekStartDate(date) {
  //       var startDate = new Date(date.getTime());
  //       while (startDate.getDay() !== this.firstWeekDay) {
  //         startDate.setDate(startDate.getDate() - 1);
  //       }
  //       return startDate;
  //     },
  //     monthDates : function monthDates(year, month, dayFormatter, weekFormatter) {
  //       if ((typeof year !== "number") || (year < 1970)) {
  //         throw new CalendarException('year must be a number >= 1970');
  //       };
  //       if ((typeof month !== "number") || (month < 0) || (month > 11)) {
  //         throw new CalendarException('month must be a number (Jan is 0)');
  //       };
  //       var weeks = [],
  //         week = [],
  //         i = 0,
  //         date = this.weekStartDate(new Date(year, month, 1));
  //       do {
  //         for (i=0; i<7; i++) {
  //           week.push(dayFormatter ? dayFormatter(date) : date);
  //           date = new Date(date.getTime());
  //           date.setDate(date.getDate() + 1);
  //         }
  //         weeks.push(weekFormatter ? weekFormatter(week) : week);
  //         week = [];
  //       } while ((date.getMonth()<=month) && (date.getFullYear()===year));
  //       return weeks;
  //     },
  //     monthDays : function monthDays(year, month) {
  //       var getDayOrZero = function getDayOrZero(date) {
  //         return date.getMonth() === month ? date.getDate() : 0;
  //       };
  //       return this.monthDates(year, month, getDayOrZero);
  //     },
  //     monthText : function monthText(year, month) {
  //       if (typeof year === "undefined") {
  //         var now = new Date();
  //         year = now.getFullYear();
  //         month = now.getMonth();
  //       };
  //       var getDayOrBlank = function getDayOrBlank(date) {
  //         var s = date.getMonth() === month ? date.getDate().toString() : "  ";
  //         while (s.length < 2) s = " "+s;
  //         return s;
  //       };
  //       var weeks = this.monthDates(year, month, getDayOrBlank,
  //         function (week) { return week.join(" ") });
  //       return weeks.join("\n");
  //     }
  //   };
  //   var months = "JAN FEB MAR APR MAY JUN JUL AUG SEP OCT NOV DEC".split(" ");
  //   for (var i=0; i<months.length; i++)
  //     Calendar[months[i]] = i;
  // }

  // nextMonth() {
  //   if(this.month < 11) {
  //     this.month += 1;
  //   } else {
  //     this.month = 0;
  //     this.year += 1;
  //   }
  //   this.calendar();
  // }

  // prevMonth() {
  //   if(this.month > 0) {
  //     this.month -= 1;
  //   } else {
  //     this.month = 11;
  //     this.year -= 1;
  //   }
  //   this.calendar();
  // }
  
  // private calendar() {
  //   this.monthName = this.months[this.month];
  //   this.thisMonth = [];
  //   const m = this.cal.monthDays(this.year, this.month);
  //   for (let i=0; i<m.length; i++) this.thisMonth.push(m[i]);
  //   this.spot.dates.forEach(date => {
  //     if(date.month === this.month + 1) {
  //       this.thisMonth.forEach((week, i) => {
  //         week.forEach((d, j) => {
  //           if(date.day === d) this.thisMonth[i][j] = `${d}`;
  //         });
  //       });
  //     }
  //   });
  // }

  // back() {
  //   this.location.back();
  }

}
