import { Day } from '../../index';
import { DayId } from './Enums';

const Days = {
  [DayId.monday]: {
    id: DayId.monday,
    name: {
      en: 'Monday',
      fa: 'دوشنبه'
    }
  } as Day,
  [DayId.tuesday]: {
    id: DayId.tuesday,
    name: {
      en: 'Tuesday',
      fa: 'سه شنبه'
    }
  } as Day,
  [DayId.wednesday]: {
    id: DayId.wednesday,
    name: {
      en: 'Wednesday',
      fa: 'چهارشنبه'
    }
  } as Day,
  [DayId.thursday]: {
    id: DayId.thursday,
    name: {
      en: 'Thursday',
      fa: 'پنجشنبه'
    }
  } as Day,
  [DayId.friday]: {
    id: DayId.friday,
    name: {
      en: 'Friday',
      fa: 'جمعه'
    }
  } as Day,
  [DayId.saturday]: {
    id: DayId.saturday,
    name: {
      en: 'Saturday',
      fa: 'شنبه'
    }
  } as Day,
  [DayId.sunday]: {
    id: DayId.sunday,
    name: {
      en: 'Sunday',
      fa: 'یکشنبه'
    }
  } as Day
};

export default Days;
