import { Calendar } from "./class-calendar.js";

const calendarContainer = document.createElement("div");
calendarContainer.classList.add("calendar__calendar-container");
document.body.append(calendarContainer);

const calendar = new Calendar (calendarContainer, new Date());
calendar.render();

