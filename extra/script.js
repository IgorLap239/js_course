
/*Добрый день (утро, вечер, ночь в зависимости от времени суток)
Сегодня: Понедельник
Текущее время:12:05:15 PM
До нового года осталось 175 дней*/

'use strict';

const newYearTimer = () => {
  let greeting = document.getElementById('greeting'),
      dayOfWeek = document.getElementById('day-of-week'),
      time = document.getElementById('time'),
      remainder = document.getElementById('remainder'),
      date = new Date(),
      newYearDate = new Date(),
      week = ['Воскресение', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
      timesOfDay = ['утро', 'день', 'вечер', 'ночи'];

      if (date.getHours() > 5 && date.getHours() < 12) {
        greeting.textContent = 'Доброе ' + timesOfDay[0];
      } else if (date.getHours() >= 12 && date.getHours() <= 16) {
        greeting.textContent = 'Добрый ' + timesOfDay[1];
      } else if (date.getHours() > 16 && date.getHours() < 22) {
        greeting.textContent = 'Добрый ' + timesOfDay[2];
      } else {
        greeting.textContent = 'Доброй ' + timesOfDay[3];
      }

      dayOfWeek.textContent = 'Сегодня: ' + week[date.getDay()];
      time.textContent = 'Текущее время: ' + date.toLocaleString('en').substr(11);

      let nextYear = date.getFullYear() + 1;
      newYearDate.setFullYear(nextYear, 0, 1);
      let daysRemaining = Math.ceil((((newYearDate - date.getTime()) / 1000) / 60 / 60) / 24);
      remainder.textContent = 'До нового года осталось ' + daysRemaining + ' дней';

};

newYearTimer();