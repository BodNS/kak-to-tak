class Calendar {
    constructor(container) {
      this.container = container;
      this.date = new Date();
    }
  
    render() {
      // Создаем таблицу календаря
      const table = document.createElement('table');
  
      // Создаем заголовок таблицы
      const thead = document.createElement('thead');
      const tr = document.createElement('tr');
      const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
      const month = months[this.date.getMonth()];
      const year = this.date.getFullYear();
      const th = document.createElement('th');
      th.colSpan = 7;
      th.textContent = `${month} ${year}`;
      tr.appendChild(th);
      thead.appendChild(tr);
      table.appendChild(thead);
  
      // Создаем заголовки столбцов таблицы
      const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
      const tbody = document.createElement('tbody');
      const trWeekdays = document.createElement('tr');
      weekdays.forEach((weekday) => {
        const td = document.createElement('td');
        td.textContent = weekday;
        trWeekdays.appendChild(td);
      });
      tbody.appendChild(trWeekdays);
  
      // Создаем ячейки таблицы с датами
      const firstDayOfMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
      const lastDayOfMonth = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();
      let date = 1;
      let prevMonthDays = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();
      let nextMonthDays = 1;
      for (let i = 0; i < 6; i++) {
        const trDates = document.createElement('tr');
        for (let j = 0; j < 7; j++) {
          const td = document.createElement('td');
          if (i === 0 && j < firstDayOfMonth) {
            // Пустые ячейки до первого дня месяца
            td.textContent = prevMonthDays - firstDayOfMonth + j + 1;
            td.classList.add('other-month');
          } else if (date > lastDayOfMonth) {
            // Пустые ячейки после последнего дня месяца
            td.textContent = nextMonthDays;
            td.classList.add('other-month');
            nextMonthDays++;
          } else {
            td.textContent = date;
            if (date === this.date.getDate()) {
              td.classList.add('today');
            }
            date++;
          }
          trDates.appendChild(td);
        }
        tbody.appendChild(trDates);
      }
      table.appendChild(tbody);
  
      // Добавляем таблицу в контейнер
      this.container.innerHTML = '';
      this.container.appendChild(table);
    }
  
    nextMonth() {
      this.date.setMonth(this.date.getMonth() + 1);
      this.render();
    }
  
    prevMonth() {
      this.date.setMonth(this.date.getMonth() - 1);
      this.render();
      }
      
      setDate(date) {
      this.date = new Date(date);
      this.render();
      }
      }
      
      // Создаем календарь и добавляем его на страницу
      const container = document.getElementById('calendar');
      const calendar = new Calendar(container);
      calendar.render();
      
      // Добавляем обработчики событий на кнопки "Назад" и "Вперед"
      const prevButton = document.getElementById('prev');
      const nextButton = document.getElementById('next');
      prevButton.addEventListener('click', () => calendar.prevMonth());
      nextButton.addEventListener('click', () => calendar.nextMonth());

  