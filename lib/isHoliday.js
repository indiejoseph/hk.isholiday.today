const ical = require('ical');

const fetchHongKongHolidays = () =>
  new Promise((resolve, reject) => {
    const url = 'http://www.1823.gov.hk/common/ical/tc.ics';
    ical.fromURL(url, {}, (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });

const isHoliday = (date = new Date(), holidays) => {
  const range = holidays
    .reduce((a, b) => ([
      new Date(Math.min(a[0], b.end)),
      new Date(Math.max(a[1], b.end)),
    ]), [new Date(), new Date(0)]);

  if (date < range[0] || date > range[1]) {
    throw new Error('The given date is out of range');
  }

  return holidays.findIndex(h => date >= h.start && date <= h.end) !== -1;
};

const isHolidayPromise = (date = new Date()) =>
  fetchHongKongHolidays().then(data => {
    const holidays = Object.keys(data).map(key => data[key]);
    return isHoliday(date, holidays);
  });

const isWeekend = (date = new Date()) => {
  const dayOfWeek = date.getDay();
  return dayOfWeek === 6 || dayOfWeek === 0;
};

isHolidayPromise(new Date())
  .then(h => {
    console.log(h, isWeekend(new Date()));
  })
  .catch(ex => console.error(ex));

module.exports = {
  isHoliday,
  isHolidayPromise,
  isWeekend,
};
