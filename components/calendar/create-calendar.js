import {getClickedDate} from './get-clicked-date.js';

let calendarContainer = document.createElement("div");
calendarContainer.classList.add("calendar__calendar-container");
document.body.append(calendarContainer);

function createCalendar(todayDate) {
  let tr = [],
    td = [],
    theadTrTh = [];
  let weekDays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
  let Month = {
    0: "Januar",
    1: "Februar",
    2: "März",
    3: "April",
    4: "Mai",
    5: "Juni",
    6: "Juli",
    7: "August",
    8: "September",
    9: "Oktober",
    10: "November",
    11: "Dezember",
  };

  let calendarWrapper = document.createElement("div");
  calendarWrapper.classList.add("calendar__calendar-wrapper");
  calendarContainer.append(calendarWrapper);

  let calendarCaption = document.createElement("div");
  calendarCaption.classList.add("calendar__calendar-caption");

  let prevButton = document.createElement("span");
  prevButton.classList.add("calendar__button");
  prevButton.setAttribute("id", "prev");
  prevButton.innerText = "<";

  let tableCaption = document.createElement("div");
  tableCaption.innerText = `${Month[todayDate.getMonth()]} ${todayDate.getFullYear()}`;
  tableCaption.classList.add("calendar__table-caption");

  let nextButton = document.createElement("span");
  nextButton.classList.add("calendar__button");
  nextButton.setAttribute("id", "next");
  nextButton.innerText = ">";

  calendarCaption.append(prevButton, tableCaption, nextButton);

  calendarCaption.addEventListener("click", (e) => moveMonth(e, todayDate, calendarWrapper));

  let table = document.createElement("table");
  calendarWrapper.append(calendarCaption, table);

  let thead = document.createElement("thead");
  thead.classList.add("calendar__thead");

  let theadTr = document.createElement("tr");
  theadTr.classList.add("calendar__thead-tr");
  thead.append(theadTr);

  for (let i = 1; i <= 7; i++) {
    theadTrTh[i] = document.createElement("th");
    theadTrTh[i].innerText = weekDays[i - 1];
    theadTrTh[i].classList.add("calendar__thead-tr-th");
    theadTr.append(theadTrTh[i]);
  }

  let tbody = document.createElement("tbody");
  tbody.classList.add("calendar__tbody");

  table.append(thead, tbody);

  tbody.addEventListener('click', getClickedDate);

  let firstDayOfMonth = new Date(todayDate.getFullYear(),todayDate.getMonth(),1).getDay(); //dayOfWeek
  let lastDateOfMonth = new Date(todayDate.getFullYear(),todayDate.getMonth() + 1,0).getDate(); //lastDateOfMonth
  let prevMonthDays = new Date(todayDate.getFullYear(),todayDate.getMonth(),0).getDate(); //lastDatePrevMonth
  let calendarDate = 1,
    nextMonthDate = 1;

  if (firstDayOfMonth === 0) firstDayOfMonth = 7;

  for (let i = 1; i <= 6; i++) {
    tr[i] = document.createElement("tr");
    //tr[i].classList.add("calendar__tbody_tr");
    for (let k = 1; k <= 7; k++) {
      td[k] = document.createElement("td");
      if (i === 1 && k < firstDayOfMonth) {
        td[k].innerText = prevMonthDays - firstDayOfMonth + 1 + k;
        td[k].classList.add("calendar__tbody_other-month");
      } else if (calendarDate > lastDateOfMonth) {
        td[k].innerText = nextMonthDate;
        nextMonthDate++;
        td[k].classList.add("calendar__tbody_other-month");
      } else {
        td[k].innerText = calendarDate;
        td[k].classList.add("calendar__tbody_this-month");
        if (calendarDate === todayDate.getDate()) td[k].classList.add("calendar__tbody_today");
        calendarDate++;
      }
      tr[i].append(td[k]);
    }
    tbody.append(tr[i]);
  }
  
}


function moveMonth(event, todayDate, calendarWrapper) {
  event.target.id == "prev"
    ? todayDate.setMonth(todayDate.getMonth() - 1)
      : todayDate.setMonth(todayDate.getMonth() + 1);
  calendarWrapper.remove();
  createCalendar(todayDate);
}

createCalendar(new Date());

