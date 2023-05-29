export class Task {
  constructor(taskText) {
    this.taskId = localStorage.getItem("taskId");
    this.taskDate = sessionStorage.getItem("calendarDate");
    this.taskText = taskText;
  }

  set taskText(text) {
    if (text.length == 0) throw new textTaskError("Can't add empty task!");
    if (text.length > 500)
      throw new textTaskError("Maximal size of task's text is 500 symbols!");
    this._taskText = text;
  }

  set taskDate(date) {
    let nowDate = new Date();
    nowDate.setHours(0, 0, 0, 0);
    let tmpDate = new Date(date.split(".").reverse().join("-"));
    if (tmpDate < nowDate)
      throw new dateTaskError("Task's date can't be less than today's date");
    this._taskDate = date;
  }

  set taskId(id) {
    this._taskId = id;
    id++;
    localStorage.setItem("taskId", id);
  }

  get taskId() {
    return this._taskId;
  }

  get taskDate() {
    return this._taskDate;
  }

  get taskText() {
    return this._taskText;
  }
}

export class textTaskError extends Error {}
export class dateTaskError extends Error {}
