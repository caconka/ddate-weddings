import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.css']
})
export class DiaryComponent implements OnInit {
  user: object;
  events: Array<any>;
  cal;
  thisMonth: Array<Array<string>> = [];
  toDay = new Date();
  year: number = this.toDay.getFullYear();
  month: number = this.toDay.getMonth();
  monthName: string; 
  months: Array<string> = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                           'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre',
                           'Diciembre'];
  eventDay: number;
  time: object = {hour: 13, minute: 30};
  modalAdd: boolean;
  modalShow: boolean;
  evntCont: object = {
    day: '',
    month: '',
    year: '',
    title: '',
    time: {
      hour: '',
      minute: ''
    },
    content: ''
  }

  constructor( private router: Router, private route: ActivatedRoute,
               private userService: UserService, private auth: AuthService ) { }

  ngOnInit() {
    this.modalAdd = false;
    this.modalShow = false;
    this.user = this.auth.getUser();
    this.auth.getLoginEventEmitter()
    .subscribe(user => {  
      this.user = user;
    });

    this.route.params
    .subscribe(params => {
      this.userService.getDiary(params['id'])
      .subscribe(diary => { 
        this.events = diary.events;
        this.cal = new Calendar(1);
        this.monthName = this.months[this.month];
        const m = this.cal.monthDays(this.year, this.month);
        for (let i=0; i<m.length; i++) 
          this.thisMonth.push(m[i]);
        diary.events.forEach(evnt => {
          if(evnt.date.month === this.month) {
            this.thisMonth.forEach((week, i) => {
              week.forEach((d, j) => {
                if(evnt.date.day === d) this.thisMonth[i][j] = `${d}`;
              });
            });
          }
        }); 
      });
    });

    var CalendarException = function CalendarException(message) {
      this.message = message;
      this.toString = function() {
        return this.constructor.name + ": " + this.message
      };
    }
   
    var Calendar = function Calendar(firstWeekDay) {
      this.firstWeekDay = firstWeekDay || 0;
    };
   
    Calendar.prototype = {
      constructor : Calendar,
      weekStartDate : function weekStartDate(date) {
        var startDate = new Date(date.getTime());
        while (startDate.getDay() !== this.firstWeekDay) {
          startDate.setDate(startDate.getDate() - 1);
        }
        return startDate;
      },
      monthDates : function monthDates(year, month, dayFormatter, weekFormatter) {
        if ((typeof year !== "number") || (year < 1970)) {
          throw new CalendarException('year must be a number >= 1970');
        };
        if ((typeof month !== "number") || (month < 0) || (month > 11)) {
          throw new CalendarException('month must be a number (Jan is 0)');
        };
        var weeks = [],
          week = [],
          i = 0,
          date = this.weekStartDate(new Date(year, month, 1));
        do {
          for (i=0; i<7; i++) {
            week.push(dayFormatter ? dayFormatter(date) : date);
            date = new Date(date.getTime());
            date.setDate(date.getDate() + 1);
          }
          weeks.push(weekFormatter ? weekFormatter(week) : week);
          week = [];
        } while ((date.getMonth()<=month) && (date.getFullYear()===year));
        return weeks;
      },
      monthDays : function monthDays(year, month) {
        var getDayOrZero = function getDayOrZero(date) {
          return date.getMonth() === month ? date.getDate() : 0;
        };
        return this.monthDates(year, month, getDayOrZero);
      },
      monthText : function monthText(year, month) {
        if (typeof year === "undefined") {
          var now = new Date();
          year = now.getFullYear();
          month = now.getMonth();
        };
        var getDayOrBlank = function getDayOrBlank(date) {
          var s = date.getMonth() === month ? date.getDate().toString() : "  ";
          while (s.length < 2) s = " "+s;
          return s;
        };
        var weeks = this.monthDates(year, month, getDayOrBlank,
          function (week) { return week.join(" ") });
        return weeks.join("\n");
      }
    };
    var months = "JAN FEB MAR APR MAY JUN JUL AUG SEP OCT NOV DEC".split(" ");
    for (var i=0; i<months.length; i++)
      Calendar[months[i]] = i;
  }

  nextMonth() {
    if(this.month < 11) {
      this.month += 1;
    } else {
      this.month = 0;
      this.year += 1;
    }
    this.calendar();
  }

  prevMonth() {
    if(this.month > 0) {
      this.month -= 1;
    } else {
      this.month = 11;
      this.year -= 1;
    }
    this.calendar();
  }
  
  private calendar() {
    this.monthName = this.months[this.month];
    this.thisMonth = [];
    const m = this.cal.monthDays(this.year, this.month);
    for (let i=0; i<m.length; i++) this.thisMonth.push(m[i]);
    this.events.forEach(evnt => {
      if(evnt.date.month === this.month) {
        this.thisMonth.forEach((week, i) => {
          week.forEach((d, j) => {
            if(evnt.date.day === d) this.thisMonth[i][j] = `${d}`;
          });
        });
      }
    });
  }

  open(day) {
    this.eventDay = day;
    this.modalAdd = true;
  }

  close() {
    this.modalAdd = false;
    this.modalShow = false;
  }

  addEvent(userId, title, content) {
    const date = {
      year: this.year,
      month: this.month,
      day: this.eventDay,
      time: this.time
    }
    const spotId = '';

    this.userService.addEvent(userId, title, content, date, spotId)
    .subscribe(() => {
      this.monthName = this.months[this.month];
      this.thisMonth = [];
      this.ngOnInit();
    });
  }

  showEvent(day) {
    this.events.forEach(evnt => {
      if(this.year === evnt.date.year && this.month === evnt.date.month && day == evnt.date.day) {
        this.evntCont = {
          day: day, month: this.month, year: this.year, content: evnt.content,
          title: evnt.title, time: evnt.date.time
        }
      }
    })
    this.modalShow = true;
  }
}
