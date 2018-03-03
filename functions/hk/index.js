const { isWeekend, isHolidayPromise } = require('./lib/isHoliday.js');

exports.handle = function (e, ctx, cb) {
  console.log('processing event: %j', e);

  let date = new Date();

  if (e.pathParameters && e.pathParameters.date) {
    if (!isNaN(Date.parse(e.date))) {
      return cb(new Error('Specified date format is invalid'));
    }
    date = new Date(e.date);
  }

  return isHolidayPromise(date).then(bool =>
    cb(null, {
      isHoliday: bool,
      isWeekend: isWeekend(date),
    })
  ).catch(ex => {
    console.error(ex.message);
    return cb(ex);
  });
};
