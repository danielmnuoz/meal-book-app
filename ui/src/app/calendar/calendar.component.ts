/* 
Referencing https://mattlewis92.github.io/angular-calendar/#/kitchen-sink
*/

import { Component } from '@angular/core';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
})
export class CalendarComponent {

  view: CalendarView = CalendarView.Week; // sets default view
  CalendarView = CalendarView;
  viewDate: Date = new Date();

  setView(view: CalendarView) {
    this.view = view;
  }
}