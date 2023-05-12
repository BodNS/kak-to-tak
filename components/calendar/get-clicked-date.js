
export function getClickedDate(event) {
    let calendarCaption = document.getElementsByClassName('calendar__table-caption')[0].innerText;
    alert(event.target.innerText);
    alert(calendarCaption);
  }