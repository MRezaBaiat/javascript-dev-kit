"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Enums_1 = require("./Enums");
const Days = {
    [Enums_1.DayId.monday]: {
        id: Enums_1.DayId.monday,
        name: {
            en: 'Monday',
            fa: 'دوشنبه'
        }
    },
    [Enums_1.DayId.tuesday]: {
        id: Enums_1.DayId.tuesday,
        name: {
            en: 'Tuesday',
            fa: 'سه شنبه'
        }
    },
    [Enums_1.DayId.wednesday]: {
        id: Enums_1.DayId.wednesday,
        name: {
            en: 'Wednesday',
            fa: 'چهارشنبه'
        }
    },
    [Enums_1.DayId.thursday]: {
        id: Enums_1.DayId.thursday,
        name: {
            en: 'Thursday',
            fa: 'پنجشنبه'
        }
    },
    [Enums_1.DayId.friday]: {
        id: Enums_1.DayId.friday,
        name: {
            en: 'Friday',
            fa: 'جمعه'
        }
    },
    [Enums_1.DayId.saturday]: {
        id: Enums_1.DayId.saturday,
        name: {
            en: 'Saturday',
            fa: 'شنبه'
        }
    },
    [Enums_1.DayId.sunday]: {
        id: Enums_1.DayId.sunday,
        name: {
            en: 'Sunday',
            fa: 'یکشنبه'
        }
    }
};
exports.default = Days;
