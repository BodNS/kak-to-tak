export class Calendar {
  constructor(calendarContainer, todayDate) {
    this.calendarContainer = calendarContainer;
    this.todayDate = todayDate;
  }

  render() {
    const tr = [],
      td = [],
      theadTrTh = [];
    const weekDays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
    const Month = {
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

    const storageCalendarDay = ((this.todayDate.getDate()) - 10 < 0)? '0'+(this.todayDate.getDate()) : (this.todayDate.getDate());
    const storageCalendarMonth = ((this.todayDate.getMonth()+1) - 10 < 0)? '0'+(this.todayDate.getMonth()+1) : (this.todayDate.getMonth()+1);
    const storageCalendarDate = `${storageCalendarDay}.${storageCalendarMonth}.${this.todayDate.getFullYear()}`;
    sessionStorage.setItem("calendarDate", storageCalendarDate);

    const calendarWrapper = document.createElement("div");
    calendarWrapper.classList.add("calendar__calendar-wrapper");
    this.calendarContainer.append(calendarWrapper);

    const calendarCaption = document.createElement("div");
    calendarCaption.classList.add("calendar__calendar-caption");

    const prevButton = document.createElement("span");
    prevButton.classList.add("calendar__button");
    prevButton.setAttribute("id", "prev");
    prevButton.innerText = "<";

    const tableCaption = document.createElement("div");
    tableCaption.innerText = `${
      Month[this.todayDate.getMonth()]
    } ${this.todayDate.getFullYear()}`;
    tableCaption.classList.add("calendar__table-caption");

    const nextButton = document.createElement("span");
    nextButton.classList.add("calendar__button");
    nextButton.setAttribute("id", "next");
    nextButton.innerText = ">";

    calendarCaption.append(prevButton, tableCaption, nextButton);

    const table = document.createElement("table");
    calendarWrapper.append(calendarCaption, table);

    const calendarButtons = document.querySelectorAll(".calendar__button");
    calendarButtons.forEach(e=> e.addEventListener("click", (e) =>
    this.moveMonth(e, calendarWrapper)));

    const thead = document.createElement("thead");
    thead.classList.add("calendar__thead");

    const theadTr = document.createElement("tr");
    theadTr.classList.add("calendar__thead-tr");
    thead.append(theadTr);

    for (let i = 1; i <= 7; i++) {
      theadTrTh[i] = document.createElement("th");
      theadTrTh[i].innerText = weekDays[i - 1];
      theadTrTh[i].classList.add("calendar__thead-tr-th");
      theadTr.append(theadTrTh[i]);
    }

    const tbody = document.createElement("tbody");
    tbody.classList.add("calendar__tbody");

    table.append(thead, tbody);

    tbody.addEventListener("click", (event) => this.getClickedDate(event, this.todayDate));

    let firstDayOfMonth = new Date(
      this.todayDate.getFullYear(),
      this.todayDate.getMonth(),
      1
    ).getDay(); //dayOfWeek
    const lastDateOfMonth = new Date(
      this.todayDate.getFullYear(),
      this.todayDate.getMonth() + 1,
      0
    ).getDate(); //lastDateOfMonth
    const prevMonthDays = new Date(
      this.todayDate.getFullYear(),
      this.todayDate.getMonth(),
      0
    ).getDate(); //lastDatePrevMonth
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
          if (calendarDate === this.todayDate.getDate())
            td[k].classList.add("calendar__tbody_today");
          calendarDate++;
        }
        tr[i].append(td[k]);
      }
      tbody.append(tr[i]);
    }
  }

  moveMonth(event, calendarWrapper) {
    event.target.id == "prev"
      ? this.todayDate.setMonth(this.todayDate.getMonth() - 1)
      : this.todayDate.setMonth(this.todayDate.getMonth() + 1);
    calendarWrapper.remove();
    this.render(this.todayDate);
  }

  getClickedDate(event, todayDate) {
    const prevClickedDate = document.querySelector('.calendar__tbody_today');
    prevClickedDate.classList.remove('calendar__tbody_today');
    event.target.classList.add('calendar__tbody_today');

    const clickedDay = event.target.innerText;
    todayDate.setDate(clickedDay);
    const storageCalendarDate = ((todayDate.getDate()) - 10 < 0)? '0'+(todayDate.getDate()) : (todayDate.getDate());
    const storageCalendarMonth = ((todayDate.getMonth()+1) - 10 < 0) ? '0'+(todayDate.getMonth()+1) : (todayDate.getMonth()+1);
    const clickedDate = `${storageCalendarDate}.${storageCalendarMonth}.${todayDate.getFullYear()}`;
    sessionStorage.setItem("calendarDate", clickedDate);
  }
}
