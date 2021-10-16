/**
 * Object that saves the fields in the users spreadsheet
 */
const fieldUsers = {
  id: 1,
  name: 2,
  lastSeen: 3,
  reg1: 4,
  reg2: 5,
  reg3: 6,
  reg4: 7,
  reg5: 8,
  authorized: 9,
  verificationPassword: 10,
  email: 11,
  firstCourse: 14,
  lastCourse: 29,
  nextFreeRow: {
    row: 1,
    col: 4
  }
}

/**
 * Object that saves the fields in the general part in the json from cheese&fork
 */
const fieldNamesGeneral = {
  faculty: "פקולטה",
  courseName: "שם מקצוע",
  courseNumber: "מספר מקצוע",
  nakaz: "נקודות",
  lecture: "הרצאה",
  tutorial: "תרגיל",
  lab: "מעבדה",
  seminar: "סמינר\/פרויקט",
  kdam: "מקצועות קדם",
  silabus: "סילבוס",
  lead: "אחראים",
  examA: "מועד א",
  examB: "מועד ב"
}

/**
 * Object that saves the fields in schedule part in the json from cheese&fork
 */
const fieldNamesSchedule = {
  group: "קבוצה",
  num: "מס.",
  type: "סוג",
  lead: "מרצה\/מתרגל",
  day: "יום",
  time: "שעה",
  place: "בניין",
  room: "חדר"
}

/**
 * object that saves the fields in the cources spreadsheets
 */
const fieldCourses = {
  faculty: 1,
  courseName: 2,
  courseNumber: 3,
  silabus : 4,
  kdam: 5,
  lead: 6,
  examA: 7,
  examB: 8,
  nakaz: 9,
  lecture: 10,
  tutorial: 11,
  lab: 12,
  seminar: 13,
  zoom: 14,
  telegram: 15,
  teams: 16,
  whatsApp: 17,
  spreadsheet: 18
}

/**
 * object that saves stats constants
 */

const stats = {
  users: {
    allTime: {
      row: 2,
      col: 2
    },
    month: {
      row: 3,
      col: 2
    },
    week: {
      row: 4,
      col: 2
    },
    day: {
      row: 5,
      col: 2
    }
  },
  todaysRow: {
    row: 2,
    col: 3
  },
  numOfUsersCol: 5,
  clicksCol: 6,
  clicksOnLinksCol: 7,
  rideClicksCol: 8,
  rideIdsListStart: {
    row: 8,
    col: 1
  },
  rideIdsNextRow: {
    row: 4,
    col: 3
  },
  talkClicksCol: 9,
  talkIdsListStart: {
    row: 8,
    col: 2
  },
  talkIdsNextRow: {
    row: 6,
    col: 3
  },
  test: {
    row: 6,
    col: 2
  }
}