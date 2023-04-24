/* 
Referencing https://mattlewis92.github.io/angular-calendar/#/kitchen-sink
*/

import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';

const colors: Record<string, EventColor> = {
  breakfast: {
    primary: '#932F1B',
    secondary: '#965A4E',
  },
  lunch: {
    primary: '#45A7DE',
    secondary: '#98C3DB',
  },
  dinner: {
    primary: '#2B5750',
    secondary: '#5B7E7E',
  },
  snack: {
    primary: '#2B5750',
    secondary: '#5B7E7E',
  },
};

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./calendar.component.css'],
  templateUrl: './calendar.component.html',
})
export class CalendarComponent {
  @ViewChild('modalContent', { static: true })
  modalContent!: TemplateRef<any>;

  view: CalendarView = CalendarView.Month; // sets default view

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData!: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh = new Subject<void>();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal) {}

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  editEvents(): void {
    
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        option: document.getElementById('mealOption') as HTMLInputElement,
        title: document.getElementById('foodsEaten') as HTMLInputElement,
        color: this.selectMealColor(document.getElementById('mealOption')?.outerText),
        datetime: document.getElementById('datetime') as HTMLInputElement,
      },
    ];
  }

  // used for adding events
  // corresponds with user's choice on table dropdown
  selectMealColor(option: string | undefined): EventColor{
    if (option ='breakfast'){
      return colors['breakfast'];
    }
    else if (option ='lunch'){
      return colors['lunch'];
    }
    else if (option ='dinner'){
      return colors['dinner'];
    }
    else { //(option ='snack')
      return colors['snack'];
    }
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }  
}

/* // FOR TESTING
var newId = 4
var newTest = {'name':null, 'id':newId, 'result':null}

var tests = [
  {'name':'Distillation 50%', 'id':'1', 'result':"43"},
    {'name':'Flash Point', 'id':'2', 'result':"61"},
    {'name':'Water By Karl Fischer', 'id':'3', 'result':"24"},
]

for (var i in tests){
  addRow(tests[i])
}
*/

function addRow(obj: any){
  obj.classList.remove("hidden");
  var row = `<tr scope="row" class="test-row-${obj.id}">
            <td>${obj.name}</td>
                  <td id="result-${obj.id}" data-testid="${obj.id}"">${obj.result}</td>
                  <td>
                      <button class="btn btn-sm btn-danger" data-testid=${obj.id} id="delete-${obj.id}">Delete</button>
                      <button class="btn btn-sm btn-info" disabled data-testid="${obj.id}"  id="save-${obj.id}">Save</button>
                      
                      <button class="btn btn-sm btn-danger hidden" data-testid="${obj.id}"  id="cancel-${obj.id}">Cancel</button>
                      <button class="btn btn-sm btn-primary hidden" data-testid="${obj.id}"  id="confirm-${obj.id}">Confirm</button>
                      
                  </td>
          </tr>`
  $('#tests-table').append(row)

  $(`#delete-${obj.id}`).on('click', deleteTest)
  $(`#cancel-${obj.id}`).on('click', cancelDeletion)
  $(`#confirm-${obj.id}`).on('click', confirmDeletion)
  $(`#save-${obj.id}`).on('click', saveUpdate)
  $(`#result-${obj.id}`).on('click', editResult)		
}

function editResult(obj: any){
  var testid = $(obj).data('testid')
  var value = $(obj).html()

  $(obj).unbind()
  $(obj).html(`<input class="result form-control" data-testid="${testid}" type="text" value="${value}">`)

  $(`.result`).on('keyup', function(){
    var testid = $(obj).data('testid')
    var saveBtn = $(`#save-${testid}`)
    saveBtn.prop('disabled', false)

  })

}

function saveUpdate(obj: any){
  console.log('Saved!')
  var testid = $(obj).data('testid')
  var saveBtn = $(`#save-${testid}`)
  var row = $(`.test-row-${testid}`)

  saveBtn.prop('disabled', true)
  row.css('opacity', "0.5")

  setTimeout(function(){
    row.css('opacity', '1')
  }, 2000)
}

function deleteTest(obj: any){
  var testid = $(obj).data('testid')

  var deleteBtn = $(`#delete-${testid}`)
  var saveBtn = $(`#save-${testid}`)
  var cancelBtn = $(`#cancel-${testid}`)
  var confirmBtn = $(`#confirm-${testid}`)

  deleteBtn.addClass('hidden')
  saveBtn.addClass('hidden')

  cancelBtn.removeClass('hidden')
  confirmBtn.removeClass('hidden')
}

function cancelDeletion(obj: any){
  var testid = $(obj).data('testid')

  var deleteBtn = $(`#delete-${testid}`)
  var saveBtn = $(`#save-${testid}`)
  var cancelBtn = $(`#cancel-${testid}`)
  var confirmBtn = $(`#confirm-${testid}`)

  deleteBtn.removeClass('hidden')
  saveBtn.removeClass('hidden')

  cancelBtn.addClass('hidden')
  confirmBtn.addClass('hidden')
}

function confirmDeletion(obj: any){
  var testid = $(obj).data('testid')
  var row = $(`.test-row-${testid}`)
  row.remove()
}

