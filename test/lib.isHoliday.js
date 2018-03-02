const should = require('should');
const isHoliday = require('../lib/isHoliday');

describe('lib', function () {
  describe('isWeekend', function () {
    it('should return true when the given date is in weekend', () => {
      isHoliday.isWeekend(new Date('2018-3-4')).should.be.true();
    });

    it('should return false when the given date is in weekday', () => {
      isHoliday.isWeekend(new Date('2018-3-2')).should.be.false();
    });
  });

  describe('isHoliday', function () {
    it('should return true when the given date is Christmas', () => {
      const holidays = [{ type: 'VEVENT',
        params: [],
        start: new Date('2018-12-24'),
        end: new Date('2018-12-25'),
        transparency: 'TRANSPARENT',
        uid: '20181225@1823.gov.hk',
        summary: '聖誕節',
      }];

      isHoliday.isHoliday(new Date('2018-12-24'), holidays).should.be.true();
    });

    it('should return true when the given date is not Christmas', () => {
      const holidays = [{ type: 'VEVENT',
        params: [],
        start: new Date('2018-09-30'),
        end: new Date('2018-10-01'),
        transparency: 'TRANSPARENT',
        uid: '20181001@1823.gov.hk',
        summary: '國慶日'
      }, {
        type: 'VEVENT',
        params: [],
        start: new Date('2018-12-25'),
        end: new Date('2018-12-26'),
        transparency: 'TRANSPARENT',
        uid: '20181226@1823.gov.hk',
        summary: '聖誕節後第一個周日'
      }];

      isHoliday.isHoliday(new Date('2018-12-24'), holidays).should.be.false();
    });

    it('should throw an error when the given date is out of range', () => {
      const holidays = [{ type: 'VEVENT',
        params: [],
        start: new Date('2018-09-30'),
        end: new Date('2018-10-01'),
        transparency: 'TRANSPARENT',
        uid: '20181001@1823.gov.hk',
        summary: '國慶日'
      }];

      should.throws(() =>
        isHoliday.isHoliday(new Date('2018-12-24'), holidays)
        , 'The given date is out of range');
    });
  });
});
